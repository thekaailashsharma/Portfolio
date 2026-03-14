import { motion } from 'framer-motion';

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 24,
  x = 0,
  className = '',
  once = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}