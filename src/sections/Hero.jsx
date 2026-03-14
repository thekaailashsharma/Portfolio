import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import NowDashboard from '../components/NowDashboard';
import PathChooser from '../components/PathChooser';

export default function Hero({ onPathChoose, chosenPath }) {
  const { theme } = useTheme();
  const { scrollY } = useScroll();

  const nameScale = useTransform(scrollY, [0, 400], [1, 0.4]);
  const nameOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const nameY = useTransform(scrollY, [0, 400], [0, -60]);
  const bgY = useTransform(scrollY, [0, 600], [0, 150]);
  const dark = theme === 'dark';

  const gridColor = dark ? 'rgba(200,168,124,0.4)' : 'rgba(139,111,71,0.25)';

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-20 py-24 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          opacity: 'var(--grid-opacity)',
          y: bgY,
        }}
      />

      <motion.div
        className="absolute top-1/4 left-1/3 w-[700px] h-[500px] blur-3xl pointer-events-none"
        style={{
          background: dark
            ? 'radial-gradient(ellipse at center, rgba(200,168,124,0.03) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(139,111,71,0.04) 0%, transparent 70%)',
          y: useTransform(scrollY, [0, 600], [0, 80]),
        }}
      />

      <div className="absolute top-24 right-6 sm:right-10 lg:right-20">
        <NowDashboard />
      </div>

      <div className="relative max-w-5xl">
        <motion.div style={{ scale: nameScale, opacity: nameOpacity, y: nameY }} className="origin-top-left">
          <h1 className="font-serif text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] dark:text-zinc-100 text-stone-900 mb-2">
            Kailash
          </h1>
          <h1 className="font-serif italic text-[clamp(3.5rem,9vw,8rem)] leading-[0.92] text-accent/80 mb-8">
            Sharma
          </h1>
        </motion.div>

        <div className="border-l-2 pl-5 sm:pl-6 mb-4 max-w-lg" style={{ borderColor: 'var(--accent)' }}>
          <p className="font-serif italic text-[15px] sm:text-[17px] leading-[1.7] dark:text-zinc-300 text-stone-700">
            "Innovation is outcome of a habit, not a random act. To invent tomorrow is a great achievement than modifying the past."
          </p>
        </div>
        <div className="mb-8">
          <img
            src="/sign.png"
            alt="Kailash Sharma signature"
            className="h-14 sm:h-16 w-auto"
            style={{
              filter: dark ? 'invert(1) brightness(1.2)' : 'grayscale(1) contrast(1.5) brightness(0.3)',
              opacity: 0.7,
            }}
          />
        </div>

        <div className="space-y-1 mb-10">
          {[
            'I like working on unclear problems.',
            'The kind where the solution is not obvious',
            'and the constraints are real.',
          ].map((text, i) => (
            <p
              key={i}
              className="font-sans text-[15px] dark:text-zinc-500 text-stone-400 leading-relaxed"
            >
              {text}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <motion.a
            href="#systems"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2.5 px-6 py-3 bg-accent/10 border border-accent/20 rounded-lg text-accent text-[13px] font-sans hover:bg-accent/15 hover:border-accent/35 transition-all duration-300"
          >
            Explore Work
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.a>
          <motion.a
            href="#writing"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2.5 px-6 py-3 border border-surface-4/60 rounded-lg dark:text-zinc-400 text-stone-500 text-[13px] font-sans hover:border-surface-4 dark:hover:text-zinc-300 hover:text-stone-700 transition-all duration-300"
          >
            Read Writing
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </div>

        {!chosenPath && <PathChooser onChoose={onPathChoose} />}
        {chosenPath && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex items-center gap-3"
          >
            <span className="font-mono text-[10px] dark:text-zinc-600 text-stone-400">
              Viewing: {chosenPath === 'solve' ? 'Proof of execution' : chosenPath === 'build' ? 'Ideas & collaboration' : 'Everything'}
            </span>
            <button
              onClick={() => onPathChoose(null)}
              className="font-mono text-[10px] text-accent/60 hover:text-accent underline underline-offset-2 transition-colors"
            >
              change
            </button>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] dark:text-zinc-600 text-stone-400">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-accent/30 to-transparent"
        />
      </div>
    </section>
  );
}
