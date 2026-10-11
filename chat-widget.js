// === Chat Widget for Portfolio ===
// Replace this with your actual Vercel URL:
const API_URL = 'https://chatbot-backend-newt9.vercel.app/api/chat';

// Inject widget HTML and CSS into the page
const widgetHTML = `
  <style>
    /* Responsive Chat Widget Styles */
    #cw-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #4f46e5;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 24px;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
      transition: all 0.3s ease;
      z-index: 999;
      border: none;
      font-family: inherit;
    }

    #cw-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(79, 70, 229, 0.6);
    }

    #cw-btn:active {
      transform: scale(0.95);
    }

    #cw-box {
      position: fixed;
      bottom: 90px;
      right: 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      flex-direction: column;
      z-index: 999;
      display: none;
      transition: all 0.3s ease;
      overflow: hidden;
    }

    /* Desktop: Default size (1024px and up) */
    @media (min-width: 1024px) {
      #cw-box {
        width: 380px;
        height: 500px;
      }
    }

    /* Tablet: Medium screens (768px to 1023px) */
    @media (min-width: 768px) and (max-width: 1023px) {
      #cw-box {
        width: 340px;
        height: 460px;
        bottom: 80px;
        right: 15px;
      }
    }

    /* Mobile: Small screens (below 768px) */
    @media (max-width: 767px) {
      #cw-btn {
        bottom: 15px;
        right: 15px;
        width: 56px;
        height: 56px;
        font-size: 20px;
      }

      #cw-box {
        position: fixed;
        width: calc(100% - 30px);
        height: 70vh;
        max-height: 500px;
        bottom: 70px;
        right: 15px;
        left: 15px;
        max-width: none;
      }
    }

    /* Extra small screens (below 360px) */
    @media (max-width: 359px) {
      #cw-btn {
        width: 52px;
        height: 52px;
      }

      #cw-box {
        width: calc(100% - 20px);
        height: 65vh;
        bottom: 65px;
        right: 10px;
        left: 10px;
      }
    }

    #cw-header {
      background: #4f46e5;
      color: white;
      padding: 14px 16px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    #cw-header span:first-child {
      font-size: 16px;
    }

    #cw-close {
      cursor: pointer;
      font-size: 24px;
      line-height: 1;
      transition: transform 0.2s ease;
    }

    #cw-close:hover {
      transform: rotate(90deg);
    }

    #cw-log {
      flex: 1;
      overflow-y: auto;
      padding: 12px;
      font-size: 14px;
      background: #fafafa;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    #cw-log::-webkit-scrollbar {
      width: 6px;
    }

    #cw-log::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    #cw-log::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }

    #cw-log::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    #cw-input-wrapper {
      display: flex;
      border-top: 1px solid #eee;
      background: white;
      flex-shrink: 0;
      gap: 0;
    }

    #cw-input {
      flex: 1;
      border: none;
      padding: 12px;
      outline: none;
      font-size: 14px;
      font-family: inherit;
      resize: none;
      background: white;
      transition: background 0.2s ease;
    }

    #cw-input:focus {
      background: #fafafa;
    }

    #cw-input::placeholder {
      color: #999;
    }

    #cw-send {
      border: none;
      background: #4f46e5;
      color: white;
      padding: 0 18px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      transition: all 0.2s ease;
      white-space: nowrap;
      flex-shrink: 0;
    }

    #cw-send:hover {
      background: #4338ca;
    }

    #cw-send:active {
      transform: scale(0.95);
    }

    #cw-send:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .cw-message-wrapper {
      margin: 8px 0;
      display: flex;
      animation: fadeIn 0.3s ease;
    }

    .cw-message-wrapper.user {
      justify-content: flex-end;
    }

    .cw-message-wrapper.bot {
      justify-content: flex-start;
    }

    .cw-bubble {
      display: inline-block;
      padding: 8px 12px;
      border-radius: 14px;
      max-width: 80%;
      word-wrap: break-word;
      line-height: 1.4;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
      animation: slideIn 0.2s ease;
    }

    .cw-bubble.user {
      background: #4f46e5;
      color: white;
      border-bottom-right-radius: 4px;
    }

    .cw-bubble.bot {
      background: #fff;
      color: #111;
      border: 1px solid #e2e8f0;
      border-bottom-left-radius: 4px;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideIn {
      from {
        transform: translateY(8px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  </style>

  <button id="cw-btn" aria-label="Open chat">💬</button>
  <div id="cw-box">
    <div id="cw-header">
      <span>Ask me anything</span>
      <span id="cw-close" role="button" aria-label="Close chat">×</span>
    </div>
    <div id="cw-log" role="log" aria-live="polite"></div>
    <div id="cw-input-wrapper">
      <input
        id="cw-input"
        type="text"
        placeholder="Type a message..."
        aria-label="Chat message input"
      />
      <button id="cw-send" aria-label="Send message">Send</button>
    </div>
  </div>
`;

document.addEventListener('DOMContentLoaded', () => {
  // Create and inject widget container
  const container = document.createElement('div');
  container.innerHTML = widgetHTML;
  document.body.appendChild(container);

  // Get element references
  const btn = document.getElementById('cw-btn');
  const box = document.getElementById('cw-box');
  const closeBtn = document.getElementById('cw-close');
  const log = document.getElementById('cw-log');
  const input = document.getElementById('cw-input');
  const sendBtn = document.getElementById('cw-send');

  // Message history for API context
  const history = [
    {
      role: 'system',
      content: 'You are a friendly portfolio assistant. Answer questions about the portfolio owner using the facts you were given.'
    }
  ];

  // Toggle chat box visibility
  btn.onclick = () => {
    const isHidden = box.style.display === 'none' || !box.style.display;
    box.style.display = isHidden ? 'flex' : 'none';

    // Show greeting on first open
    if (isHidden && log.children.length === 0) {
      addMessage("Hi! Ask me anything about my background, skills, or projects.", 'bot');
    }

    // Focus input when opened
    if (isHidden) {
      setTimeout(() => input.focus(), 100);
    }
  };

  // Close chat box
  closeBtn.onclick = () => {
    box.style.display = 'none';
  };

  /**
   * Add a message to the chat log
   * @param {string} text - Message text
   * @param {string} who - 'user' or 'bot'
   */
  function addMessage(text, who) {
    const wrapper = document.createElement('div');
    wrapper.className = `cw-message-wrapper ${who}`;

    const bubble = document.createElement('span');
    bubble.className = `cw-bubble ${who}`;
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    log.appendChild(wrapper);

    // Auto-scroll to latest message
    log.scrollTop = log.scrollHeight;
  }

  /**
   * Send a message to the API and handle response
   */
  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // Clear input and disable send button
    input.value = '';
    sendBtn.disabled = true;

    // Add user message to chat
    addMessage(text, 'user');
    history.push({ role: 'user', content: text });

    // Show typing indicator
    addMessage('...', 'bot');
    const thinkingMessage = log.lastChild;

    try {
      // Fetch response from API
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Sorry, something went wrong.';

      // Replace typing indicator with actual response
      thinkingMessage.remove();
      addMessage(reply, 'bot');
      history.push({ role: 'assistant', content: reply });
    } catch (err) {
      // Handle network errors
      thinkingMessage.remove();
      addMessage('Network error. Please try again.', 'bot');
      console.error('Chat error:', err);
    } finally {
      // Re-enable send button and focus input
      sendBtn.disabled = false;
      input.focus();
    }
  }

  // Send message on button click
  sendBtn.onclick = sendMessage;

  // Send message on Enter key
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Allow Shift+Enter for new lines if needed
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      // Allow default behavior for Shift+Enter
    }
  });
});
