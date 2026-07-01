import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false); // hovering an interactive target
  const [ai, setAi] = useState(false);         // hovering an AI/data target
  const [down, setDown] = useState(false);

  // core: tight follow · ring: lagging trail
  const cx = useSpring(0, { damping: 28, stiffness: 400, mass: 0.4 });
  const cy = useSpring(0, { damping: 28, stiffness: 400, mass: 0.4 });
  const rx = useSpring(0, { damping: 18, stiffness: 120, mass: 0.6 });
  const ry = useSpring(0, { damping: 18, stiffness: 120, mass: 0.6 });

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const move = (e) => {
      cx.set(e.clientX); cy.set(e.clientY);
      rx.set(e.clientX); ry.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const over = (e) => {
      const t = e.target.closest('a,button,[role="button"],[data-magnetic],.magnetic,input,textarea');
      setActive(!!t);
      setAi(!!(t && t.closest('[data-ai]')));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    window.addEventListener('mousedown', dn);
    window.addEventListener('mouseup', up);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', dn);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, [visible, cx, cy, rx, ry]);

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) return null;

  const accent = ai ? '#0E7C7B' : '#C8502A';

  return (
    <>
      {/* lagging ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%', border: `1.5px solid ${accent}`, opacity: visible ? (active ? 0.9 : 0.4) : 0 }}
        animate={{ width: active ? 46 : 28, height: active ? 46 : 28, backgroundColor: active ? `${accent}14` : 'transparent' }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      />
      {/* core dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cx, y: cy, translateX: '-50%', translateY: '-50%', background: '#fff', opacity: visible ? 1 : 0 }}
        animate={{ width: down ? 4 : 6, height: down ? 4 : 6, scale: active ? 0.5 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      />
    </>
  );
}
