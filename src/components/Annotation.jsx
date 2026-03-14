import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Annotation({ children, note, marker = true }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  const isActive = isHovered || isTapped;

  useEffect(() => {
    if (isActive && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const noteWidth = 300;

      let left = rect.right + 20;
      let top = rect.top + window.scrollY - 4;

      if (viewportWidth < 768) {
        left = rect.left;
        top = rect.bottom + window.scrollY + 8;
      } else if (left + noteWidth > viewportWidth - 24) {
        left = rect.left - noteWidth - 20;
      }

      setPosition({ top, left });
    }
  }, [isActive]);

  useEffect(() => {
    if (isTapped) {
      const handleClickOutside = (e) => {
        if (triggerRef.current && !triggerRef.current.contains(e.target)) {
          setIsTapped(false);
        }
      };
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isTapped]);

  return (
    <>
      <span
        ref={triggerRef}
        className="relative inline cursor-help"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          if (window.innerWidth < 768) {
            e.stopPropagation();
            setIsTapped(!isTapped);
          }
        }}
      >
        <span
          className={`
            border-b border-dashed transition-all duration-300
            ${isActive
              ? 'border-accent text-accent dark:bg-accent/5 bg-accent/10'
              : 'border-accent/30 dark:text-accent-bright text-accent dark:hover:border-accent/60 hover:border-accent/60'
            }
          `}
        >
          {children}
        </span>
        {marker && (
          <sup className="ml-0.5 text-[9px] font-mono text-accent/40 select-none align-super">*</sup>
        )}
      </span>

      <AnimatePresence>
        {isActive && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="fixed z-50 hidden md:block pointer-events-none"
              style={{ top: position.top, left: position.left }}
            >
              <div className="relative">
                <div className="absolute top-4 -left-5 w-5 h-px bg-gradient-to-r from-transparent to-accent/30" />
                <div className="w-[280px] bg-surface-1/95 backdrop-blur-xl border border-surface-4/70 rounded-lg overflow-hidden shadow-2xl dark:shadow-black/50 shadow-stone-300/30">
                  <div className="px-4 py-2 border-b border-surface-4/40 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent/60" />
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] dark:text-zinc-500 text-stone-400">
                      annotation
                    </span>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-[12.5px] leading-[1.7] dark:text-zinc-400 text-stone-500 font-sans">
                      {note}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="block md:hidden overflow-hidden"
            >
              <div className="mt-2 mb-3 ml-2 bg-surface-1/90 border border-surface-4/50 rounded-lg px-3 py-2.5">
                <div className="flex items-start gap-2">
                  <span className="text-accent/40 font-mono text-[9px] mt-0.5 shrink-0">//</span>
                  <p className="text-[11.5px] leading-relaxed dark:text-zinc-400 text-stone-500">{note}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}