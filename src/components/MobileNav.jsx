import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const sections = [
  { id: 'about', label: 'About', icon: '○' },
  { id: 'timeline', label: 'Timeline', icon: '◇' },
  { id: 'systems', label: 'Work', icon: '□' },
  { id: 'speaking', label: 'Speaking', icon: '△' },
  { id: 'writing', label: 'Writing', icon: '◎' },
  { id: 'contact', label: 'Connect', icon: '◈' },
];

const resumes = [
  { label: 'PM Resume', href: 'https://drive.google.com/file/d/12GDzn9b11O6LAaxzgUBon7t6f-KelTLE/view?usp=sharing' },
  { label: 'Full Resume', href: 'https://drive.google.com/file/d/1kx_fpXjZhOBBNHZmW3nawCmdDOFxEqj0/view?usp=sharing' },
  { label: 'Speaker / CFP', href: 'https://drive.google.com/file/d/169q0McYJEIDftS9-kXMRrdQbWMbfS3jZ/view?usp=sharing' },
];

export default function MobileNav({ onCommandOpen, onBookToggle, bookMode }) {
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme, toggle } = useTheme();
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [expanded]);

  const handleNav = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setExpanded(false);
  };

  const currentLabel = sections.find((s) => s.id === activeSection)?.label || 'Explore';

  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] md:hidden"
      >
        <div className="flex items-center gap-2">
          {/* Book mode toggle */}
          {onBookToggle && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onBookToggle(!bookMode)}
              className={`flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-xl border shadow-lg transition-all duration-300 ${
                bookMode
                  ? 'bg-accent/15 border-accent/30 dark:shadow-black/40 shadow-stone-300/30'
                  : 'bg-surface-1/95 border-surface-4/60 dark:shadow-black/40 shadow-stone-300/30'
              }`}
              aria-label={bookMode ? 'Exit book view' : 'Enter book view'}
            >
              <span className={`text-sm transition-colors ${bookMode ? 'text-accent' : 'dark:text-zinc-400 text-stone-500'}`}>
                📖
              </span>
            </motion.button>
          )}

          {/* Main pill */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="relative flex items-center gap-2 px-5 py-3 rounded-full bg-surface-1/95 backdrop-blur-xl border border-surface-4/60 shadow-lg dark:shadow-black/40 shadow-stone-300/30"
          >
            <motion.span
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-accent text-sm"
            >
              +
            </motion.span>
            <span className="font-mono text-[11px] dark:text-zinc-300 text-stone-600 tracking-wide">
              {currentLabel}
            </span>
            <div className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-surface-3/50 overflow-hidden">
              <motion.div
                className="h-full bg-accent/50 rounded-full"
                style={{ width: progressWidth }}
              />
            </div>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setExpanded(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[58] md:hidden"
            >
              <div className="bg-surface-1/98 backdrop-blur-2xl border-t border-surface-4/60 rounded-t-3xl shadow-2xl dark:shadow-black/60 px-6 pt-4 pb-8">
                <div className="w-10 h-1 rounded-full bg-surface-4/60 mx-auto mb-6" />

                <button
                  onClick={() => { setExpanded(false); onCommandOpen?.(true); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-2/60 border border-surface-3/50 mb-5"
                >
                  <svg className="w-4 h-4 dark:text-zinc-500 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="font-sans text-[13px] dark:text-zinc-500 text-stone-400">Search or jump to...</span>
                </button>

                <div className="grid grid-cols-3 gap-2 mb-5">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => handleNav(section.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 ${
                        activeSection === section.id
                          ? 'bg-accent/10 border-accent/25 shadow-sm'
                          : 'bg-surface-2/40 border-surface-3/40 active:bg-surface-2'
                      }`}
                    >
                      <span className={`text-lg transition-colors ${
                        activeSection === section.id ? 'text-accent' : 'dark:text-zinc-500 text-stone-400'
                      }`}>
                        {section.icon}
                      </span>
                      <span className={`font-mono text-[10px] tracking-wide transition-colors ${
                        activeSection === section.id ? 'text-accent' : 'dark:text-zinc-400 text-stone-500'
                      }`}>
                        {section.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Resume links */}
                <div className="mb-4">
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] dark:text-zinc-600 text-stone-400 block mb-2 px-1">
                    Resumes
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {resumes.map((r) => (
                      <a
                        key={r.label}
                        href={r.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-surface-2/40 border border-surface-3/40 active:bg-surface-2 transition-all"
                      >
                        <span className="font-mono text-[9px] dark:text-zinc-400 text-stone-500 text-center leading-tight">
                          {r.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-surface-3/40">
                  <button
                    onClick={toggle}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-2/50 transition-colors"
                  >
                    <span className="text-sm">{theme === 'dark' ? '☀' : '☽'}</span>
                    <span className="font-mono text-[10px] dark:text-zinc-500 text-stone-400">
                      {theme === 'dark' ? 'Light' : 'Dark'}
                    </span>
                  </button>
                  {onBookToggle && (
                    <button
                      onClick={() => { setExpanded(false); onBookToggle(!bookMode); }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        bookMode ? 'bg-accent/10' : 'hover:bg-surface-2/50'
                      }`}
                    >
                      <span className="text-sm">📖</span>
                      <span className={`font-mono text-[10px] ${bookMode ? 'text-accent' : 'dark:text-zinc-500 text-stone-400'}`}>
                        {bookMode ? 'Exit Book' : 'Book View'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
