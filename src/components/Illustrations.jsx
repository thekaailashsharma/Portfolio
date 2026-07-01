import { Fragment } from 'react';
import { motion } from 'framer-motion';

const T = '#C8502A';   // terracotta — default accent
const TEAL = '#0E7C7B'; // teal — live / AI / data only
const GOLD = '#C89645';

function Frame({ title, sub, children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-surface-3/50 bg-surface-1/40 backdrop-blur-md p-5 ${className}`} style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.4)' }}>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent/50 mb-1">{title}</div>
      {sub && <div className="font-sans text-[12.5px] dark:text-zinc-400 text-stone-500 mb-4 leading-snug">{sub}</div>}
      {children}
    </div>
  );
}

/* 1 — Impact × Effort 2×2: his work, plotted (the classic PM prioritisation frame) */
export function ImpactEffortMatrix() {
  const dots = [
    { x: 76, y: 20, s: 26, l: 'AI Adoption', c: T },
    { x: 30, y: 22, s: 20, l: 'n8n Pipelines', c: TEAL },
    { x: 54, y: 32, s: 20, l: 'Nuvi', c: T },
    { x: 62, y: 54, s: 16, l: 'Dark Pattern', c: T },
    { x: 26, y: 58, s: 16, l: 'Tripify', c: TEAL },
    { x: 46, y: 68, s: 15, l: 'Waste2Wealth', c: GOLD },
  ];
  return (
    <Frame title="How I prioritise" sub="Every project, plotted — impact vs effort. I bias to high-impact, low-effort.">
      <div className="relative w-full" style={{ aspectRatio: '1.5' }}>
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-surface-4/40" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-surface-4/40" />
        <span className="absolute -top-1 left-[52%] font-mono text-[8px] text-stone-400 uppercase tracking-wider">Impact ↑</span>
        <span className="absolute bottom-0 right-0 font-mono text-[8px] text-stone-400 uppercase tracking-wider">Effort →</span>
        {dots.map((d, i) => (
          <motion.div key={d.l} className="absolute flex flex-col items-center gap-1" style={{ left: `${d.x}%`, top: `${d.y}%`, transform: 'translate(-50%,-50%)' }}
            initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 260, damping: 18 }}>
            <span style={{ width: d.s, height: d.s, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,.75), ${d.c})`, boxShadow: `0 5px 14px -3px ${d.c}` }} />
            <span className="font-mono text-[8px] whitespace-nowrap px-1.5 py-0.5 rounded bg-surface-1/80 border border-surface-3/50" style={{ color: 'var(--text-secondary)' }}>{d.l}</span>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/* 2 — North-Star tree: my whole trajectory, not one company */
export function NorthStarTree() {
  // arenas I've operated across — proof I'm not one company or one lane
  const leaves = [
    ['Consumer', 'Shaadi', T],
    ['AI systems', 'Open Paws', TEAL],
    ['Revenue / GTM', 'Leadbeam', GOLD],
    ['Founder', 'Nuvi', T],
    ['Zero-to-one', '4× Top 100', TEAL],
    ['Community', 'talks · OSS', GOLD],
  ];
  return (
    <Frame title="North Star" sub="One through-line across everywhere I've worked — not one company, not one lane.">
      <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-center mb-5 rounded-xl py-3.5 px-3" style={{ background: 'rgba(200,80,42,.08)', border: '1px solid rgba(200,80,42,.2)' }}>
        <div className="font-serif text-[17px] leading-tight" style={{ color: T }}>Turn undefined problems into products that move the needle</div>
      </motion.div>
      <div className="grid grid-cols-3 gap-2">
        {leaves.map((l, i) => (
          <motion.div key={l[0]} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 + i * 0.08 }}
            className="rounded-lg p-2 text-center bg-surface-1/60 border border-surface-3/50">
            <div className="font-sans text-[11px] leading-tight" style={{ color: l[2] }}>{l[0]}</div>
            <div className="font-mono text-[8px] text-stone-400 mt-0.5">{l[1]}</div>
          </motion.div>
        ))}
      </div>
    </Frame>
  );
}

/* 3 — T-shaped skill surface */
export function SkillSurface() {
  const skills = [['Product', 90], ['Engineering', 88], ['AI Systems', 85], ['GTM / Growth', 76], ['Design sense', 70]];
  return (
    <Frame title="T-shaped" sub="Depth across the whole stack — where I go when the problem needs me.">
      <div className="space-y-3">
        {skills.map((s, i) => (
          <div key={s[0]}>
            <div className="flex justify-between font-mono text-[9px] mb-1"><span style={{ color: 'var(--text-secondary)' }}>{s[0]}</span></div>
            <div className="h-1.5 rounded-full bg-surface-3/50 overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ background: i % 2 ? TEAL : T }}
                initial={{ width: 0 }} whileInView={{ width: `${s[1]}%` }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08, duration: 0.9, ease: 'easeOut' }} />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* 4 — Why-before-how loop (his philosophy) */
export function WhyBeforeHowLoop() {
  const steps = ['Why', 'What', 'How', 'Ship', 'Learn'];
  return (
    <Frame title="How I work" sub="I want to know the why before the how — then ship and learn.">
      <div className="flex items-center justify-between flex-wrap gap-y-2">
        {steps.map((s, i) => (
          <Fragment key={s}>
            <motion.span initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12, type: 'spring', stiffness: 300, damping: 20 }}
              className="font-mono text-[11px] px-3 py-1.5 rounded-full border" style={{ borderColor: i === 0 ? 'rgba(200,80,42,.4)' : 'var(--surface-4)', color: i === 0 ? T : 'var(--text-secondary)', background: i === 0 ? 'rgba(200,80,42,.08)' : 'transparent' }}>{s}</motion.span>
            {i < steps.length - 1 && <span className="text-accent/40 text-xs">→</span>}
          </Fragment>
        ))}
        <span className="text-accent/50 text-sm" title="repeat">↺</span>
      </div>
    </Frame>
  );
}

/* 6 — Operating profile radar (the four traits, visualised) */
export function OperatingProfile() {
  const axes = [
    { l: 'Builder', v: 0.94, a: -90 },
    { l: 'Product', v: 0.9, a: 0 },
    { l: 'Ambiguity', v: 0.86, a: 90 },
    { l: 'Engineering', v: 0.88, a: 180 },
  ];
  const cx = 90, cy = 90, R = 62;
  const pt = (v, aDeg) => {
    const a = (aDeg * Math.PI) / 180;
    return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v];
  };
  const poly = axes.map((x) => pt(x.v, x.a).join(',')).join(' ');
  return (
    <Frame title="Operating profile" sub="How I show up: builder-first, comfortable in ambiguity, product-minded, engineering depth.">
      <div className="flex items-center justify-center">
        <svg viewBox="-52 -18 284 216" className="w-full max-w-[260px]">
          {[0.33, 0.66, 1].map((r) => (
            <polygon key={r} points={axes.map((x) => pt(r, x.a).join(',')).join(' ')} fill="none" stroke="var(--surface-4)" strokeOpacity="0.5" strokeWidth="1" />
          ))}
          {axes.map((x) => { const [px, py] = pt(1, x.a); return <line key={x.l} x1={cx} y1={cy} x2={px} y2={py} stroke="var(--surface-4)" strokeOpacity="0.4" />; })}
          <motion.polygon points={poly} fill="rgba(200,80,42,.18)" stroke={T} strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 120, damping: 16 }} style={{ transformOrigin: '90px 90px' }} />
          {axes.map((x) => { const [px, py] = pt(x.v, x.a); return <circle key={x.l} cx={px} cy={py} r="3" fill={T} />; })}
          {axes.map((x) => { const [px, py] = pt(1.16, x.a); return <text key={x.l} x={px} y={py} textAnchor="middle" dominantBaseline="middle" className="font-mono" style={{ fontSize: 8, fill: 'var(--text-secondary)' }}>{x.l}</text>; })}
        </svg>
      </div>
    </Frame>
  );
}

// small process illustration — his "give me a problem and a week" pitch
export function FirstWeek() {
  const steps = [['Day 1', 'Find the why', T], ['Day 2–4', 'Prototype', TEAL], ['Day 5–7', 'Ship + measure', GOLD]];
  return (
    <Frame title="Give me a week" sub="What a live-build evaluation looks like — I'd rather show than tell.">
      <div className="flex items-center justify-between">
        {steps.map((s, i) => (
          <Fragment key={s[0]}>
            <motion.div className="text-center px-1" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
              <div className="w-9 h-9 mx-auto rounded-full flex items-center justify-center font-mono text-[12px]" style={{ background: `${s[2]}1f`, color: s[2], border: `1px solid ${s[2]}55` }}>{i + 1}</div>
              <div className="font-mono text-[8px] text-stone-400 mt-2">{s[0]}</div>
              <div className="font-sans text-[11px] mt-0.5 whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>{s[1]}</div>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div className="flex-1 h-px mx-1" style={{ background: 'linear-gradient(90deg, rgba(200,80,42,.35), rgba(14,124,123,.35))', transformOrigin: 'left' }}
                initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }} />
            )}
          </Fragment>
        ))}
      </div>
    </Frame>
  );
}

/* ============ MICRO illustrations (reused across metrics) ============ */

// micro: sparkline (draws on view)
export function Sparkline({ points = [6, 9, 8, 13, 12, 18, 17, 26], color = TEAL, w = 76, h = 22 }) {
  const max = Math.max(...points), min = Math.min(...points);
  const d = points.map((p, i) => `${(i / (points.length - 1)) * w},${h - ((p - min) / (max - min || 1)) * (h - 4) - 2}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="inline-block align-middle overflow-visible">
      <motion.polyline points={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: 'easeOut' }} />
      <motion.circle cx={w} cy={h - ((points[points.length - 1] - min) / (max - min || 1)) * (h - 4) - 2} r="2.5" fill={color}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1 }} />
    </svg>
  );
}

// micro: trend chip
export function TrendChip({ label, up = true, color }) {
  const c = color || (up ? TEAL : T);
  return <span className="inline-flex items-center gap-1 font-mono text-[10px]" style={{ color: c }}>{up ? '▲' : '▼'} {label}</span>;
}

// micro: progress ring
export function ProgressRing({ pct = 75, label, sub, color = T, size = 66 }) {
  const r = size / 2 - 6, circ = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth="5" />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circ} initial={{ strokeDashoffset: circ }} whileInView={{ strokeDashoffset: circ * (1 - pct / 100) }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} />
      </svg>
      <div>
        <div className="font-serif text-lg leading-none" style={{ color }}>{label}</div>
        {sub && <div className="font-mono text-[9px] text-stone-400 mt-1">{sub}</div>}
      </div>
    </div>
  );
}

/* ============ MAJOR illustrations ============ */

// major: RICE-style prioritisation bars (the "better" prioritisation viz)
export function RicePrioritization() {
  const items = [
    ['AI Adoption @ Shaadi', 96, T],
    ['Autonomous AI Pipelines', 88, TEAL],
    ['Nuvi', 82, T],
    ['Dark Pattern Detection', 71, GOLD],
    ['Tripify', 64, TEAL],
  ];
  return (
    <Frame title="How I sequence" sub="I ship the highest-leverage bet first — reach × impact ÷ effort. Not everything, in order.">
      <div className="space-y-2.5">
        {items.map((it, i) => (
          <div key={it[0]}>
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-sans text-[11.5px]" style={{ color: 'var(--text-secondary)' }}>{it[0]}</span>
              <span className="font-mono text-[9px]" style={{ color: it[2] }}>{it[1]}</span>
            </div>
            <div className="h-2 rounded-full bg-surface-3/50 overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ background: it[2] }}
                initial={{ width: 0 }} whileInView={{ width: `${it[1]}%` }} viewport={{ once: true }} transition={{ delay: 0.08 * i, duration: 0.9, ease: 'easeOut' }} />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// major: adoption/retention curve — compounds and holds (dark-aware)
export function RetentionCurve({ dark }) {
  const ink = dark ? 'rgba(242,236,221,.7)' : 'var(--text-secondary)';
  const grid = dark ? 'rgba(242,236,221,.1)' : 'rgba(33,27,22,.08)';
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] mb-1" style={{ color: TEAL }}>Adoption over rollout</div>
      <div className="font-sans text-[12.5px] mb-3" style={{ color: ink }}>AI adoption didn&apos;t spike and fade — it compounded and held.</div>
      <svg viewBox="0 0 300 110" className="w-full">
        {[27, 54, 81].map((y) => <line key={y} x1="0" y1={y} x2="300" y2={y} stroke={grid} strokeWidth="1" />)}
        <motion.path d="M0,96 C60,90 100,70 150,50 C200,30 250,22 300,18" fill="none" stroke={T} strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: 'easeOut' }} />
        <motion.circle cx="300" cy="18" r="4" fill={T} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.4 }} />
      </svg>
      <div className="flex justify-between font-mono text-[8px] mt-1" style={{ color: ink }}><span>wk 1</span><span>wk 6</span><span>+15% velocity, held</span></div>
    </div>
  );
}

/* 5 — GTM pipeline funnel (his AI-for-revenue thesis) */
export function PipelineFunnel({ dark }) {
  const stages = [['Signal', 100], ['Research', 82], ['Enrich', 64], ['Outreach', 46], ['Pipeline', 30]];
  const inkMuted = dark ? 'rgba(242,236,221,.7)' : 'var(--text-secondary)';
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.2em] mb-3" style={{ color: TEAL }}>GTM pipeline · AI-run</div>
      <div className="space-y-1.5">
        {stages.map((s, i) => (
          <motion.div key={s[0]} initial={{ opacity: 0, scaleX: 0.6 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, ease: 'easeOut' }}
            className="mx-auto rounded flex items-center justify-center font-mono text-[10px]" style={{ width: `${s[1]}%`, background: `linear-gradient(90deg, ${TEAL}, ${T})`, opacity: 0.9, height: 24, color: '#fff', transformOrigin: 'center' }}>
            {s[0]}
          </motion.div>
        ))}
      </div>
      <div className="font-mono text-[9px] mt-3 text-center" style={{ color: inkMuted }}>2-hour SDR research → <span style={{ color: TEAL }}>minutes</span>, no humans in the loop</div>
    </div>
  );
}
