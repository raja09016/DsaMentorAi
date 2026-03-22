import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';

function formatTime(ts) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(new Date(ts));
}

function CodeBlock({ node, inline, className, children, ...props }) {
  const [isCopied, setIsCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const codeString = String(children).replace(/\n$/, '');
  
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {}
  };

  if (!inline && match) {
    return (
      <div className="relative mt-4 mb-4 rounded-xl overflow-hidden border border-[#2d2d45] bg-[#1e1e1e] group/code">
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#2d2d45]/50 border-b border-[#2d2d45]">
          <span className="text-[10px] font-mono font-medium text-gray-400 uppercase tracking-wider">{match[1]}</span>
          <button 
            onClick={handleCopyCode}
            className={`flex items-center gap-1.5 text-[10px] transition-colors ${isCopied ? 'text-green-400' : 'text-gray-400 hover:text-white'}`}
          >
            {isCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            <span>{isCopied ? 'Copied!' : 'Copy code'}</span>
          </button>
        </div>
        <div className="not-prose text-sm">
          <SyntaxHighlighter
            {...props}
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            customStyle={{ margin: 0, padding: '1rem', background: 'transparent' }}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }
  return (
    <code {...props} className={className}>
      {children}
    </code>
  );
}

export default function MessageBubble({ message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end animate-fade-in-up">
        <div className="max-w-[85%] sm:max-w-[70%]">
          <div className="rounded-2xl rounded-br-sm bg-gradient-to-br from-brand-500 to-brand-700 px-4 py-3 text-sm text-white shadow-sm shadow-brand-500/20">
            <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
          <p className="mt-1 text-right text-[11px] text-muted">{formatTime(message.timestamp)}</p>
        </div>
      </div>
    );
  }

  // Bot message
  return (
    <div className="flex items-end gap-2.5 animate-fade-in-up group">
      {/* Bot avatar */}
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white text-[10px] font-bold shadow-sm">
        AI
      </div>

      <div className="max-w-[85%] sm:max-w-[75%]">
        <div className="relative rounded-2xl rounded-bl-sm border border-custom bg-surface px-4 py-3 shadow-sm">
          {/* Copy button */}
          <button
            onClick={handleCopy}
            title="Copy response"
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg border border-custom bg-primary opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-brand-50 dark:hover:bg-brand-950 hover:border-brand-300 dark:hover:border-brand-700"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-secondary" />
            )}
          </button>

          {/* Markdown content */}
          <div className="prose prose-sm max-w-none text-primary text-sm leading-relaxed pr-6">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                code: CodeBlock
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Error badge */}
        {message.isError && (
          <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-500" />
            Something went wrong
          </p>
        )}

        <p className="mt-1 text-[11px] text-muted">{formatTime(message.timestamp)}</p>
      </div>
    </div>
  );
}
