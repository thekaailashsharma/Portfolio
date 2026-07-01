import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ParallaxCard({ children, className = '', depth = 10, style = {}, glare = false }) {
  const ref = useRef(null);
  const spring = { stiffness: 300, damping: 20, mass: 0.6 };
  const rx = useSpring(useMotionValue(0), spring);
  const ry = useSpring(useMotionValue(0), spring);
  const scale = useSpring(useMotionValue(1), spring);

  // glare position (0..100%)
  const gx = useSpring(useMotionValue(50), { stiffness: 200, damping: 25 });
  const gy = useSpring(useMotionValue(50), { stiffness: 200, damping: 25 });
  const glareBg = useTransform(
    [gx, gy],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,.35), transparent 45%)`
  );

  const canHover = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: hover)').matches;
  const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleMove = (e) => {
    if (!ref.current || !canHover || reduced) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 2 * depth);
    rx.set(-(py - 0.5) * 2 * depth);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const handleEnter = () => { if (canHover && !reduced) scale.set(1.02); };
  const handleLeave = () => { rx.set(0); ry.set(0); scale.set(1); gx.set(50); gy.set(50); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ perspective: 1000, transformStyle: 'preserve-3d', rotateX: rx, rotateY: ry, scale, ...style }}
      className={`relative ${className}`}
    >
      {children}
      {glare && canHover && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{ background: glareBg, mixBlendMode: 'soft-light' }}
        />
      )}
    </motion.div>
  );
}
