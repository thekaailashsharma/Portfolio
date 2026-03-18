import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const slides = [
  {
    id: 'cover',
    render: (dark) => (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent/40 mb-6">One-Pager</span>
        <h2 className="font-serif text-4xl lg:text-5xl dark:text-zinc-100 text-stone-900 mb-4 leading-tight">
          How I Can Help<br />Your Team
        </h2>
        <p className="font-sans text-[15px] dark:text-zinc-500 text-stone-400 max-w-md leading-relaxed">
          A quick overview of what I bring — and where I fit.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <img
            src="/sign.png"
            alt="Signature"
            className="h-10 w-auto"
            style={{ filter: dark ? 'invert(1) brightness(1.2)' : 'grayscale(1) contrast(1.5) brightness(0.3)', opacity: 0.6 }}
          />
        </div>
      </div>
    ),
  },
  {
    id: 'product',
    render: () => (
      <div className="flex flex-col justify-center h-full px-10 lg:px-14">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/50 mb-4">For Product Teams</span>
        <h3 className="font-serif text-3xl lg:text-4xl dark:text-zinc-100 text-stone-900 mb-6 leading-tight">
          I think in systems,<br />not features.
        </h3>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <span className="font-serif text-2xl dark:text-zinc-100 text-stone-900 shrink-0 mt-0.5">200K+</span>
            <p className="font-sans text-[14px] dark:text-zinc-400 text-stone-500 leading-relaxed">Daily active users on systems I own — payments, chat, escalation at India's largest matrimony platform.</p>
          </div>
          <div className="flex gap-4 items-start">
            <span className="font-serif text-2xl dark:text-zinc-100 text-stone-900 shrink-0 mt-0.5">4×</span>
            <p className="font-sans text-[14px] dark:text-zinc-400 text-stone-500 leading-relaxed">Products in Global Top 100 — from gamified waste management to AI travel to fashion search.</p>
          </div>
          <div className="flex gap-4 items-start">
            <span className="font-serif text-2xl dark:text-zinc-100 text-stone-900 shrink-0 mt-0.5">3</span>
            <p className="font-sans text-[14px] dark:text-zinc-400 text-stone-500 leading-relaxed">Cross-border products managed end-to-end — US CRM, Irish travel, global open-source AI.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'engineering',
    render: () => (
      <div className="flex flex-col justify-center h-full px-10 lg:px-14">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/50 mb-4">For Engineering Teams</span>
        <h3 className="font-serif text-3xl lg:text-4xl dark:text-zinc-100 text-stone-900 mb-6 leading-tight">
          I don't just build —<br />I own.
        </h3>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <span className="w-2 h-2 rounded-full bg-blue-400/60 mt-2 shrink-0" />
            <p className="font-sans text-[14px] dark:text-zinc-400 text-stone-500 leading-relaxed"><strong className="dark:text-zinc-200 text-stone-700">Production Kotlin & Swift</strong> — real-time systems at scale, not toy projects. Top 3% early adopter of Jetpack Compose.</p>
          </div>
          <div className="flex gap-4 items-start">
            <span className="w-2 h-2 rounded-full bg-purple-400/60 mt-2 shrink-0" />
            <p className="font-sans text-[14px] dark:text-zinc-400 text-stone-500 leading-relaxed"><strong className="dark:text-zinc-200 text-stone-700">AI in production</strong> — architecting AI systems for 370+ global contributors at Open Paws. Not demos, real workflows.</p>
          </div>
          <div className="flex gap-4 items-start">
            <span className="w-2 h-2 rounded-full bg-emerald-400/60 mt-2 shrink-0" />
            <p className="font-sans text-[14px] dark:text-zinc-400 text-stone-500 leading-relaxed"><strong className="dark:text-zinc-200 text-stone-700">62+ public repos</strong> — I ship in the open. Featured by Google Play Academy and Android Developers official.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'startups-events',
    render: () => (
      <div className="flex flex-col justify-center h-full px-10 lg:px-14">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/50 mb-4">For Startups & Events</span>
        <h3 className="font-serif text-3xl lg:text-4xl dark:text-zinc-100 text-stone-900 mb-6 leading-tight">
          I bring energy,<br />not slides.
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <span className="font-serif text-3xl dark:text-zinc-100 text-stone-900 block mb-1">&lt;1mo</span>
            <p className="font-sans text-[13px] dark:text-zinc-500 text-stone-400">Average time from idea to shipped MVP</p>
          </div>
          <div>
            <span className="font-serif text-3xl dark:text-zinc-100 text-stone-900 block mb-1">10+</span>
            <p className="font-sans text-[13px] dark:text-zinc-500 text-stone-400">Conference talks — DevFest, Swift, GDG MAD</p>
          </div>
          <div>
            <span className="font-serif text-3xl dark:text-zinc-100 text-stone-900 block mb-1">1st</span>
            <p className="font-sans text-[13px] dark:text-zinc-500 text-stone-400">Place at Mumbai's largest hackathon (500+ teams)</p>
          </div>
          <div>
            <span className="font-serif text-3xl dark:text-zinc-100 text-stone-900 block mb-1">G20</span>
            <p className="font-sans text-[13px] dark:text-zinc-500 text-stone-400">Top 5 — Presented at ISB Hyderabad</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'connect',
    render: () => (
      <div className="flex flex-col items-center justify-center h-full text-center px-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/50 mb-6">Let's Talk</span>
        <h3 className="font-serif text-3xl lg:text-4xl dark:text-zinc-100 text-stone-900 mb-6 leading-tight">
          Interested?
        </h3>
        <div className="space-y-3 w-full max-w-sm">
          <a href="https://wa.me/+919326405547" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between px-5 py-3 rounded-xl border border-accent/20 bg-accent/5 hover:bg-accent/10 hover:border-accent/35 transition-all duration-300 group">
            <span className="font-sans text-[14px] dark:text-zinc-300 text-stone-600 group-hover:text-accent transition-colors">WhatsApp (fastest)</span>
            <span className="text-accent text-sm">↗</span>
          </a>
          <a href="mailto:kailashps.1011@gmail.com"
            className="flex items-center justify-between px-5 py-3 rounded-xl border border-surface-3/50 hover:border-surface-4/80 hover:bg-surface-1/50 transition-all duration-300 group">
            <span className="font-sans text-[14px] dark:text-zinc-300 text-stone-600 group-hover:text-accent transition-colors">kailashps.1011@gmail.com</span>
            <span className="dark:text-zinc-600 text-stone-400 text-sm">↗</span>
          </a>
          <div className="grid grid-cols-3 gap-2 pt-2">
            <a href="https://drive.google.com/file/d/12GDzn9b11O6LAaxzgUBon7t6f-KelTLE/view?usp=sharing" target="_blank" rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg border border-surface-3/50 hover:border-accent/30 transition-all text-center">
              <span className="font-mono text-[10px] dark:text-zinc-400 text-stone-500 block">For Innovators</span>
            </a>
            <a href="https://drive.google.com/file/d/1kx_fpXjZhOBBNHZmW3nawCmdDOFxEqj0/view?usp=sharing" target="_blank" rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg border border-surface-3/50 hover:border-accent/30 transition-all text-center">
              <span className="font-mono text-[10px] dark:text-zinc-400 text-stone-500 block">For Generalists</span>
            </a>
            <a href="https://drive.google.com/file/d/169q0McYJEIDftS9-kXMRrdQbWMbfS3jZ/view?usp=sharing" target="_blank" rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg border border-surface-3/50 hover:border-accent/30 transition-all text-center">
              <span className="font-mono text-[10px] dark:text-zinc-400 text-stone-500 block">For Organizers</span>
            </a>
          </div>
        </div>
      </div>
    ),
  },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export default function PresentationViewer() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const paginate = useCallback((dir) => {
    setCurrent(([prev]) => {
      const next = prev + dir;
      if (next < 0 || next >= slides.length) return [prev, 0];
      return [next, dir];
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paused, paginate, current]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [paginate]);

  return (
    <div className="hidden md:block max-w-5xl mx-auto px-6 sm:px-10 lg:px-20 py-8">
      <div
        className="relative rounded-2xl overflow-hidden border border-surface-3/60 shadow-lg"
        style={{
          aspectRatio: '16/9',
          background: dark
            ? 'linear-gradient(135deg, #0f0f12 0%, #141418 100%)'
            : 'linear-gradient(135deg, #f5f2e8 0%, #f0ece0 100%)',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0"
          >
            {slides[current].render(dark)}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => paginate(-1)}
          disabled={current === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-surface-4/50 bg-surface-0/60 backdrop-blur-sm flex items-center justify-center dark:text-zinc-400 text-stone-500 hover:border-accent/40 hover:text-accent transition-all disabled:opacity-0 disabled:pointer-events-none"
        >
          ‹
        </button>
        <button
          onClick={() => paginate(1)}
          disabled={current === slides.length - 1}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-surface-4/50 bg-surface-0/60 backdrop-blur-sm flex items-center justify-center dark:text-zinc-400 text-stone-500 hover:border-accent/40 hover:text-accent transition-all disabled:opacity-0 disabled:pointer-events-none"
        >
          ›
        </button>

        <div className="absolute bottom-0 left-0 right-0 px-5 py-3 flex items-center justify-between bg-gradient-to-t from-surface-0/40 to-transparent">
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent([i, i > current ? 1 : -1])}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-5 h-1.5 bg-accent/70'
                    : 'w-1.5 h-1.5 bg-surface-4/50 hover:bg-surface-4'
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] dark:text-zinc-600 text-stone-400">
            {current + 1} / {slides.length}
          </span>
        </div>
      </div>
    </div>
  );
}
