import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Chatbot.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp?: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // التحقق من الصفحات اللي مش هتظهر فيها الدردشة باستخدام state
  const shouldHideChat = ['/signup', '/login', '/reset-password', '/reset-password/confirmation','/'].includes(location.pathname);

  useEffect(() => {
    // رسالة افتتاحية من البوت عند فتح الدردشة
    if (isOpen && messages.length === 0 && !shouldHideChat) {
      setMessages([{ text: 'Hey there! 😄 How can I help you today?', sender: 'bot', timestamp: new Date().toLocaleTimeString() }]);
    }
  }, [isOpen, messages.length, shouldHideChat]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user', timestamp: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      console.log('API Response:', data); // للتأكد من الاستجابة

      let botMessageText = 'No response.';
      if (data.status === 'error') {
        botMessageText = data.message || 'An error occurred.';
      } else if (data.type === 'description' || data.type === 'solution') {
        botMessageText = data.message || 'No description available.';
      } else if (data.type === 'choice_required') {
        botMessageText = data.message || 'Please select an option from the backend.';
      }

      const botMessage: Message = { text: botMessageText, sender: 'bot', timestamp: new Date().toLocaleTimeString() };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Fetch Error:', error);
      const botMessage: Message = { text: 'Failed to connect to the server.', sender: 'bot', timestamp: new Date().toLocaleTimeString() };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (shouldHideChat) return null; // إخفاء الدردشة إذا كانت في صفحة معينة

  return (
    <>
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✖' : '💬'}
      </button>
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <span className="chat-icon">🤖</span>
            <h3>Chatbot</h3>
            <span className="chat-close" onClick={() => setIsOpen(false)}>✖</span>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <span className="message-icon">🤖</span>
                <div className="message-content">
                  {msg.text}
                  <span className="message-timestamp">{msg.timestamp}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Message..."
            />
            <div className="chat-input-actions">
              <button className="chat-send" onClick={sendMessage}>↑</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;