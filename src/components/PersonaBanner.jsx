import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersona } from '../context/PersonaContext';
import { Link } from 'react-router-dom';

export default function PersonaBanner() {
  const { persona, loading } = usePersona();
  const [dismissed, setDismissed] = useState(false);

  if (!persona || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-14 left-0 right-0 z-30 overflow-hidden"
      >
        <div className="bg-accent/5 border-b border-accent/15 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20 py-2 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              {loading ? (
                <span className="font-mono text-[11px] dark:text-zinc-400 text-stone-500 animate-pulse">
                  Personalizing for {persona?.label || '...'}
                </span>
              ) : (
                <>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent/60 shrink-0">
                    {persona.type === 'company' ? 'Built for' : 'Viewing'}
                  </span>
                  <span className="font-sans text-[13px] dark:text-zinc-200 text-stone-700 font-medium truncate">
                    {persona.label}
                  </span>
                  {persona.type === 'company' && (
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-accent/70 shrink-0">
                      AI-personalized
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/"
                className="font-mono text-[10px] dark:text-zinc-500 text-stone-400 hover:text-accent underline underline-offset-2 decoration-accent/30 transition-colors"
              >
                See default
              </Link>
              <button
                onClick={() => setDismissed(true)}
                className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-surface-2/50 dark:text-zinc-500 text-stone-400 hover:text-accent transition-all"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
