import { motion } from 'framer-motion';

export default function SectionLabel({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-10 md:mb-14"
    >
      <div className="h-px w-8 bg-gradient-to-r from-accent/25 to-transparent" />
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] dark:text-zinc-500 text-stone-400">
        {label}
      </span>
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-surface-4/50 to-transparent" />
    </motion.div>
  );
}
