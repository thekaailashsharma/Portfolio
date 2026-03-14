import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Footnote({ number, text }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        onClick={() => setShow(!show)}
        className="relative inline-flex items-center justify-center w-4 h-4 -top-1 mx-0.5 rounded-full bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 transition-all duration-200 group"
      >
        <span className="font-mono text-[8px] text-accent/70 group-hover:text-accent transition-colors leading-none">
          {number}
        </span>
      </button>
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="block overflow-hidden"
          >
            <span className="block mt-2 mb-3 ml-1 p-3 rounded-lg bg-surface-2/60 border-l-2 border-accent/20">
              <span className="flex items-start gap-2">
                <span className="font-mono text-[9px] text-accent/40 mt-0.5 shrink-0">[{number}]</span>
                <span className="font-sans text-[12px] dark:text-zinc-400 text-stone-500 leading-relaxed italic">
                  {text}
                </span>
              </span>
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );
}

export function MarginNote({ children, side = 'right' }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: side === 'right' ? 16 : -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="hidden xl:block font-mono text-[10px] leading-relaxed dark:text-zinc-600 text-stone-400 border-l border-accent/15 pl-3 max-w-[220px] hover:border-accent/40 hover:dark:text-zinc-500 hover:text-stone-500 transition-all duration-500 select-none"
    >
      <span className="italic">{children}</span>
    </motion.aside>
  );
}
