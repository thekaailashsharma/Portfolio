import { motion } from 'framer-motion';

export default function SystemNote({ children, align = 'right', className = '' }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: align === 'right' ? 16 : -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className={`
        font-mono text-[11px] leading-relaxed dark:text-zinc-500/80 text-stone-400/80
        border-l border-accent/15 pl-3 max-w-[260px] select-none
        hover:border-accent/40 dark:hover:text-zinc-400 hover:text-stone-500 transition-all duration-500
        ${align === 'right' ? 'ml-auto' : ''}
        ${className}
      `}
    >
      <span className="block text-[9px] uppercase tracking-[0.25em] text-accent/30 mb-1.5 font-mono">
        // sys.note
      </span>
      <span className="italic">{children}</span>
    </motion.aside>
  );
}