import { useRef, useState, useEffect } from 'react';
import { ArrowUp, Square } from 'lucide-react';

export default function InputBar({ onSend, isTyping }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 180) + 'px';
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isTyping) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = value.trim().length > 0 && !isTyping;

  return (
    <div className="sticky bottom-0 z-40 border-t border-custom bg-primary/80 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-2xl px-4 py-4">
        <div
          className={`flex items-end gap-3 rounded-2xl border bg-surface px-4 py-3 shadow-sm transition-all duration-200 ${
            value ? 'border-brand-400 shadow-brand-500/10 shadow-md' : 'border-custom'
          }`}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a DSA question…"
            rows={1}
            disabled={isTyping}
            className="flex-1 bg-transparent text-sm text-primary placeholder:text-muted outline-none resize-none leading-relaxed disabled:opacity-50"
          />

          <button
            onClick={handleSend}
            disabled={!canSend}
            title={canSend ? 'Send message' : 'Type a question first'}
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
              canSend
                ? 'bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm hover:shadow-brand-500/30 hover:shadow-md hover:scale-105 active:scale-95'
                : 'bg-surface-hover text-muted cursor-not-allowed'
            }`}
          >
            {isTyping ? (
              <Square className="h-3 w-3 fill-current" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </button>
        </div>

        <p className="mt-2 text-center text-[11px] text-muted">
          Press <kbd className="rounded border border-custom px-1 font-mono text-[10px] text-secondary">Enter</kbd> to send · <kbd className="rounded border border-custom px-1 font-mono text-[10px] text-secondary">Shift+Enter</kbd> for newline
        </p>
      </div>
    </div>
  );
}
