// === Chat Widget for Portfolio ===
// Replace this with your actual Vercel URL:
const API_URL = 'https://chatbot-backend-newt9.vercel.app/api/chat';

// Inject widget HTML into the page
const widgetHTML = `
  <div id="cw-btn" style="position:fixed;bottom:20px;right:20px;width:60px;height:60px;border-radius:50%;background:#4f46e5;color:white;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.2);font-size:26px;z-index:9999;user-select:none;">💬</div>
  <div id="cw-box" style="display:none;position:fixed;bottom:90px;right:20px;width:340px;height:460px;background:white;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.25);flex-direction:column;z-index:9999;overflow:hidden;font-family:system-ui,-apple-system,sans-serif;">
    <div style="background:#4f46e5;color:white;padding:14px 16px;font-weight:600;display:flex;justify-content:space-between;align-items:center;">
      <span>Ask me anything</span>
      <span id="cw-close" style="cursor:pointer;font-size:20px;line-height:1;">×</span>
    </div>
    <div id="cw-log" style="flex:1;overflow-y:auto;padding:12px;font-size:14px;background:#fafafa;"></div>
    <div style="display:flex;border-top:1px solid #eee;background:white;">
      <input id="cw-input" placeholder="Type a message..." style="flex:1;border:none;padding:12px;outline:none;font-size:14px;font-family:inherit;" />
      <button id="cw-send" style="border:none;background:#4f46e5;color:white;padding:0 18px;cursor:pointer;font-weight:600;">Send</button>
    </div>
  </div>
`;

document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  container.innerHTML = widgetHTML;
  document.body.appendChild(container);

  const btn = document.getElementById('cw-btn');
  const box = document.getElementById('cw-box');
  const closeBtn = document.getElementById('cw-close');
  const log = document.getElementById('cw-log');
  const input = document.getElementById('cw-input');
  const sendBtn = document.getElementById('cw-send');

  const history = [
    { role: 'system', content: 'You are a friendly portfolio assistant. Answer questions about the portfolio owner using the facts you were given.' }
  ];

  btn.onclick = () => {
    box.style.display = box.style.display === 'none' ? 'flex' : 'none';
    if (box.style.display === 'flex' && log.children.length === 0) {
      addMessage("Hi! Ask me anything about my background, skills, or projects.", 'bot');
    }
  };
  closeBtn.onclick = () => { box.style.display = 'none'; };

  function addMessage(text, who) {
    const div = document.createElement('div');
    div.style.margin = '8px 0';
    div.style.textAlign = who === 'user' ? 'right' : 'left';
    const bubble = document.createElement('span');
    bubble.style.display = 'inline-block';
    bubble.style.padding = '8px 12px';
    bubble.style.borderRadius = '14px';
    bubble.style.maxWidth = '80%';
    bubble.style.wordWrap = 'break-word';
    bubble.style.background = who === 'user' ? '#4f46e5' : '#fff';
    bubble.style.color = who === 'user' ? 'white' : '#111';
    bubble.style.boxShadow = '0 1px 2px rgba(0,0,0,0.08)';
    bubble.textContent = text;
    div.appendChild(bubble);
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    addMessage(text, 'user');
    history.push({ role: 'user', content: text });

    addMessage('...', 'bot');
    const thinking = log.lastChild;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Sorry, something went wrong.';
      thinking.remove();
      addMessage(reply, 'bot');
      history.push({ role: 'assistant', content: reply });
    } catch (err) {
      thinking.remove();
      addMessage('Network error. Please try again.', 'bot');
    }
  }

  sendBtn.onclick = sendMessage;
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
});
