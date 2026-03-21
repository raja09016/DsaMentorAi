import { ArrowRight, Binary, GitBranch, HelpCircle, Layers } from 'lucide-react';

const PROMPTS = [
  {
    icon: Binary,
    title: 'Explain Binary Search',
    description: 'How it works, implementation & complexity',
    color: 'from-violet-500 to-brand-600',
    bg: 'hover:border-violet-300 dark:hover:border-violet-700',
  },
  {
    icon: HelpCircle,
    title: 'Top 10 DSA Interview Questions',
    description: 'Must-know problems for FAANG interviews',
    color: 'from-brand-500 to-cyan-500',
    bg: 'hover:border-brand-300 dark:hover:border-brand-700',
  },
  {
    icon: GitBranch,
    title: 'Dynamic Programming Roadmap',
    description: 'From fundamentals to advanced DP patterns',
    color: 'from-emerald-500 to-teal-500',
    bg: 'hover:border-emerald-300 dark:hover:border-emerald-700',
  },
  {
    icon: Layers,
    title: 'Solve Two Sum step by step',
    description: 'Brute force → optimal hash map approach',
    color: 'from-orange-400 to-rose-500',
    bg: 'hover:border-orange-300 dark:hover:border-orange-700',
  },
];

function SuggestedPromptCard({ prompt, onClick }) {
  const Icon = prompt.icon;
  return (
    <button
      onClick={() => onClick(prompt.title)}
      className={`group relative flex items-start gap-3 rounded-2xl border border-custom bg-surface p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${prompt.bg}`}
    >
      <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${prompt.color} shadow-sm`}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-primary leading-snug">{prompt.title}</p>
        <p className="mt-0.5 text-xs text-secondary leading-snug">{prompt.description}</p>
      </div>
      <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-500 mt-0.5" />
    </button>
  );
}

export default function EmptyState({ onPromptClick }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      {/* Glow orb */}
      <div className="relative mb-8">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/30 flex items-center justify-center">
          <span className="text-4xl">🚀</span>
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 blur-xl opacity-30" />
      </div>

      <h1 className="text-3xl font-bold text-primary tracking-tight sm:text-4xl">
        Master DSA Interviews
      </h1>
      <p className="mt-3 max-w-md text-base text-secondary leading-relaxed">
        Ask anything about data structures, algorithms, and interview prep.
        Your personal DSA coach is ready.
      </p>

      {/* Stats row */}
      <div className="mt-6 flex items-center gap-6 text-xs text-muted">
        {['500+ Problems', 'FAANG Ready', 'All Levels'].map((s) => (
          <div key={s} className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            {s}
          </div>
        ))}
      </div>

      {/* Suggested prompts */}
      <div className="mt-10 w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PROMPTS.map((p) => (
          <SuggestedPromptCard key={p.title} prompt={p} onClick={onPromptClick} />
        ))}
      </div>
    </div>
  );
}
