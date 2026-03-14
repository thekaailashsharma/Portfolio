import { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';
import { useTheme } from '../hooks/useTheme';
import { useSound } from './SoundManager';

/* ──────────────────────── page data ──────────────────────── */

const bookPages = [
  { id: 'cover', type: 'cover' },
  { id: 'quote', type: 'quote' },
  { id: 'toc', type: 'toc' },
  { id: 'ch1', type: 'chapter', num: 'I', title: 'The Builder', tagline: 'Identity, philosophy, and the numbers behind it' },
  { id: 'about', type: 'about' },
  { id: 'stats', type: 'stats' },
  { id: 'photo-devfest', type: 'photo', src: '/evidence/devfest-mumbai.png', caption: 'Speaking at DevFest Mumbai' },
  { id: 'ch2', type: 'chapter', num: 'II', title: 'The Work', tagline: 'Zero-to-one systems that shipped' },
  { id: 'proj-tripify', type: 'project', name: 'Tripify', tagline: 'AI-Powered Travel Manager', impact: '600+ downloads · Native Android & iOS', learning: 'Integrating multiple map SDKs taught me the hardest UX problem is making complex data feel simple.', stack: ['Kotlin', 'Swift', 'Google Maps', 'AI'] },
  { id: 'proj-w2w', type: 'project', name: 'Waste2Wealth', tagline: 'Making Cities Sustainable', impact: 'Global Top 100 · 1st at Mumbai Hacks (500+)', learning: 'Behavior change needs incentive design, not just awareness campaigns.', stack: ['Android', 'Firebase', 'GCP'] },
  { id: 'photo-mumbai', type: 'photo', src: '/evidence/mumbai-hacks.png', caption: '1st Place — Mumbai Hacks, 500+ participants' },
  { id: 'proj-wow', type: 'project', name: 'Wowdrobe', tagline: 'Fashion Search + Thrift Economy', impact: 'Global Top 100 · Titan Finalist', learning: 'Search is a product problem, not a technology problem. What users search for reveals what they actually want.', stack: ['Android', 'iOS', 'Search', 'ML'] },
  { id: 'proj-evolve', type: 'project', name: 'Evolve with AI', tagline: 'AI Keyboard for Android', impact: 'Featured by Google Play Academy · #AndroidSpotlight', learning: 'The best AI interfaces disappear into existing workflows.', stack: ['Kotlin', 'Compose', 'AI/ML'] },
  { id: 'photo-g20', type: 'photo', src: '/evidence/g20-hackathon.png', caption: 'Top 5 — G20 Google Hackathon, ISB Hyderabad' },
  { id: 'ch3', type: 'chapter', num: 'III', title: 'The Journey', tagline: 'Every role taught something the last one couldn\'t' },
  { id: 'timeline-recent', type: 'timeline', label: 'Recent', items: [
    { year: '2025', role: 'SDE I', place: 'Shaadi.com', note: 'Promoted. 10k+ daily users.' },
    { year: '2025', role: 'AI Architect & Community', place: 'Open Paws', note: 'Production AI systems.' },
    { year: '2024', role: 'SDE Intern', place: 'Shaadi.com', note: 'Real-time communication.' },
    { year: '2024', role: 'Product + Dev', place: 'Leadbeam.ai', note: '15+ FCM flows, 200+ users.' },
    { year: '2024', role: 'Product Manager', place: 'My Irish Cousin', note: 'International product.' },
  ]},
  { id: 'timeline-early', type: 'timeline', label: 'Foundations', items: [
    { year: '2023', role: 'Android Dev', place: 'Fold Money', note: 'Bengaluru. 10k+ users.' },
    { year: '2023', role: 'Android Dev', place: 'Easocare', note: 'Early Compose migration.' },
    { year: '2023', role: 'Content Creator', place: 'Internshala', note: 'Technical writing.' },
    { year: '2023-24', role: 'Hackathons', place: '2× Google Top 100', note: '1st Mumbai Hacks, G20 Top 5' },
  ]},
  { id: 'photo-foss', type: 'photo', src: '/evidence/foss-hacks.png', caption: 'Mentoring at FOSS Hacks 2.0, Pune' },
  { id: 'ch4', type: 'chapter', num: 'IV', title: 'The Voice', tagline: 'Speaking, writing, and thinking out loud' },
  { id: 'speaking', type: 'speaking' },
  { id: 'writing', type: 'writing' },
  { id: 'connect', type: 'connect' },
];

/* ──────────────────────── page renderers ──────────────────────── */

const Page = forwardRef(function Page({ children, className = '' }, ref) {
  return (
    <div ref={ref} className={`h-full w-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
});

function PaperBg({ dark }) {
  const bg = dark ? '#131315' : '#f5f2e8';
  const line = dark ? 'rgba(200,168,124,0.04)' : 'rgba(139,111,71,0.06)';
  return (
    <div className="absolute inset-0" style={{
      background: bg,
      backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, ${line} 32px)`,
      backgroundPosition: '0 48px',
    }} />
  );
}

function Vignette() {
  return <div className="absolute inset-0 pointer-events-none" style={{
    background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.08) 100%)',
  }} />;
}

function PageNum({ num, total }) {
  return (
    <span className="absolute bottom-4 right-5 font-mono text-[9px] dark:text-zinc-700 text-stone-400/60">
      {num} / {total}
    </span>
  );
}

function Signature({ dark }) {
  return (
    <img
      src="/sign.png"
      alt="Signature"
      className="h-12 w-auto"
      style={{
        mixBlendMode: dark ? 'screen' : 'multiply',
        filter: dark ? 'invert(1)' : 'none',
        opacity: 0.8,
      }}
    />
  );
}

function CoverPage({ dark }) {
  return (
    <div className="relative h-full flex flex-col items-center justify-center text-center px-8"
      style={{ background: dark ? 'linear-gradient(160deg,#1a1815,#0f0e0c)' : 'linear-gradient(160deg,#ebe6d8,#f5f2e8)' }}>
      <div className="absolute top-5 left-5 right-5 bottom-5 border rounded-lg" style={{ borderColor: 'var(--accent)', opacity: 0.12 }} />
      <div className="absolute top-5 left-5 right-5 bottom-5 border rounded-lg m-2" style={{ borderColor: 'var(--accent)', opacity: 0.06 }} />
      <div className="relative flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 mb-6" style={{ borderColor: 'var(--accent)', opacity: 0.8 }}>
          <img src="/evidence/devfest-bhopal.png" alt="Kailash" className="w-full h-full object-cover object-top" />
        </div>
        <span className="font-mono text-[7px] uppercase tracking-[0.5em] text-accent/30 mb-4">Portfolio</span>
        <h1 className="font-serif text-[32px] leading-tight mb-1" style={{ color: 'var(--text-primary)' }}>Kailash</h1>
        <h1 className="font-serif italic text-[32px] leading-tight mb-6" style={{ color: 'var(--accent)' }}>Sharma</h1>
        <p className="font-serif italic text-[13px] leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
          Builder of Products, AI Systems,{'\n'}and Messy First Versions
        </p>
        <div className="w-10 h-px mb-4" style={{ background: 'var(--accent)', opacity: 0.25 }} />
        <span className="font-mono text-[8px] tracking-wider" style={{ color: 'var(--text-muted)' }}>Mumbai, India · 2025</span>
      </div>
      <Vignette />
    </div>
  );
}

function QuotePage({ dark }) {
  return (
    <div className="relative h-full flex flex-col items-center justify-center px-8 text-center"
      style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <div className="relative max-w-[85%]">
        <span className="font-serif text-[48px] leading-none block mb-2" style={{ color: 'var(--accent)', opacity: 0.2 }}>"</span>
        <p className="font-serif italic text-[17px] leading-[1.7] mb-8" style={{ color: 'var(--text-primary)' }}>
          Innovation is outcome of a habit, not a random act. To invent tomorrow is a great achievement than modifying the past.
        </p>
        <div className="flex justify-center">
          <Signature dark={dark} />
        </div>
      </div>
      <Vignette />
    </div>
  );
}

function TocPage({ dark, total }) {
  const chapters = [
    { num: 'I', title: 'The Builder', page: 4 },
    { num: 'II', title: 'The Work', page: 8 },
    { num: 'III', title: 'The Journey', page: 15 },
    { num: 'IV', title: 'The Voice', page: 19 },
  ];
  return (
    <div className="relative h-full px-7 pt-16 pb-8" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <span className="font-mono text-[7px] uppercase tracking-[0.4em] block mb-8" style={{ color: 'var(--accent)', opacity: 0.4 }}>Contents</span>
      <div className="space-y-5">
        {chapters.map((ch) => (
          <div key={ch.num} className="flex items-baseline gap-3">
            <span className="font-serif text-[13px] shrink-0" style={{ color: 'var(--accent)', opacity: 0.5 }}>{ch.num}</span>
            <span className="font-serif text-[16px]" style={{ color: 'var(--text-primary)' }}>{ch.title}</span>
            <span className="flex-1 border-b border-dotted mx-1" style={{ borderColor: 'var(--surface-4)', opacity: 0.4 }} />
            <span className="font-mono text-[10px]" style={{ color: 'var(--text-muted)' }}>{ch.page}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-12 left-7 right-7">
        <div className="h-px mb-4" style={{ background: 'var(--surface-4)', opacity: 0.3 }} />
        <p className="font-mono text-[8px] italic" style={{ color: 'var(--text-muted)' }}>
          Swipe or drag corner to turn pages
        </p>
      </div>
      <PageNum num={3} total={total} />
      <Vignette />
    </div>
  );
}

function ChapterPage({ num, title, tagline, dark }) {
  return (
    <div className="relative h-full flex flex-col items-center justify-center text-center px-8"
      style={{ background: dark ? 'linear-gradient(145deg,#1a1714,#131315)' : 'linear-gradient(145deg,#ede8da,#f5f2e8)' }}>
      <span className="font-serif text-[72px] leading-none mb-4" style={{ color: 'var(--accent)', opacity: 0.12 }}>{num}</span>
      <h2 className="font-serif text-[28px] mb-3" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      <div className="w-8 h-px mb-3" style={{ background: 'var(--accent)', opacity: 0.3 }} />
      <p className="font-sans text-[11px] max-w-[70%] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{tagline}</p>
      <Vignette />
    </div>
  );
}

function AboutPage({ dark, total, pageNum }) {
  return (
    <div className="relative h-full px-7 pt-14 pb-8" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative">
        <span className="font-mono text-[7px] uppercase tracking-[0.3em] block mb-5" style={{ color: 'var(--accent)', opacity: 0.4 }}>About</span>
        <p className="font-serif italic text-[17px] leading-[1.6] mb-6" style={{ color: 'var(--text-primary)' }}>
          "You can't deliver the future if you're not in the future."
        </p>
        <p className="font-sans text-[13px] leading-[1.8] mb-4" style={{ color: 'var(--text-secondary)' }}>
          I build things in spaces where the problem isn't fully defined yet. Consumer products, AI systems, and early-stage execution.
        </p>
        <p className="font-sans text-[13px] leading-[1.8] mb-6" style={{ color: 'var(--text-secondary)' }}>
          At Shaadi.com, I own real-time communication for 10k+ daily users. At Open Paws, I architect AI systems and build community.
        </p>
        <div className="space-y-2 mt-6">
          {['Builder Mindset', 'Comfort with Ambiguity', 'Product Thinking', 'Engineering Depth'].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full" style={{ background: 'var(--accent)', opacity: 0.5 }} />
              <span className="font-mono text-[10px]" style={{ color: 'var(--text-muted)' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
      <PageNum num={pageNum} total={total} />
      <Vignette />
    </div>
  );
}

function StatsPage({ dark, total, pageNum }) {
  const stats = [
    { value: '10k+', label: 'Daily Users', sub: 'Shaadi.com' },
    { value: '2×100', label: 'Global Top', sub: 'Google Solution Challenge' },
    { value: '1st', label: 'Hackathon', sub: 'Mumbai Hacks · 500+' },
    { value: '62+', label: 'GitHub Repos', sub: 'and counting' },
  ];
  return (
    <div className="relative h-full px-7 pt-14 pb-8" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative">
        <span className="font-mono text-[7px] uppercase tracking-[0.3em] block mb-6" style={{ color: 'var(--accent)', opacity: 0.4 }}>By the Numbers</span>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="p-4 rounded-xl border" style={{ borderColor: 'var(--surface-3)', background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
              <span className="font-serif text-[28px] block mb-1" style={{ color: 'var(--text-primary)' }}>{s.value}</span>
              <span className="font-mono text-[8px] uppercase tracking-wider block mb-0.5" style={{ color: 'var(--accent)', opacity: 0.5 }}>{s.label}</span>
              <span className="font-sans text-[10px]" style={{ color: 'var(--text-muted)' }}>{s.sub}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {['AI Systems', 'Android', 'iOS', 'Product', 'GenAI', 'Backend'].map((s) => (
            <span key={s} className="font-mono text-[8px] px-2 py-0.5 rounded-md border" style={{ borderColor: 'var(--surface-3)', color: 'var(--text-muted)' }}>{s}</span>
          ))}
        </div>
      </div>
      <PageNum num={pageNum} total={total} />
      <Vignette />
    </div>
  );
}

function PhotoPage({ src, caption, dark }) {
  return (
    <div className="relative h-full" style={{ background: dark ? '#0a0a0b' : '#e5e0d3' }}>
      <img src={src} alt={caption} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute bottom-0 left-0 right-0 px-5 py-3" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
        <p className="font-mono text-[9px] text-white/70 tracking-wider">{caption}</p>
      </div>
    </div>
  );
}

function ProjectPage({ name, tagline, impact, learning, stack, dark, total, pageNum }) {
  return (
    <div className="relative h-full px-7 pt-14 pb-8 flex flex-col justify-center" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative">
        <span className="font-mono text-[7px] uppercase tracking-[0.3em] block mb-6" style={{ color: 'var(--accent)', opacity: 0.4 }}>Systems</span>
        <h2 className="font-serif text-[26px] mb-1" style={{ color: 'var(--text-primary)' }}>{name}</h2>
        <p className="font-mono text-[9px] uppercase tracking-wider mb-6" style={{ color: 'var(--accent)', opacity: 0.5 }}>{tagline}</p>
        <div className="mb-4 px-3 py-2 rounded-lg" style={{ background: dark ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.06)' }}>
          <span className="font-mono text-[7px] uppercase tracking-wider block mb-1" style={{ color: dark ? 'rgba(110,231,183,0.6)' : 'rgba(5,150,105,0.6)' }}>Impact</span>
          <p className="font-sans text-[12px]" style={{ color: dark ? 'rgba(110,231,183,0.8)' : 'rgba(5,150,105,0.8)' }}>{impact}</p>
        </div>
        <div className="p-3 rounded-lg border-l-2 mb-5" style={{ borderColor: 'var(--accent)', opacity: 0.8, background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
          <span className="font-mono text-[7px] uppercase tracking-wider block mb-1" style={{ color: 'var(--accent)', opacity: 0.4 }}>Key Learning</span>
          <p className="font-sans text-[12px] italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{learning}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {stack.map((t) => (
            <span key={t} className="font-mono text-[8px] px-2 py-0.5 rounded-md border" style={{ borderColor: 'var(--surface-3)', color: 'var(--text-muted)' }}>{t}</span>
          ))}
        </div>
      </div>
      <PageNum num={pageNum} total={total} />
      <Vignette />
    </div>
  );
}

function TimelinePage({ label, items, dark, total, pageNum }) {
  return (
    <div className="relative h-full px-7 pt-14 pb-8" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative">
        <span className="font-mono text-[7px] uppercase tracking-[0.3em] block mb-5" style={{ color: 'var(--accent)', opacity: 0.4 }}>Journey · {label}</span>
        <div className="space-y-2.5">
          {items.map((item, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-lg border" style={{ borderColor: 'var(--surface-3)', background: dark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.015)' }}>
              <span className="font-mono text-[10px] shrink-0 w-12" style={{ color: 'var(--accent)', opacity: 0.6 }}>{item.year}</span>
              <div>
                <span className="font-sans text-[12px] block" style={{ color: 'var(--text-primary)' }}>{item.role}</span>
                <span className="font-mono text-[9px] block" style={{ color: 'var(--text-muted)' }}>{item.place}</span>
                <span className="font-sans text-[10px] italic" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>{item.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PageNum num={pageNum} total={total} />
      <Vignette />
    </div>
  );
}

function SpeakingPage({ dark, total, pageNum }) {
  const events = [
    { name: 'DevFest Mumbai', type: 'Conference', img: '/evidence/devfest-mumbai.png' },
    { name: 'DevFest Bhopal', type: 'Conference', img: '/evidence/devfest-bhopal.png' },
    { name: 'Swift Mumbai', type: 'Meetup', img: '/evidence/swift-mumbai.png' },
    { name: 'Swift Bengaluru', type: 'Meetup', img: '/evidence/swift-bengaluru.png' },
    { name: 'GDG MAD Mumbai', type: 'Community', img: '/evidence/gdg-mad.png' },
    { name: 'Droid Tribe', type: 'Community', img: '/evidence/droid-tribe.png' },
    { name: 'Huddle @ Shaadi', type: 'Internal', img: '/evidence/huddle-shaadi.WEBP' },
  ];
  return (
    <div className="relative h-full px-7 pt-14 pb-8" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative">
        <span className="font-mono text-[7px] uppercase tracking-[0.3em] block mb-2" style={{ color: 'var(--accent)', opacity: 0.4 }}>Speaking</span>
        <p className="font-serif text-[20px] mb-5" style={{ color: 'var(--text-primary)' }}>Teaching builders to ship faster.</p>
        <div className="space-y-2">
          {events.map((e) => (
            <div key={e.name} className="flex items-center gap-3 p-2 rounded-lg border" style={{ borderColor: 'var(--surface-3)', background: dark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.015)' }}>
              <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border" style={{ borderColor: 'var(--surface-4)' }}>
                <img src={e.img} alt={e.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-sans text-[12px] block truncate" style={{ color: 'var(--text-primary)' }}>{e.name}</span>
                <span className="font-mono text-[8px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{e.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PageNum num={pageNum} total={total} />
      <Vignette />
    </div>
  );
}

function WritingPage({ dark, total, pageNum }) {
  const posts = [
    { title: 'Taste as a Service', preview: 'Product taste as pattern recognition applied to UX', url: 'https://thekailashsharma.substack.com/p/taste-as-a-service' },
    { title: 'The AI Constitution Era Has Started', preview: 'AI governance is product design', url: 'https://thekailashsharma.substack.com/p/the-ai-constitution-era-has-started' },
    { title: 'Why Companies Are Still Hiring Humans', preview: 'AI replaces tasks, not judgment', url: 'https://thekailashsharma.substack.com/p/why-companies-are-still-hiring-humans' },
  ];
  return (
    <div className="relative h-full px-7 pt-14 pb-8 flex flex-col justify-center" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative">
        <span className="font-mono text-[7px] uppercase tracking-[0.3em] block mb-2" style={{ color: 'var(--accent)', opacity: 0.4 }}>Writing</span>
        <p className="font-mono text-[9px] mb-5" style={{ color: 'var(--text-muted)' }}>On Substack</p>
        <div className="space-y-3">
          {posts.map((p) => (
            <a key={p.title} href={p.url} target="_blank" rel="noopener noreferrer"
              className="block p-3.5 rounded-xl border transition-colors" style={{ borderColor: 'var(--surface-3)', background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}
              onClick={(e) => e.stopPropagation()}>
              <h3 className="font-serif text-[14px] mb-1" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
              <p className="font-sans text-[11px] italic" style={{ color: 'var(--text-muted)' }}>{p.preview}</p>
            </a>
          ))}
        </div>
        <a href="https://thekailashsharma.substack.com/" target="_blank" rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px]"
          style={{ color: 'var(--accent)' }} onClick={(e) => e.stopPropagation()}>
          Read more on Substack ↗
        </a>
      </div>
      <PageNum num={pageNum} total={total} />
      <Vignette />
    </div>
  );
}

function ConnectPage({ dark, total, pageNum }) {
  const links = [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/thekaailashsharma' },
    { label: 'GitHub', url: 'https://github.com/thekaailashsharma' },
    { label: 'Substack', url: 'https://thekailashsharma.substack.com/' },
    { label: 'Email', url: 'mailto:kailashps.1011@gmail.com' },
  ];
  const resumes = [
    { label: 'PM Resume', url: 'https://drive.google.com/file/d/12GDzn9b11O6LAaxzgUBon7t6f-KelTLE/view?usp=sharing' },
    { label: 'Full Resume', url: 'https://drive.google.com/file/d/1kx_fpXjZhOBBNHZmW3nawCmdDOFxEqj0/view?usp=sharing' },
    { label: 'Speaker / CFP', url: 'https://drive.google.com/file/d/169q0McYJEIDftS9-kXMRrdQbWMbfS3jZ/view?usp=sharing' },
  ];
  return (
    <div className="relative h-full px-7 flex flex-col items-center justify-center text-center" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative w-full">
        <h2 className="font-serif text-[26px] mb-6" style={{ color: 'var(--text-primary)' }}>Let's build something.</h2>
        <div className="space-y-2 mb-6">
          {links.map((l) => (
            <a key={l.label} href={l.url} target={l.url.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
              className="block px-4 py-2.5 rounded-xl border transition-colors"
              style={{ borderColor: 'var(--surface-3)', color: 'var(--text-primary)', background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}
              onClick={(e) => e.stopPropagation()}>
              <span className="font-sans text-[13px]">{l.label}</span>
            </a>
          ))}
        </div>
        <span className="font-mono text-[7px] uppercase tracking-wider block mb-2" style={{ color: 'var(--accent)', opacity: 0.4 }}>Resumes</span>
        <div className="flex gap-2 justify-center mb-8">
          {resumes.map((r) => (
            <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border font-mono text-[9px]"
              style={{ borderColor: 'var(--surface-3)', color: 'var(--text-muted)' }}
              onClick={(e) => e.stopPropagation()}>
              {r.label}
            </a>
          ))}
        </div>
        <p className="font-sans text-[12px] mb-3" style={{ color: 'var(--text-muted)' }}>
          A human who loves Product · Engineering · AI
        </p>
        <div className="flex justify-center">
          <Signature dark={dark} />
        </div>
      </div>
      <PageNum num={pageNum} total={total} />
      <Vignette />
    </div>
  );
}

/* ──────────────────────── main component ──────────────────────── */

function renderPage(page, idx, dark, total) {
  const pg = idx + 1;
  switch (page.type) {
    case 'cover': return <CoverPage dark={dark} />;
    case 'quote': return <QuotePage dark={dark} />;
    case 'toc': return <TocPage dark={dark} total={total} />;
    case 'chapter': return <ChapterPage num={page.num} title={page.title} tagline={page.tagline} dark={dark} />;
    case 'about': return <AboutPage dark={dark} total={total} pageNum={pg} />;
    case 'stats': return <StatsPage dark={dark} total={total} pageNum={pg} />;
    case 'photo': return <PhotoPage src={page.src} caption={page.caption} dark={dark} />;
    case 'project': return <ProjectPage name={page.name} tagline={page.tagline} impact={page.impact} learning={page.learning} stack={page.stack} dark={dark} total={total} pageNum={pg} />;
    case 'timeline': return <TimelinePage label={page.label} items={page.items} dark={dark} total={total} pageNum={pg} />;
    case 'speaking': return <SpeakingPage dark={dark} total={total} pageNum={pg} />;
    case 'writing': return <WritingPage dark={dark} total={total} pageNum={pg} />;
    case 'connect': return <ConnectPage dark={dark} total={total} pageNum={pg} />;
    default: return null;
  }
}

export default function BookView({ onClose }) {
  const { theme } = useTheme();
  const { play } = useSound();
  const dark = theme === 'dark';
  const flipBook = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => {
      setDims({ w: window.innerWidth, h: window.innerHeight });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const onFlip = useCallback((e) => {
    setCurrentPage(e.data);
    play('pageTurn');
  }, [play]);

  const total = bookPages.length;

  if (!dims.w) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[80]"
      style={{ background: dark ? '#0a0a0b' : '#e5e0d3' }}
    >
      {/* Flip book */}
      <div className="w-full h-full">
        <HTMLFlipBook
          ref={flipBook}
          width={dims.w}
          height={dims.h}
          size="stretch"
          minWidth={dims.w}
          maxWidth={dims.w}
          minHeight={dims.h}
          maxHeight={dims.h}
          showCover={true}
          mobileScrollSupport={false}
          onFlip={onFlip}
          flippingTime={600}
          usePortrait={true}
          maxShadowOpacity={0.4}
          drawShadow={true}
          autoSize={false}
          className="book-flip"
          style={{ overflow: 'hidden' }}
          startPage={0}
          clickEventForward={true}
          swipeDistance={30}
          useMouseEvents={true}
          showPageCorners={true}
        >
          {bookPages.map((page, i) => (
            <Page key={page.id}>
              {renderPage(page, i, dark, total)}
            </Page>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Overlay controls */}
      <div className="fixed top-0 left-0 right-0 z-[82] flex items-center justify-between px-5 pt-4 pointer-events-none">
        <span className="font-mono text-[9px] tracking-wider pointer-events-none" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
          {currentPage + 1} / {total}
        </span>
        <button
          onClick={onClose}
          className="pointer-events-auto w-8 h-8 flex items-center justify-center rounded-full border backdrop-blur-sm"
          style={{ borderColor: 'var(--surface-4)', background: dark ? 'rgba(19,19,21,0.8)' : 'rgba(245,242,232,0.8)', color: 'var(--text-secondary)' }}
        >
          ×
        </button>
      </div>

      {/* Page dots at bottom */}
      <div className="fixed bottom-4 left-0 right-0 z-[82] flex items-center justify-center gap-1 pointer-events-none">
        {bookPages.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === currentPage ? 16 : 4,
              height: 4,
              background: i === currentPage ? 'var(--accent)' : 'var(--surface-4)',
              opacity: i === currentPage ? 0.7 : 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
