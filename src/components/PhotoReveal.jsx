import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PhotoReveal({ children, src, caption, className = '' }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleEnter = () => setShow(true);
  const handleLeave = () => setShow(false);
  const handleMove = (e) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left + 16, y: e.clientY - rect.top - 80 });
    }
  };

  return (
    <span
      ref={ref}
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
    >
      <span className="border-b border-dashed border-accent/30 hover:border-accent/60 transition-colors duration-300">
        {children}
      </span>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 5 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="fixed z-[80] pointer-events-none hidden md:block"
            style={{ left: pos.x + (ref.current?.getBoundingClientRect().left || 0), top: pos.y + (ref.current?.getBoundingClientRect().top || 0) }}
          >
            <div className="w-[200px] rounded-xl overflow-hidden bg-surface-1 border border-surface-4/60 shadow-xl dark:shadow-black/50">
              <div className="aspect-[4/3] bg-surface-2 flex items-center justify-center">
                {src ? (
                  <img src={src} alt={caption} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                ) : (
                  <div className="flex flex-col items-center gap-1 p-3">
                    <span className="text-lg dark:text-zinc-700 text-stone-300">📷</span>
                    <span className="font-mono text-[8px] dark:text-zinc-700 text-stone-300">Photo TBD</span>
                  </div>
                )}
              </div>
              {caption && (
                <div className="px-3 py-2">
                  <p className="font-mono text-[9px] dark:text-zinc-500 text-stone-400 leading-relaxed">
                    {caption}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
