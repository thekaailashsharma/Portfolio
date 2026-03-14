import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const actions = [
  { id: 'about', label: 'About', section: '#about', category: 'Navigate', icon: '→' },
  { id: 'work', label: 'Work & Systems', section: '#systems', category: 'Navigate', icon: '→' },
  { id: 'timeline', label: 'Timeline', section: '#timeline', category: 'Navigate', icon: '→' },
  { id: 'speaking', label: 'Speaking & Mentorship', section: '#speaking', category: 'Navigate', icon: '→' },
  { id: 'writing', label: 'Writing', section: '#writing', category: 'Navigate', icon: '→' },
  { id: 'contact', label: 'Contact', section: '#contact', category: 'Navigate', icon: '→' },
  { id: 'resume-pm', label: 'PM Resume', href: 'https://drive.google.com/file/d/12GDzn9b11O6LAaxzgUBon7t6f-KelTLE/view?usp=sharing', category: 'Resumes', icon: '↓' },
  { id: 'resume-full', label: 'Full Resume', href: 'https://drive.google.com/file/d/1kx_fpXjZhOBBNHZmW3nawCmdDOFxEqj0/view?usp=sharing', category: 'Resumes', icon: '↓' },
  { id: 'resume-speaker', label: 'Speaker / CFP Resume', href: 'https://drive.google.com/file/d/169q0McYJEIDftS9-kXMRrdQbWMbfS3jZ/view?usp=sharing', category: 'Resumes', icon: '↓' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/thekaailashsharma', category: 'Links', icon: '↗' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/thekaailashsharma', category: 'Links', icon: '↗' },
  { id: 'substack', label: 'Substack', href: 'https://thekailashsharma.substack.com/', category: 'Links', icon: '↗' },
  { id: 'email', label: 'Email', href: 'mailto:kailashps.1011@gmail.com', category: 'Links', icon: '↗' },
  { id: 'twitter', label: 'Twitter / X', href: 'https://x.com/thekaailash', category: 'Links', icon: '↗' },
];

const keywords = {
  about: ['about', 'who', 'bio', 'introduction', 'me', 'kailash'],
  work: ['work', 'projects', 'systems', 'built', 'portfolio', 'tripify', 'waste', 'wowdrobe', 'evolve'],
  timeline: ['timeline', 'experience', 'career', 'jobs', 'history', 'shaadi', 'fold', 'leadbeam', 'open paws'],
  speaking: ['speaking', 'talks', 'mentoring', 'devfest', 'conference', 'mentor', 'speaker'],
  writing: ['writing', 'thoughts', 'notes', 'blog', 'essays', 'philosophy', 'substack', 'thinking'],
  contact: ['contact', 'hire', 'reach', 'connect', 'email'],
  'resume-pm': ['resume', 'pm', 'product manager', 'cv', 'download', 'pdf'],
  'resume-full': ['resume', 'full', 'developer', 'cv', 'download', 'pdf'],
  'resume-speaker': ['resume', 'speaker', 'cfp', 'mentoring', 'talks'],
  github: ['github', 'code', 'repos', 'open source'],
  linkedin: ['linkedin', 'professional'],
  substack: ['substack', 'blog', 'writing', 'newsletter'],
  email: ['email', 'mail'],
  twitter: ['twitter', 'x', 'tweet'],
};

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(!open);
      }
      if (e.key === 'Escape' && open) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const filtered = actions.filter((action) => {
    if (!query) return true;
    const q = query.toLowerCase();
    const matchLabel = action.label.toLowerCase().includes(q);
    const matchKeywords = keywords[action.id]?.some((k) => k.includes(q));
    return matchLabel || matchKeywords;
  });

  const grouped = filtered.reduce((acc, action) => {
    if (!acc[action.category]) acc[action.category] = [];
    acc[action.category].push(action);
    return acc;
  }, {});

  const handleSelect = (action) => {
    if (action.section) {
      document.querySelector(action.section)?.scrollIntoView({ behavior: 'smooth' });
    } else if (action.href) {
      if (action.href.startsWith('mailto:')) {
        window.open(action.href, '_self');
      } else {
        window.open(action.href, '_blank', 'noopener');
      }
    }
    onClose(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && filtered.length > 0) {
      handleSelect(filtered[selected]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => onClose(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-[90vw] max-w-[520px]"
          >
            <div className="bg-surface-1 border border-surface-4/80 rounded-2xl shadow-2xl dark:shadow-black/60 shadow-stone-400/20 overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-surface-3/60">
                <svg className="w-4 h-4 dark:text-zinc-500 text-stone-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search or jump to..."
                  className="flex-1 bg-transparent text-[15px] font-sans dark:text-zinc-200 text-stone-800 placeholder:dark:text-zinc-600 placeholder:text-stone-400 outline-none"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-3/60 border border-surface-4/50 font-mono text-[10px] dark:text-zinc-500 text-stone-400">
                  ESC
                </kbd>
              </div>

              <div className="max-h-[50vh] overflow-y-auto py-2">
                {Object.keys(grouped).length === 0 ? (
                  <div className="px-5 py-8 text-center">
                    <p className="font-sans text-[13px] dark:text-zinc-500 text-stone-400">No results found.</p>
                  </div>
                ) : (
                  (() => {
                    let flatIndex = 0;
                    return Object.entries(grouped).map(([category, items]) => (
                      <div key={category}>
                        <div className="px-5 pt-3 pb-1">
                          <span className="font-mono text-[9px] uppercase tracking-[0.2em] dark:text-zinc-600 text-stone-400">
                            {category}
                          </span>
                        </div>
                        {items.map((action) => {
                          const idx = flatIndex++;
                          return (
                            <button
                              key={action.id}
                              onClick={() => handleSelect(action)}
                              className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors duration-150 group ${
                                idx === selected ? 'bg-accent/10' : 'hover:bg-surface-2/80'
                              }`}
                            >
                              <span className={`font-mono text-[12px] w-4 text-center transition-colors ${
                                idx === selected ? 'text-accent' : 'dark:text-zinc-600 text-stone-400 group-hover:text-accent'
                              }`}>
                                {action.icon}
                              </span>
                              <span className={`font-sans text-[14px] transition-colors ${
                                idx === selected
                                  ? 'dark:text-zinc-100 text-stone-900'
                                  : 'dark:text-zinc-300 text-stone-600 group-hover:dark:text-zinc-100 group-hover:text-stone-900'
                              }`}>
                                {action.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ));
                  })()
                )}
              </div>

              <div className="px-5 py-3 border-t border-surface-3/40 flex items-center justify-between">
                <span className="font-mono text-[9px] dark:text-zinc-600 text-stone-400">
                  Navigate with ↑↓ · Select with ↵
                </span>
                <div className="hidden sm:flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-3/50 border border-surface-4/40 font-mono text-[9px] dark:text-zinc-500 text-stone-400">⌘</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-surface-3/50 border border-surface-4/40 font-mono text-[9px] dark:text-zinc-500 text-stone-400">K</kbd>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
