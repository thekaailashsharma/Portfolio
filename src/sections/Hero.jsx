import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePersona } from '../context/PersonaContext';
import { useTheme } from '../hooks/useTheme';
import PathChooser from '../components/PathChooser';

const PM_RESUME = 'https://drive.google.com/file/d/12GDzn9b11O6LAaxzgUBon7t6f-KelTLE/view?usp=sharing';

const LIGHT = {
  beige: '#F2ECDD', espresso: '#211B16', terracotta: '#C8502A', teal: '#0E7C7B',
  muted: '#7A6E5C', line: 'rgba(33,27,22,.12)',
};
const DARK = {
  beige: '#17130E', espresso: '#F2ECDD', terracotta: '#E0683A', teal: '#3AB6A8',
  muted: '#C3B8A6', line: 'rgba(242,236,221,.14)',
};

const glassStyle = {
  background: 'linear-gradient(135deg, rgba(255,255,255,.55), rgba(255,255,255,.2))',
  WebkitBackdropFilter: 'blur(9px) saturate(150%) url(#liquid)',
  backdropFilter: 'blur(9px) saturate(150%) url(#liquid)',
  border: '1px solid rgba(255,255,255,.65)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.85), 0 22px 44px -20px rgba(33,27,22,.45)',
};

function CountUp({ to, suffix = '', delay = 1300, dur = 1500 }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf;
    const t0 = performance.now() + delay;
    const tick = (now) => {
      const p = Math.min(Math.max(now - t0, 0) / dur, 1);
      const k = 1 - Math.pow(1 - p, 3);
      setV(Math.round(k * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, delay, dur]);
  return <>{v}{suffix}</>;
}

function KineticName({ ink, accent }) {
  const words = [['K', 'a', 'i', 'l', 'a', 's', 'h'], ['S', 'h', 'a', 'r', 'm', 'a']];
  return (
    <h1 className="font-serif" style={{ fontWeight: 400, fontSize: 'clamp(3.2rem,7.5vw,6rem)', lineHeight: 0.95, letterSpacing: '-0.01em', marginBottom: 22, color: ink }}>
      {words.map((w, wi) => (
        <span key={wi} style={{ display: 'block', overflow: 'hidden' }}>
          {w.map((ch, ci) => (
            <motion.span
              key={ci}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.32, 1], delay: 0.15 + wi * 0.32 + ci * 0.045 }}
              style={{ display: 'inline-block', fontStyle: wi === 1 ? 'italic' : 'normal', color: wi === 1 ? accent : ink }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}

export default function Hero({ onPathChoose, chosenPath }) {
  const { persona, loading } = usePersona();
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK : LIGHT;
  const heroRef = useRef(null);

  const magnetic = (e) => {
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(hover: hover)').matches) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.45}px)`;
  };
  const resetMag = (e) => { e.currentTarget.style.transform = ''; };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: C.beige, color: C.espresso }}
    >
      {/* warm aurora the glass refracts */}
      <div className="absolute inset-0 pointer-events-none" style={{ filter: 'blur(80px)', zIndex: 0 }}>
        <div className="absolute rounded-full" style={{ width: '40vw', height: '40vw', left: '40%', top: '6%', opacity: 0.5, mixBlendMode: 'multiply', background: 'radial-gradient(circle, rgba(200,80,42,.28), transparent 60%)' }} />
        <div className="absolute rounded-full" style={{ width: '34vw', height: '34vw', right: '2%', top: '42%', opacity: 0.5, mixBlendMode: 'multiply', background: 'radial-gradient(circle, rgba(14,124,123,.22), transparent 62%)' }} />
        <div className="absolute rounded-full" style={{ width: '30vw', height: '30vw', left: '10%', bottom: '6%', opacity: 0.5, mixBlendMode: 'multiply', background: 'radial-gradient(circle, rgba(214,150,70,.24), transparent 62%)' }} />
      </div>

      {/* blueprint grid hint */}
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 0, opacity: 0.35,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(33,27,22,.1) 1px, transparent 0)',
        backgroundSize: '42px 42px',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 55% 45%, #000 30%, transparent 80%)',
        maskImage: 'radial-gradient(ellipse 70% 60% at 55% 45%, #000 30%, transparent 80%)',
      }} />

      <div className="relative z-[2] min-h-screen grid grid-cols-1 md:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] items-center mx-auto max-w-[1320px] gap-8 lg:gap-16 px-6 sm:px-10 lg:px-16 pt-28 md:pt-24 pb-12">
        {/* LEFT — text */}
        <div className="min-w-0">
          {/* mobile composition — photo + floating glass chips (desktop uses the right column) */}
          <div className="md:hidden relative mx-auto mb-9" style={{ width: '76%', maxWidth: 290 }}>
            <div className="relative rounded-[22px] overflow-hidden" style={{ aspectRatio: '4/5', boxShadow: '0 30px 60px -24px rgba(33,27,22,.5)' }}>
              <img src="/evidence/devfest-bhopal.png" alt="Kailash Sharma speaking" className="w-full h-full object-cover" style={{ objectPosition: 'top center', filter: 'contrast(1.05)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(33,27,22,.35))' }} />
              <div className="absolute inset-0 rounded-[22px]" style={{ border: '1px solid rgba(255,255,255,.4)' }} />
            </div>
            <div className="glass-sheen absolute flex items-center gap-2 rounded-[13px] px-3 py-2" style={{ ...glassStyle, top: -10, right: -8 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.teal, boxShadow: `0 0 8px ${C.teal}` }} className="animate-pulse" />
              <span style={{ fontSize: 11, fontWeight: 600 }}>shipping</span>
            </div>
            <div className="absolute rounded-[13px] px-3 py-2" style={{ ...glassStyle, bottom: -12, left: -6 }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, lineHeight: 1 }}><CountUp to={200} delay={800} />K<span style={{ color: C.terracotta }}>+</span></div>
              <div className="font-mono" style={{ fontSize: 8, color: C.muted, textTransform: 'uppercase', letterSpacing: '.1em' }}>daily users</div>
            </div>
          </div>
          <motion.span
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2.5 font-mono mb-6"
            style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.terracotta }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.teal, boxShadow: `0 0 9px ${C.teal}` }} className="animate-pulse" />
            Product Manager — with an engineer&apos;s hands
          </motion.span>

          <KineticName ink={C.espresso} accent={C.terracotta} />

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}
            className="font-sans" style={{ fontSize: 'clamp(1.02rem,1.4vw,1.2rem)', maxWidth: '36ch', lineHeight: 1.58, marginBottom: 14, color: C.espresso }}
          >
            {persona?.heroSubtitle && !loading ? (
              persona.heroSubtitle
            ) : (
              <>I take problems that <b style={{ color: C.terracotta, fontWeight: 600 }}>aren&apos;t fully defined yet</b> and turn them into products people actually use.</>
            )}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85, duration: 0.8 }}
            className="font-sans" style={{ fontSize: 13.5, maxWidth: '42ch', lineHeight: 1.65, marginBottom: 32, color: C.muted }}
          >
            Owned end-to-end: from first sketch to <b style={{ color: C.espresso, fontWeight: 500 }}>200K+ daily users</b> — and every system I build ends up solving a <b style={{ color: C.terracotta, fontWeight: 600 }}>revenue</b> problem. SDE @ Shaadi · AI Architect @ Open Paws · 4× Google Top 100.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}
            className="flex gap-3.5 flex-wrap items-center"
          >
            <a href={PM_RESUME} target="_blank" rel="noopener noreferrer"
              onMouseMove={magnetic} onMouseLeave={resetMag}
              className="inline-flex items-center gap-2.5 font-sans font-semibold rounded-[13px] transition-transform"
              style={{ fontSize: 14.5, padding: '14px 26px', background: C.espresso, color: C.beige, boxShadow: '0 14px 34px -14px rgba(33,27,22,.55)' }}>
              View résumé
            </a>
            <a href="#systems"
              onMouseMove={magnetic} onMouseLeave={resetMag}
              className="inline-flex items-center gap-2.5 font-sans font-semibold rounded-[13px] transition-transform"
              style={{ fontSize: 14.5, padding: '14px 26px', color: C.espresso, border: `1px solid ${C.line}` }}>
              Explore the work →
            </a>
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15, duration: 0.8 }}
            href="https://youtu.be/RrzH9T-ODyU" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 mt-6 font-sans group"
            style={{ fontSize: 13.5, color: C.muted }}
          >
            <span className="inline-flex items-center justify-center rounded-full transition-transform group-hover:scale-110"
              style={{ width: 28, height: 28, background: C.terracotta, color: '#fff', fontSize: 9, paddingLeft: 2 }}>▶</span>
            Watch my 2-min intro — <span style={{ color: C.espresso }}>who I am, what I&apos;ve built</span>
          </motion.a>
        </div>

        {/* RIGHT — photo anchor + floating glass UI (contained box, no overflow) */}
        <div className="relative hidden md:flex items-center justify-center min-w-0">
          <div className="relative" style={{ width: 420, maxWidth: '100%', height: 468 }}>
            {/* photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.32, 1] }}
              className="absolute rounded-[24px] overflow-hidden"
              style={{ width: 300, height: 338, left: 60, top: 40, boxShadow: '0 40px 80px -30px rgba(33,27,22,.55)' }}
            >
              <img src="/evidence/devfest-bhopal.png" alt="Kailash Sharma speaking"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', filter: 'contrast(1.05) saturate(1.02)' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(33,27,22,.35))' }} />
              <div className="absolute inset-0 rounded-[24px]" style={{ border: '1px solid rgba(255,255,255,.4)' }} />
            </motion.div>

            {/* status pill — top right, inside box */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.32, 1] }}
              className="absolute flex items-center gap-2 rounded-[16px] overflow-hidden"
              style={{ ...glassStyle, top: 24, right: 0, padding: '8px 13px' }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.teal, boxShadow: `0 0 9px ${C.teal}`, flexShrink: 0 }} className="animate-pulse" />
              <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>Currently shipping
                <span className="font-mono block" style={{ fontSize: 8.5, color: C.muted, fontWeight: 400 }}>SDE @ Shaadi · AI @ Open Paws</span>
              </div>
            </motion.div>

            {/* DAU KPI — left, inside box */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.3, duration: 0.7, ease: [0.22, 1, 0.32, 1] }}
              className="absolute rounded-[16px] overflow-hidden"
              style={{ ...glassStyle, top: 140, left: 0, padding: '12px 15px' }}
            >
              <div className="font-mono" style={{ fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.muted }}>Users impacted · daily</div>
              <div style={{ fontSize: '1.7rem', fontWeight: 700, lineHeight: 1.05 }}>
                <CountUp to={200} delay={1300} /><span style={{ color: C.terracotta }}>K+</span>
              </div>
              <svg viewBox="0 0 90 26" preserveAspectRatio="none" style={{ display: 'block', width: 90, height: 26, marginTop: 2 }}>
                <motion.path d="M2,22 C18,20 32,15 46,10 C60,5 76,4 88,2" fill="none" stroke={C.terracotta} strokeWidth="2" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.5, duration: 1.4, ease: 'easeOut' }} />
              </svg>
            </motion.div>

            {/* dashboard strip — bottom, contained */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1.45, duration: 0.8, ease: [0.22, 1, 0.32, 1] }}
              className="absolute rounded-[16px] overflow-hidden"
              style={{ ...glassStyle, bottom: 0, left: 50, width: 320, padding: '14px 16px' }}
            >
              <div className="font-mono mb-3" style={{ fontSize: 10.5, color: C.muted }}><b style={{ color: C.espresso }}>KAILASH</b> · v4.0 — now in Product</div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { n: <><CountUp to={4} delay={1500} suffix="×" /></>, k: 'Google Top 100', c: C.espresso },
                  { n: '<12mo', k: 'Intern → SDE', c: C.terracotta },
                  { n: <><CountUp to={370} delay={1500} suffix="+" /></>, k: 'OSS contributors', c: C.teal },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1, color: s.c }}>{s.n}</div>
                    <div className="font-mono" style={{ fontSize: 7, letterSpacing: '0.04em', textTransform: 'uppercase', color: C.muted, marginTop: 5, lineHeight: 1.3 }}>{s.k}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        className="absolute left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-[3]" style={{ bottom: 24 }}
      >
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.muted }}>The journey</span>
        <motion.div animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{ width: 1, height: 32, background: `linear-gradient(${C.terracotta}, transparent)`, transformOrigin: 'top' }} />
      </motion.div>
    </section>
  );
}
