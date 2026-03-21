import { Code2, Moon, Sun, Trash2 } from 'lucide-react';

export default function Header({ onClearChat, darkMode, onToggleDark, hasMessages }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-custom bg-secondary/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 sm:px-6">
        {/* Logo (Acts as Home Link) */}
        <button 
          onClick={onClearChat}
          className="flex items-center gap-2.5 text-left transition-opacity hover:opacity-80"
          aria-label="Go to homepage"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 shadow-sm">
            <Code2 className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-700 text-primary tracking-tight font-semibold">
              DSA Mentor AI
            </span>
            <span className="text-[10px] font-medium text-secondary hidden sm:block">
              Interview Prep Assistant
            </span>
          </div>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {hasMessages && (
            <button
              onClick={onClearChat}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-secondary border border-custom hover:bg-surface transition-all duration-200 hover:text-primary"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          )}

          <button
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-custom hover:bg-surface transition-all duration-200 text-secondary hover:text-primary"
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
