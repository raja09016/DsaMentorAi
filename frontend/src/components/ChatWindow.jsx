import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import EmptyState from './EmptyState';

export default function ChatWindow({ messages, isTyping, onPromptClick }) {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);
  const [showScroll, setShowScroll] = useState(false);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    // Show button if we are more than 150px from the bottom
    setShowScroll(scrollHeight - scrollTop - clientHeight > 150);
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <main ref={containerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto relative">
      <div className="mx-auto w-full max-w-2xl px-4 py-6">
        {messages.length === 0 ? (
          <EmptyState onPromptClick={onPromptClick} />
        ) : (
          <div className="flex flex-col gap-5 relative">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} className="h-4" />
          </div>
        )}
      </div>

      {/* Floating Scroll to Bottom Button */}
      {showScroll && messages.length > 0 && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-24 right-4 sm:right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-custom shadow-lg hover:shadow-xl hover:scale-105 text-primary transition-all duration-200 animate-fade-in-up"
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="h-5 w-5 text-secondary hover:text-brand-500 transition-colors" />
        </button>
      )}
    </main>
  );
}
