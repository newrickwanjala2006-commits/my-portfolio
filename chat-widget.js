// === Chat Widget for Portfolio ===
// Replace this with your actual Vercel URL:
const API_URL = 'https://chatbot-backend-newt9.vercel.app/api/chat';

// Inject widget HTML and CSS into the page
const widgetHTML = `
  <style>
    /* Chat Widget Button Container */
    #cw-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    /* Animated badge with rotating text - NOW CLEARLY VISIBLE */
    #cw-badge {
      background: linear-gradient(135deg, #3fd0c9 0%, #5b8def 100%);
      color: white;
      padding: 10px 16px;
      border-radius: 24px;
      font-size: 13px;
      font-weight: 700;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(63, 208, 201, 0.5);
      letter-spacing: 0.5px;
      animation: float-badge 3s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes float-badge {
      0%, 100% {
        transform: translateY(0px);
        opacity: 1;
      }
      50% {
        transform: translateY(-8px);
        opacity: 0.9;
      }
    }

    /* Main Chat Button */
    #cw-btn {
      position: relative;
      width: 65px;
      height: 65px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3fd0c9 0%, #5b8def 100%);
      border: none;
      color: white;
      font-size: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(63, 208, 201, 0.4);
      transition: all 0.3s ease;
      animation: float-btn 3s ease-in-out infinite, pulse-btn 2s ease-in-out infinite;
      outline: none;
    }

    #cw-btn:hover {
      transform: scale(1.12);
      box-shadow: 0 6px 24px rgba(63, 208, 201, 0.8);
    }

    #cw-btn:active {
      transform: scale(0.95);
    }

    /* Floating animation */
    @keyframes float-btn {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    /* Pulse glow animation */
    @keyframes pulse-btn {
      0%, 100% {
        box-shadow: 0 4px 16px rgba(63, 208, 201, 0.4);
      }
      50% {
        box-shadow: 0 4px 24px rgba(63, 208, 201, 0.9);
      }
    }

    /* Pulsing dot indicator */
    .cw-pulse-dot {
      position: absolute;
      width: 14px;
      height: 14px;
      background: #ff6b6b;
      border-radius: 50%;
      top: -7px;
      right: -7px;
      animation: pulse-dot 1.5s ease-in-out infinite;
      border: 2px solid white;
    }

    @keyframes pulse-dot {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.3);
        opacity: 0.7;
      }
    }

    /* Chat Window */
    #cw-box {
      position: fixed;
      bottom: 110px;
      right: 20px;
      width: 420px;
      height: 550px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      display: none;
      flex-direction: column;
      z-index: 9998;
      animation: slide-in 0.3s ease;
      overflow: hidden;
    }

    @keyframes slide-in {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Header */
    #cw-header {
      background: linear-gradient(135deg, #3fd0c9 0%, #5b8def 100%);
      color: white;
      padding: 18px;
      font-weight: 700;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }

    #cw-close {
      cursor: pointer;
      font-size: 28px;
      line-height: 1;
      transition: transform 0.2s ease;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #cw-close:hover {
      transform: rotate(90deg);
      background: rgba(255, 255, 255, 0.3);
    }

    /* Message Log */
    #cw-log {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: #fafafa;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    #cw-log::-webkit-scrollbar {
      width: 8px;
    }

    #cw-log::-webkit-scrollbar-track {
      background: #f0f0f0;
    }

    #cw-log::-webkit-scrollbar-thumb {
      background: #3fd0c9;
      border-radius: 4px;
    }

    #cw-log::-webkit-scrollbar-thumb:hover {
      background: #2db8b0;
    }

    /* Input Area */
    #cw-input-wrapper {
      display: flex;
      border-top: 1px solid #eee;
      background: white;
      flex-shrink: 0;
      gap: 0;
      padding: 12px;
    }

    #cw-input {
      flex: 1;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 12px;
      outline: none;
      font-size: 14px;
      font-family: inherit;
      transition: border 0.2s ease;
    }

    #cw-input:focus {
      border-color: #3fd0c9;
      box-shadow: 0 0 0 3px rgba(63, 208, 201, 0.1);
    }

    #cw-send {
      border: none;
      background: #3fd0c9;
      color: white;
      padding: 12px 16px;
      margin-left: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      border-radius: 8px;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    #cw-send:hover {
      background: #2db8b0;
    }

    #cw-send:active {
      transform: scale(0.95);
    }

    #cw-send:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* Messages */
    .cw-message-wrapper {
      display: flex;
      margin: 8px 0;
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
      padding: 10px 14px;
      border-radius: 12px;
      max-width: 75%;
      word-wrap: break-word;
      line-height: 1.5;
      font-size: 14px;
      animation: slideIn 0.2s ease;
    }

    .cw-bubble.user {
      background: #3fd0c9;
      color: white;
      border-bottom-right-radius: 4px;
    }

    .cw-bubble.bot {
      background: white;
      color: #333;
      border: 1px solid #ddd;
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

    /* Responsive Design */
    @media (max-width: 768px) {
      #cw-container {
        bottom: 15px;
        right: 15px;
      }

      #cw-btn {
        width: 60px;
        height: 60px;
      }

      #cw-badge {
        font-size: 12px;
        padding: 8px 14px;
      }

      #cw-box {
        width: calc(100% - 30px);
        height: 70vh;
        max-height: 500px;
        bottom: 85px;
        right: 15px;
        left: 15px;
        border-radius: 12px;
      }

      #cw-header {
        padding: 14px 16px;
        font-size: 15px;
      }

      #cw-log {
        padding: 12px;
      }

      #cw-input-wrapper {
        padding: 10px;
      }

      #cw-input {
        padding: 10px;
        font-size: 13px;
      }

      #cw-send {
        padding: 10px 14px;
        font-size: 13px;
      }

      .cw-bubble {
        max-width: 85%;
      }
    }

    @media (max-width: 480px) {
      #cw-container {
        bottom: 12px;
        right: 12px;
      }

      #cw-btn {
        width: 56px;
        height: 56px;
      }

      #cw-badge {
        font-size: 11px;
        padding: 7px 12px;
      }

      #cw-box {
        width: calc(100% - 24px);
        bottom: 80px;
        right: 12px;
        left: 12px;
      }

      .cw-pulse-dot {
        width: 10px;
        height: 10px;
        top: -5px;
        right: -5px;
      }
    }
  </style>

  <div id="cw-container">
    <div id="cw-badge">Ask projects</div>
    <button id="cw-btn" aria-label="Open chat">
      <span class="cw-pulse-dot"></span>
    </button>
    <div id="cw-box">
      <div id="cw-header">
        <span>Chat Assistant</span>
        <button id="cw-close" aria-label="Close chat">×</button>
      </div>
      <div id="cw-log" role="log" aria-live="polite"></div>
      <div id="cw-input-wrapper">
        <input
          id="cw-input"
          type="text"
          placeholder="Ask about my projects..."
          aria-label="Chat message input"
        />
        <button id="cw-send" aria-label="Send message">Send</button>
      </div>
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
  const badge = document.getElementById('cw-badge');

  // Rotating messages for badge
  const badgeMessages = [
    'Ask projects',
    'Ask skills',
    'Ask about me',
    'Chat now! 🚀'
  ];

  let badgeIndex = 0;

  // Rotate badge text every 2.5 seconds
  setInterval(() => {
    badgeIndex = (badgeIndex + 1) % badgeMessages.length;
    badge.textContent = badgeMessages[badgeIndex];
  }, 2500);

  // Message history for API context
  const history = [
    {
      role: 'system',
      content: 'You are a friendly portfolio assistant for Newtrick Wanjala. Answer questions about cybersecurity, projects, skills, background, and professional interests.'
    }
  ];

  // Toggle chat box visibility
  btn.onclick = () => {
    const isHidden = box.style.display === 'none' || !box.style.display;
    box.style.display = isHidden ? 'flex' : 'none';

    // Show greeting on first open
    if (isHidden && log.children.length === 0) {
      addMessage("Hi! 👋 I'm Newtrick's assistant. Ask me anything about cybersecurity, my projects, or skills!", 'bot');
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
      const reply = data.choices?.[0]?.message?.content || 'Sorry, something went wrong. Please try again.';

      // Replace typing indicator with actual response
      thinkingMessage.remove();
      addMessage(reply, 'bot');
      history.push({ role: 'assistant', content: reply });
    } catch (err) {
      // Handle network errors
      thinkingMessage.remove();
      addMessage('Network error. Please check your connection and try again.', 'bot');
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
});
