import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId = null;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      currentX = e.clientX;
      currentY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setPosition({ x: currentX, y: currentY });
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return position;
}