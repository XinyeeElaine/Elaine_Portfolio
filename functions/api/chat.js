/* Cloudflare Pages Function — proxies chat messages to the n8n webhook.
   The webhook URL lives in the N8N_WEBHOOK_URL environment variable and is
   never sent to the browser; the client only ever talks to /api/chat. */

const MAX_PROMPT = 2000;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function onRequestPost({ request, env }) {
  if (!env.N8N_WEBHOOK_URL) return json({ error: 'Chat is not configured.' }, 500);

  // validate before forwarding — this is the trust boundary
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Expected JSON.' }, 400);
  }

  const prompt = typeof payload?.prompt === 'string' ? payload.prompt.trim() : '';
  const sessionId = typeof payload?.sessionId === 'string' ? payload.sessionId.slice(0, 64) : '';

  if (!prompt) return json({ error: 'Message is empty.' }, 400);
  if (prompt.length > MAX_PROMPT) return json({ error: 'Message is too long.' }, 413);

  let upstream;
  try {
    upstream = await fetch(env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, prompt }),
    });
  } catch {
    return json({ error: "Couldn't reach the assistant." }, 502);
  }

  // pass the reply straight through; never leak upstream headers
  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('content-type') || 'text/plain; charset=utf-8',
    },
  });
}
