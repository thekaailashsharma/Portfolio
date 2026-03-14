import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const { theme } = useTheme();
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, [visible, x, y]);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  const glowColor = theme === 'dark'
    ? 'rgba(200,168,124,0.15)'
    : 'rgba(139,111,71,0.08)';
  const shadowColor = theme === 'dark'
    ? '0 0 20px 8px rgba(200,168,124,0.06)'
    : '0 0 20px 8px rgba(139,111,71,0.04)';

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        boxShadow: shadowColor,
        opacity: visible ? 1 : 0,
      }}
    />
  );
}