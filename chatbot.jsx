/* Cozy Portfolio — floating chatbot. POSTs { sessionId, prompt } to n8n webhook. */

/* Note: use React.* (not destructured hooks) — these scripts share one global
   scope, and cat.jsx already declares const useState/useRef/useEffect. */

/* Webhook URL comes from config.js (gitignored) → window.CHAT_WEBHOOK_URL */
const N8N_WEBHOOK_URL = window.CHAT_WEBHOOK_URL || '';

function getSessionId() {
  try {
    let id = localStorage.getItem('cozy.chat.session');
    if (!id) {
      id = 'sess-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem('cozy.chat.session', id);
    }
    return id;
  } catch (e) {
    return 'sess-anon';
  }
}

function ChatBot() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { role: 'bot', text: "Hi! I'm Elaine's assistant 🐱 Ask me about her work, projects, skills — or Cookie the cat!" },
  ]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const sessionId = React.useRef(getSessionId());
  const listRef = React.useRef(null);

  // auto-scroll to newest
  React.useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionId.current, prompt: text }),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);

      let reply;
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        const data = await res.json();
        // n8n reply key varies (AI Agent → output); fall back through common ones
        reply = data.output ?? data.reply ?? data.text ?? data.message ?? data.answer ??
          (typeof data === 'string' ? data : JSON.stringify(data));
      } else {
        reply = await res.text();
      }
      setMessages((m) => [...m, { role: 'bot', text: reply || '(no response)' }]);
    } catch (e) {
      setMessages((m) => [...m, { role: 'bot', text: "Oops — I couldn't reach the server. Please try again in a bit!" }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Chat with Elaine's assistant">
          <div className="chat-head">
            <div className="chat-head-title">
              <span className="chat-avatar">🐱</span>
              <div>
                <strong>Elaine's Assistant</strong>
                <span className="chat-status">ask me anything</span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>

          <div className="chat-msgs" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role}`}>{m.text}</div>
            ))}
            {loading && (
              <div className="chat-bubble bot chat-typing">
                <span></span><span></span><span></span>
              </div>
            )}
          </div>

          <div className="chat-input-row">
            <input
              type="text"
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Type a message…"
              aria-label="Message"
            />
            <button className="chat-send" onClick={send} disabled={loading || !input.trim()} aria-label="Send">
              ➤
            </button>
          </div>
        </div>
      )}

      <button className={`chat-fab ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Chat">
        {open ? '✕' : '💬'}
      </button>
    </>
  );
}

Object.assign(window, { ChatBot });
