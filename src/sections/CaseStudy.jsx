import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PipelineFunnel, RetentionCurve } from '../components/Illustrations';

const D = {
  bg: '#211B16',      // warm espresso — the "night version" of the beige world, not black
  bgDeep: '#1A140F',
  ink: '#F2ECDD',
  muted: '#A89A86',
  terracotta: '#E0683A',
  teal: '#3AB6A8',
  line: 'rgba(242,236,221,.12)',
};

function Metric({ to, prefix = '', suffix = '', label, color, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf; const t0 = performance.now() + delay;
    const tick = (now) => {
      const p = Math.min(Math.max(now - t0, 0) / 1200, 1);
      const k = 1 - Math.pow(1 - p, 3);
      setV(Math.round(k * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, delay]);
  return (
    <div ref={ref}>
      <div className="font-serif" style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)', lineHeight: 1, color }}>
        {prefix}{v}{suffix}
      </div>
    </div>
  );
}

export default function CaseStudy() {
  return (
    <section id="case-study" className="relative overflow-hidden" style={{ background: D.bg, color: D.ink }}>
      {/* clean terracotta hairline at the top edge — no muddy gradient */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: 2, background: D.terracotta, opacity: 0.5, zIndex: 3 }} />
      {/* terracotta glow + grain */}
      <div className="absolute pointer-events-none" style={{ width: '60vw', height: '60vw', right: '-15%', top: '-20%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,104,58,.16), transparent 60%)', filter: 'blur(80px)' }} />
      <div className="absolute pointer-events-none" style={{ width: '46vw', height: '46vw', left: '-12%', bottom: '-18%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(58,182,168,.10), transparent 62%)', filter: 'blur(80px)' }} />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-20 py-28 sm:py-36">
        <motion.span
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="font-mono inline-flex items-center gap-2.5 mb-7"
          style={{ fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: D.terracotta }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: D.terracotta, boxShadow: `0 0 9px ${D.terracotta}` }} />
          Case Study · the work I&apos;m proudest of
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="font-serif leading-[1.04] mb-6"
          style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', maxWidth: '20ch' }}
        >
          I made a 200K-user org <span style={{ color: D.terracotta, fontStyle: 'italic' }}>AI-native.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans mb-16" style={{ fontSize: 'clamp(1rem,1.5vw,1.18rem)', color: D.muted, maxWidth: '46ch', lineHeight: 1.6 }}
        >
          The thing I&apos;m proudest of isn&apos;t a feature — it&apos;s changing how an entire engineering team thinks. I was hired as an SDE. I left a system behind.
        </motion.p>

        {/* narrative: context → decision → outcome */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {[
            { k: 'The problem I chose', t: 'AI adoption wasn\'t a tooling gap — it was a behavior gap. People don\'t change workflows because you hand them a tool.', c: D.muted },
            { k: 'What I did', t: 'Built the adoption framework, ran the internal presentations, and drove org-wide Cursor + Claude rollout — a ₹1 crore annual commitment I had to justify and defend.', c: D.ink },
            { k: 'The bet', t: 'Workflow-first over mandate. I targeted the highest-friction dev loops first, so the value was undeniable before anyone was asked to switch.', c: D.muted },
          ].map((b, i) => (
            <motion.div
              key={b.k}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl p-6" style={{ background: 'rgba(244,238,226,.04)', border: `1px solid ${D.line}` }}
            >
              <div className="font-mono mb-3" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: D.terracotta }}>{b.k}</div>
              <p className="font-sans" style={{ fontSize: 14.5, lineHeight: 1.65, color: b.c }}>{b.t}</p>
            </motion.div>
          ))}
        </div>

        {/* impact metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-14 py-10" style={{ borderTop: `1px solid ${D.line}`, borderBottom: `1px solid ${D.line}` }}>
          {[
            { to: 15, prefix: '+', suffix: '%', label: 'Engineering velocity', color: D.terracotta },
            { to: 80, prefix: '−', suffix: '%', label: 'A/B cleanup effort', color: D.teal },
            { to: 20, prefix: '−', suffix: '%', label: 'Crash rate', color: D.terracotta },
            { to: 1, prefix: '₹', suffix: ' Cr', label: 'Annual AI plan I drove', color: D.teal },
          ].map((m, i) => (
            <div key={m.label}>
              <Metric to={m.to} prefix={m.prefix} suffix={m.suffix} color={m.color} delay={i * 100} />
              <div className="font-mono mt-3" style={{ fontSize: 10.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: D.muted, lineHeight: 1.4 }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* GTM pipeline funnel — the AI-for-revenue thesis, visualised */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="rounded-xl p-6 mb-6" style={{ background: 'rgba(242,236,221,.04)', border: `1px solid ${D.line}` }}
        >
          <PipelineFunnel dark />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="rounded-xl p-6 mb-6" style={{ background: 'rgba(242,236,221,.04)', border: `1px solid ${D.line}` }}
        >
          <RetentionCurve dark />
        </motion.div>

        {/* decision-log card (neobrutalist on dark) + pull quote */}
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="rounded-xl p-6 font-mono" style={{ background: '#0E0B09', border: `1.5px solid ${D.terracotta}`, boxShadow: `6px 6px 0 0 rgba(224,104,58,.22)` }}
          >
            <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: D.terracotta, marginBottom: 14 }}>// decision log</div>
            {[
              ['DECISION', 'Ship a workflow, not a mandate.'],
              ['TRADEOFF', 'Slower start — but durable, opt-in adoption.'],
              ['OUTCOME', 'Org-wide rollout. Velocity up, churn of effort down.'],
            ].map(([k, v]) => (
              <div key={k} className="mb-3 last:mb-0">
                <span style={{ fontSize: 10.5, color: D.teal }}>{k}: </span>
                <span style={{ fontSize: 13, color: D.ink }}>{v}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl p-6 flex flex-col justify-between" style={{ background: 'rgba(244,238,226,.04)', border: `1px solid ${D.line}` }}
          >
            <p className="font-serif italic" style={{ fontSize: '1.35rem', lineHeight: 1.4, color: D.ink }}>
              &ldquo;Pioneer of AI.&rdquo;
            </p>
            <p className="font-mono mt-3" style={{ fontSize: 11, color: D.muted }}>— what my Product Director called me</p>
            <div className="flex gap-4 mt-5">
              <a href="https://youtu.be/9iy6XTGBMU0" target="_blank" rel="noopener noreferrer" className="font-mono transition-colors" style={{ fontSize: 11.5, color: D.terracotta }}>Watch the rollout ↗</a>
              <a href="https://youtu.be/tNQ7jIXdJkU" target="_blank" rel="noopener noreferrer" className="font-mono transition-colors" style={{ fontSize: 11.5, color: D.terracotta }}>The talk ↗</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
