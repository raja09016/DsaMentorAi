export async function sendMessage(messages) {
  // In production, use empty string to hit the Vercel proxy, bypassing mobile ISP blocks!
  const API_URL = import.meta.env.PROD ? '' : 'http://127.0.0.1:5000';
  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Server error: ${response.status}`);
  }

  return response.json(); // { reply, mock? }
}
