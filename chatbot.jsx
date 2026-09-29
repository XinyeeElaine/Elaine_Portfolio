/* Cozy Portfolio — floating chatbot. POSTs { sessionId, prompt } to n8n webhook. */

/* Note: use React.* (not destructured hooks) — these scripts share one global
   scope, and cat.jsx already declares const useState/useRef/useEffect. */

/* Same-origin proxy — the real n8n webhook URL stays server-side in
   functions/api/chat.js and never reaches the browser. */
const CHAT_ENDPOINT = '/api/chat';

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
  // unread bot messages while the panel is closed; starts at 1 so the greeting invites a click
  const [unread, setUnread] = React.useState(1);
  const openRef = React.useRef(open);
  openRef.current = open;
  const fabRef = React.useRef(null);
  const botSays = (text) => {
    setMessages((m) => [...m, { role: 'bot', text }]);
    if (!openRef.current) {
      setUnread((n) => n + 1);
      if (fabRef.current) replay(fabRef.current, 'nudge');
    }
  };

  // auto-scroll to newest
  React.useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading, open]);

  const toggle = () => {
    sfx(open ? 'close' : 'open');
    if (!open) setUnread(0);
    setOpen((o) => !o);
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    sfx('whoosh');
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(CHAT_ENDPOINT, {
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
      // n8n sometimes returns literal \n escapes instead of real newlines
      reply = String(reply ?? '').replace(/\\r\\n|\\n/g, '\n');
      botSays(reply || '(no response)');
      sfx('receive');
    } catch (e) {
      sfx('bonk');
      botSays("Oops — I couldn't reach the server. Please try again in a bit!");
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
              <img className="chat-avatar" src="/Picture/sillycookie.jpeg" alt="Cookie" />
              <div>
                <strong>COOKIE</strong>
                <span className="chat-status">{loading ? 'Cookie is typing…' : 'ask me anything /ᐠ .ᆺ. ᐟ\\ﾉ'}</span>
              </div>
            </div>
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

      <button ref={fabRef} className={`chat-fab ${open ? 'open' : ''}`} onClick={toggle}
        aria-label={unread ? `Chat, ${unread} unread message${unread > 1 ? 's' : ''}` : 'Chat'}>
        {open ? '✕' : <img className="chat-fab-img" src="/Picture/chatbot-button.png" alt="Chat" />}
      </button>
      {/* sibling, not child: .chat-fab clips its content (overflow: hidden) */}
      {unread > 0 && !open && <span key={unread} className="chat-badge" aria-hidden="true">{unread}</span>}
    </>
  );
}

Object.assign(window, { ChatBot });
