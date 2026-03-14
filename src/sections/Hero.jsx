import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const line = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.4 + i * 0.12, duration: 0.8, ease: [0.23, 1, 0.32, 1] },
  }),
};

const fade = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: 0.9 + i * 0.15, duration: 0.8 },
  }),
};

export default function Hero() {
  const [time, setTime] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  const gridColor = theme === 'dark' ? 'rgba(200,168,124,0.4)' : 'rgba(139,111,71,0.25)';

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-20 py-24 overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          opacity: 'var(--grid-opacity)',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/4 left-1/3 w-[700px] h-[500px] blur-3xl pointer-events-none"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(ellipse at center, rgba(200,168,124,0.03) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(139,111,71,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Floating status panel (desktop) */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.9 }}
        className="absolute top-28 right-6 sm:right-10 lg:right-20 hidden lg:block"
      >
        <div className="font-mono text-[10px] dark:text-zinc-600 text-stone-400 border-l border-surface-4/50 pl-3.5 max-w-[200px] leading-[1.8] space-y-0.5">
          <span className="block text-[9px] uppercase tracking-[0.25em] text-accent/25 mb-2">
            // status
          </span>
          <p>SDE I @ Shaadi.com</p>
          <p>AI Engineer @ Open Paws</p>
          <p className="dark:text-zinc-700 text-stone-300 pt-1">Building in public.</p>
        </div>
      </motion.div>

      <div className="relative max-w-5xl">
        {/* Location bar */}
        <motion.div
          custom={0}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 mb-12 md:mb-16"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500/80" />
          </span>
          <span className="font-mono text-[11px] dark:text-zinc-500 text-stone-400 tracking-wide">
            Mumbai, India · {time} IST
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={0}
          variants={line}
          initial="hidden"
          animate="visible"
          className="font-serif text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] dark:text-zinc-100 text-stone-900 mb-2"
        >
          Kailash
        </motion.h1>
        <motion.h1
          custom={1}
          variants={line}
          initial="hidden"
          animate="visible"
          className="font-serif italic text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] text-accent/80 mb-8"
        >
          Sharma
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={line}
          initial="hidden"
          animate="visible"
          className="font-sans text-lg sm:text-xl dark:text-zinc-400 text-stone-500 max-w-lg mb-10 leading-relaxed"
        >
          Builder of products, AI systems, and messy first versions.
        </motion.p>

        {/* Intro lines */}
        <div className="space-y-1 mb-14">
          {[
            'I like working on unclear problems.',
            'The kind where the solution is not obvious',
            'and the constraints are real.',
          ].map((text, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={fade}
              initial="hidden"
              animate="visible"
              className="font-sans text-[15px] dark:text-zinc-500 text-stone-400 leading-relaxed"
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2.5 px-6 py-3 bg-accent/10 border border-accent/20 rounded-lg text-accent text-[13px] font-sans hover:bg-accent/15 hover:border-accent/35 transition-all duration-300"
          >
            Explore Work
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
          <a
            href="#thinking"
            className="group inline-flex items-center gap-2.5 px-6 py-3 border border-surface-4/60 rounded-lg dark:text-zinc-400 text-stone-500 text-[13px] font-sans hover:border-surface-4 dark:hover:text-zinc-300 hover:text-stone-700 transition-all duration-300"
          >
            Read Notes
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] dark:text-zinc-600 text-stone-400">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-accent/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}