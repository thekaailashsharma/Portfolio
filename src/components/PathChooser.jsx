import { motion } from 'framer-motion';

const paths = [
  {
    id: 'solve',
    label: 'A problem worth solving',
    description: 'See proof of execution, systems built, and impact delivered.',
    icon: '◆',
  },
  {
    id: 'build',
    label: 'An idea worth building',
    description: 'Explore how I think, speak, and collaborate with teams.',
    icon: '◇',
  },
  {
    id: 'wander',
    label: 'Pure curiosity',
    description: 'The full story. Wander through everything.',
    icon: '○',
  },
];

export default function PathChooser({ onChoose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="mt-16"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] dark:text-zinc-600 text-stone-400 mb-5">
        What brings you here?
      </p>
      <div className="flex flex-col sm:flex-row gap-2.5">
        {paths.map((path, i) => (
          <motion.button
            key={path.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 + i * 0.1, duration: 0.6 }}
            onClick={() => onChoose(path.id)}
            className="group text-left px-5 py-4 rounded-xl border border-surface-3/50 bg-surface-1/20 hover:bg-surface-1/60 hover:border-accent/20 transition-all duration-400 flex-1"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-accent/40 group-hover:text-accent/80 transition-colors text-sm">
                {path.icon}
              </span>
              <span className="font-sans text-[13px] dark:text-zinc-300 text-stone-600 dark:group-hover:text-zinc-100 group-hover:text-stone-900 transition-colors">
                {path.label}
              </span>
            </div>
            <p className="font-mono text-[10px] dark:text-zinc-600 text-stone-400 group-hover:dark:text-zinc-500 group-hover:text-stone-500 leading-relaxed transition-colors">
              {path.description}
            </p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
