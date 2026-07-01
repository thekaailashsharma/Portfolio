import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

// Animated signature: draws on left→right (clip-path wipe of the real signature),
// so it reads as a hand signing — using the actual /sign.png, not hand-guessed beziers.
export default function Signature({ className = '', dark, once = true }) {
  const { theme } = useTheme();
  const isDark = dark ?? theme === 'dark';
  return (
    <span className={`relative inline-block ${className}`}>
      <motion.img
        src="/sign.png"
        alt="Kailash Sharma signature"
        className="h-full w-auto"
        initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
        whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 0.72 }}
        viewport={{ once, margin: '-40px' }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.32, 1] }}
        style={{ filter: isDark ? 'invert(1) brightness(1.2)' : 'grayscale(1) contrast(1.5) brightness(0.3)' }}
      />
      {/* terracotta nib dot that catches up with the pen */}
      <motion.span
        aria-hidden
        className="absolute top-1/2 rounded-full"
        style={{ width: 5, height: 5, background: '#C8502A', boxShadow: '0 0 8px #C8502A' }}
        initial={{ left: '0%', opacity: 0 }}
        whileInView={{ left: '100%', opacity: [0, 1, 1, 0] }}
        viewport={{ once, margin: '-40px' }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.32, 1] }}
      />
    </span>
  );
}
