import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useSound } from './SoundManager';

const navItems = [
  { label: 'Work', href: '#systems' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Writing', href: '#writing' },
  { label: 'Connect', href: '#contact' },
];

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { play } = useSound();
  return (
    <button
      onClick={() => { toggle(); play('click'); }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative w-8 h-8 flex items-center justify-center rounded-lg border border-surface-4/50 hover:border-surface-4 hover:bg-surface-2/50 transition-all duration-300 group"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.svg key="sun" initial={{ opacity: 0, rotate: -90, scale: 0.5 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.5 }} transition={{ duration: 0.25 }} className="w-3.5 h-3.5 text-zinc-400 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </motion.svg>
        ) : (
          <motion.svg key="moon" initial={{ opacity: 0, rotate: 90, scale: 0.5 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: -90, scale: 0.5 }} transition={{ duration: 0.25 }} className="w-3.5 h-3.5 text-stone-500 group-hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}

function SoundToggle() {
  const { enabled, toggle } = useSound();
  return (
    <button
      onClick={toggle}
      aria-label={enabled ? 'Mute sounds' : 'Enable sounds'}
      className="relative w-8 h-8 flex items-center justify-center rounded-lg border border-surface-4/50 hover:border-surface-4 hover:bg-surface-2/50 transition-all duration-300 group"
    >
      <span className={`text-xs transition-opacity ${enabled ? 'opacity-70' : 'opacity-30'} group-hover:opacity-100`}>
        {enabled ? '♪' : '♪'}
      </span>
      {!enabled && <span className="absolute inset-0 flex items-center justify-center"><span className="block w-5 h-px bg-current dark:text-zinc-600 text-stone-400 rotate-45" /></span>}
    </button>
  );
}

export default function Nav({ onCommandOpen, onAIToggle, onBookToggle, bookMode }) {
  const [scrolled, setScrolled] = useState(false);
  const { play } = useSound();
  const { scrollY } = useScroll();

  const heroNameOpacity = useTransform(scrollY, [0, 200], [0, 1]);
  const heroNameY = useTransform(scrollY, [0, 200], [10, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-surface-0/80 backdrop-blur-xl border-b border-surface-3/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group" onClick={() => play('click')}>
          <span className="font-serif text-lg dark:text-zinc-200 text-stone-800 hover:text-accent transition-colors duration-300">
            KS
          </span>
          <motion.span
            style={{ opacity: heroNameOpacity, y: heroNameY }}
            className="font-mono text-[10px] dark:text-zinc-500 text-stone-400 hidden sm:inline"
          >
            Kailash Sharma
          </motion.span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => play('click')}
              className="relative font-mono text-[11px] lg:text-xs uppercase tracking-[0.15em] dark:text-zinc-500 text-stone-400 dark:hover:text-zinc-300 hover:text-stone-700 transition-colors duration-300 group py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-accent/50 group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          ))}
          <button
            onClick={() => { onAIToggle?.(); play('open'); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent/25 bg-accent/5 hover:bg-accent/10 hover:border-accent/40 transition-all duration-300 group"
          >
            <span className="text-accent text-xs font-bold">✦</span>
            <span className="font-mono text-[10px] text-accent/70 group-hover:text-accent transition-colors">AI</span>
          </button>
          <button
            onClick={() => { onCommandOpen?.(true); play('open'); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-surface-4/50 hover:border-surface-4 hover:bg-surface-2/30 transition-all duration-300 group"
          >
            <svg className="w-3 h-3 dark:text-zinc-600 text-stone-400 group-hover:text-accent/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <kbd className="font-mono text-[9px] dark:text-zinc-600 text-stone-400">⌘K</kbd>
          </button>
          <SoundToggle />
          <ThemeToggle />
        </div>

        {/* Mobile header controls */}
        <div className="flex md:hidden items-center gap-1.5">
          {onBookToggle && (
            <button
              onClick={() => { onBookToggle(!bookMode); play('click'); }}
              className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-300 ${
                bookMode
                  ? 'border-accent/30 bg-accent/10'
                  : 'border-surface-4/50 hover:border-surface-4 hover:bg-surface-2/50'
              }`}
              aria-label={bookMode ? 'Exit book view' : 'Enter book view'}
            >
              <span className="text-xs">📖</span>
            </button>
          )}
          <button
            onClick={() => { onAIToggle?.(); play('open'); }}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-accent/25 bg-accent/5 hover:bg-accent/10 transition-all duration-300"
            aria-label="Ask AI"
          >
            <span className="text-accent text-xs font-bold">✦</span>
          </button>
          <SoundToggle />
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
