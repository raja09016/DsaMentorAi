export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 animate-fade-in-up">
      {/* Bot avatar */}
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white text-xs font-bold shadow-sm">
        AI
      </div>

      {/* Bubble */}
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-surface border border-custom px-4 py-3 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-brand-400 animate-bounce-1" />
        <span className="h-2 w-2 rounded-full bg-brand-500 animate-bounce-2" />
        <span className="h-2 w-2 rounded-full bg-brand-600 animate-bounce-3" />
      </div>

      <span className="text-xs text-muted pb-0.5">Thinking…</span>
    </div>
  );
}
