import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import { sendMessage } from './lib/api';

function createMessage(role, content, isError = false) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
    timestamp: Date.now(),
    isError,
  };
}

export default function App() {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('dsa-chat-history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('dsa-dark-mode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Persist messages
  useEffect(() => {
    localStorage.setItem('dsa-chat-history', JSON.stringify(messages));
  }, [messages]);

  // Apply dark class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('dsa-dark-mode', String(darkMode));
  }, [darkMode]);

  const handleSend = useCallback(async (text) => {
    if (!text.trim() || isTyping) return;

    const userMsg = createMessage('user', text);
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Build message history for context (last 10 messages)
      const history = [
        ...messages.slice(-10),
        userMsg,
      ].map((m) => ({ role: m.role, content: m.content }));

      const { reply } = await sendMessage(history);
      const botMsg = createMessage('assistant', reply);
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      const errMsg = createMessage(
        'assistant',
        `❌ **Connection error**\n\n${error.message || 'Could not reach the server.'}\n\nMake sure the backend is running:\n\`\`\`\ncd backend && node index.js\n\`\`\``,
        true
      );
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [messages, isTyping]);

  const handleClearChat = useCallback(() => {
    setMessages([]);
    setIsTyping(false);
  }, []);

  const handleToggleDark = useCallback(() => {
    setDarkMode((d) => !d);
  }, []);

  return (
    <div className="flex h-screen flex-col bg-primary overflow-hidden">
      <Header
        onClearChat={handleClearChat}
        darkMode={darkMode}
        onToggleDark={handleToggleDark}
      />
      <ChatWindow
        messages={messages}
        isTyping={isTyping}
        onPromptClick={handleSend}
      />
      <InputBar onSend={handleSend} isTyping={isTyping} />
    </div>
  );
}
