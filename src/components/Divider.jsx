import React from 'react';
import { motion } from 'framer-motion';

export default function Divider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20"
    >
      <div className="h-px bg-gradient-to-r from-transparent via-surface-4 to-transparent" />
    </motion.div>
  );
}