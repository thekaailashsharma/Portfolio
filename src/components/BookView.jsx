import { forwardRef, useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';
import { useTheme } from '../hooks/useTheme';
import { useSound } from './SoundManager';

const bookPages = [
  { id: 'cover', type: 'cover' },
  { id: 'whyme', type: 'whyme' },
  { id: 'toc', type: 'toc' },
  { id: 'ch1', type: 'chapter', num: 'I', title: 'The Builder', tagline: 'Identity, philosophy, and the numbers behind it' },
  { id: 'about', type: 'about' },
  { id: 'stats', type: 'stats' },
  { id: 'photo-candid2', type: 'photo', src: '/candid/candid2.jpeg', caption: 'Building at 2 AM — hackathon mode' },
  { id: 'ch2', type: 'chapter', num: 'II', title: 'The Work', tagline: 'Zero-to-one systems that shipped' },
  { id: 'casestudy', type: 'casestudy' },
  { id: 'proj-tripify', type: 'project', name: 'Tripify', tagline: 'AI-Powered Travel Manager', impact: '600+ downloads · Native Android & iOS', learning: 'The hardest UX problem is making complex data feel simple.', stack: ['Kotlin', 'Swift', 'Maps', 'AI'], img: '/candid/tripify.png' },
  { id: 'proj-w2w', type: 'project', name: 'Waste2Wealth', tagline: 'Making Cities Sustainable', impact: '1st at National Hackathon (500+) · Global Top 100', learning: 'Behavior change needs incentive design, not just awareness.', stack: ['Android', 'Firebase', 'GCP'] },
  { id: 'photo-mumbai', type: 'photo', src: '/evidence/mumbai-hacks.png', caption: '1st Place — National AI Hackathon, 500+ participants' },
  { id: 'proj-wow', type: 'project', name: 'Wowdrobe', tagline: 'Fashion Search + Thrift Economy', impact: 'Global Top 100 · Titan Finalist', learning: 'Search is a product problem. What users search for reveals what they want.', stack: ['Android', 'iOS', 'Search', 'ML'], img: '/candid/wowdrobe.png' },
  { id: 'proj-evolve', type: 'project', name: 'Evolve with AI', tagline: 'AI Keyboard for Android', impact: 'Featured by Google Play Academy · #AndroidSpotlight', learning: 'The best AI interfaces disappear into existing workflows.', stack: ['Kotlin', 'Compose', 'AI/ML'] },
  { id: 'photo-g20', type: 'photo', src: '/evidence/g20-hackathon.png', caption: 'Top 5 — G20 Hackathon, ISB Hyderabad' },
  { id: 'ch3', type: 'chapter', num: 'III', title: 'The Journey', tagline: 'Every role taught something the last one couldn\'t' },
  { id: 'timeline-recent', type: 'timeline', label: 'Recent', items: [
    { year: '2025', role: 'SDE I', place: 'India\'s largest matrimony platform', note: 'Promoted <12mo. 200K+ DAU.' },
    { year: '2025', role: 'AI Architect & Community', place: 'Open-source AI org', note: '370+ global contributors.' },
    { year: '2024', role: 'SDE Intern', place: 'Consumer trust platform', note: 'Real-time communication systems.' },
    { year: '2024', role: 'Product + Dev', place: 'B2B AI SaaS', note: '15+ FCM flows, 200+ users.' },
    { year: '2024', role: 'Product Manager', place: 'International travel product', note: '30+ locations, cross-border ops.' },
  ]},
  { id: 'timeline-early', type: 'timeline', label: 'Foundations', items: [
    { year: '2023', role: 'Android Dev', place: 'Fintech · App of Year 2024', note: 'Google Play Best Everyday Essential.' },
    { year: '2023', role: 'Android Dev', place: 'Healthcare startup', note: 'Early Compose migration.' },
    { year: '2023', role: 'Content Creator', place: 'EdTech platform', note: 'Technical writing.' },
    { year: '2023-24', role: 'Hackathons', place: '2× Google Top 100 / 4000+', note: '1st at national, G20 Top 5' },
  ]},
  { id: 'photo-shaadi', type: 'photo', src: '/candid/shaadi.JPG', caption: 'The desk where it happens — building at work' },
  { id: 'ch4', type: 'chapter', num: 'IV', title: 'The Voice', tagline: 'Speaking, writing, and thinking out loud' },
  { id: 'speaking', type: 'speaking' },
  { id: 'photo-candid3', type: 'photo', src: '/candid/candid3.jpg', caption: 'Live-coding for 100+ developers' },
  { id: 'writing', type: 'writing' },
  { id: 'howithink', type: 'howithink' },
  { id: 'connect', type: 'connect' },
  { id: 'thankyou', type: 'thankyou' },
];

const Page = forwardRef(function Page({ children }, ref) {
  return (
    <div ref={ref} className="h-full w-full overflow-hidden" style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
});

function PaperBg({ dark }) {
  return (
    <div className="absolute inset-0" style={{
      background: dark ? '#131315' : '#f5f2e8',
      backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, ${dark ? 'rgba(200,168,124,0.04)' : 'rgba(139,111,71,0.06)'} 32px)`,
      backgroundPosition: '0 48px',
    }} />
  );
}

function V() {
  return <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.08) 100%)' }} />;
}

function Pg({ num, total }) {
  return <span className="absolute bottom-5 right-6 font-mono text-[10px]" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>{num} / {total}</span>;
}

function Sig({ dark, className = 'h-16' }) {
  return (
    <img src="/sign.png" alt="Signature" className={`${className} w-auto`}
      style={{ filter: dark ? 'invert(1) brightness(1.2)' : 'grayscale(1) contrast(1.5) brightness(0.3)', opacity: 0.7 }} />
  );
}

function CoverPage({ dark, onAIToggle }) {
  return (
    <div className="relative h-full flex flex-col items-center justify-center text-center px-10"
      style={{ background: dark ? 'linear-gradient(160deg,#1a1815,#0f0e0c)' : 'linear-gradient(160deg,#ebe6d8,#f5f2e8)' }}>
      <div className="absolute top-6 left-6 right-6 bottom-6 border rounded-lg" style={{ borderColor: 'var(--accent)', opacity: 0.12 }} />
      <div className="relative flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 mb-6" style={{ borderColor: 'var(--accent)', opacity: 0.8 }}>
          <img src="/evidence/devfest-bhopal.png" alt="Kailash" className="w-full h-full object-cover object-top" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.5em] mb-3" style={{ color: 'var(--accent)', opacity: 0.4 }}>Portfolio</span>
        <h1 className="font-serif text-[36px] leading-tight mb-1" style={{ color: 'var(--text-primary)' }}>Kailash</h1>
        <h1 className="font-serif italic text-[36px] leading-tight mb-6" style={{ color: 'var(--accent)' }}>Sharma</h1>
        <div className="border-l-2 pl-5 mb-6 max-w-[85%] text-left" style={{ borderColor: 'var(--accent)', opacity: 0.7 }}>
          <p className="font-serif italic text-[15px] leading-[1.6]" style={{ color: 'var(--text-primary)' }}>
            &ldquo;Innovation is outcome of a habit, not a random act.&rdquo;
          </p>
        </div>
        <Sig dark={dark} className="h-14 mb-5" />
        <span className="font-mono text-[10px] tracking-wider" style={{ color: 'var(--text-muted)' }}>Mumbai, India &middot; 2025</span>
      </div>
      {onAIToggle && (
        <button onClick={(e) => { e.stopPropagation(); onAIToggle(); }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 rounded-full border text-[10px] font-mono"
          style={{ borderColor: 'var(--accent)', color: 'var(--accent)', opacity: 0.5, background: dark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)' }}>
          <span className="font-bold">✦</span> Ask AI
        </button>
      )}
      <V />
    </div>
  );
}

function WhyMePage({ dark, total }) {
  return (
    <div className="relative h-full px-8 flex flex-col justify-center" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] block mb-6" style={{ color: 'var(--accent)', opacity: 0.4 }}>At a Glance</span>
        <p className="font-serif italic text-[22px] leading-[1.4] mb-8" style={{ color: 'var(--text-primary)' }}>
          This story reads better as a book.
        </p>
        <div className="space-y-5">
          {[
            { num: '01', text: 'I build 0→1 products where the problem isn\'t fully defined yet.' },
            { num: '02', text: 'I\'ve shipped to 200K+ daily users, won national hackathons, and spoken at 10+ conferences.' },
            { num: '03', text: 'Looking for: consumer products, AI systems, or platform teams where both product thinking and engineering depth matter.' },
          ].map((b) => (
            <div key={b.num} className="flex gap-3">
              <span className="font-mono text-[12px] shrink-0 mt-0.5" style={{ color: 'var(--accent)', opacity: 0.4 }}>{b.num}</span>
              <p className="font-sans text-[15px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
      <Pg num={2} total={total} />
      <V />
    </div>
  );
}

function TocPage({ dark, total }) {
  const chapters = [
    { num: 'I', title: 'The Builder', page: 4 },
    { num: 'II', title: 'The Work', page: 8 },
    { num: 'III', title: 'The Journey', page: 16 },
    { num: 'IV', title: 'The Voice', page: 20 },
  ];
  return (
    <div className="relative h-full px-8 flex flex-col justify-center" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <span className="font-mono text-[9px] uppercase tracking-[0.4em] block mb-10" style={{ color: 'var(--accent)', opacity: 0.4 }}>Contents</span>
      <div className="space-y-6">
        {chapters.map((ch) => (
          <div key={ch.num} className="flex items-baseline gap-3">
            <span className="font-serif text-[16px] shrink-0" style={{ color: 'var(--accent)', opacity: 0.5 }}>{ch.num}</span>
            <span className="font-serif text-[20px]" style={{ color: 'var(--text-primary)' }}>{ch.title}</span>
            <span className="flex-1 border-b border-dotted mx-1" style={{ borderColor: 'var(--surface-4)', opacity: 0.4 }} />
            <span className="font-mono text-[12px]" style={{ color: 'var(--text-muted)' }}>{ch.page}</span>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <p className="font-mono text-[10px] italic" style={{ color: 'var(--text-muted)' }}>Swipe or use arrows to turn pages</p>
      </div>
      <Pg num={3} total={total} />
      <V />
    </div>
  );
}

function ChapterPage({ num, title, tagline, dark }) {
  return (
    <div className="relative h-full flex flex-col items-center justify-center text-center px-10"
      style={{ background: dark ? 'linear-gradient(145deg,#1a1714,#131315)' : 'linear-gradient(145deg,#ede8da,#f5f2e8)' }}>
      <span className="font-serif text-[80px] leading-none mb-4" style={{ color: 'var(--accent)', opacity: 0.12 }}>{num}</span>
      <h2 className="font-serif text-[32px] mb-3" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      <div className="w-10 h-px mb-4" style={{ background: 'var(--accent)', opacity: 0.3 }} />
      <p className="font-sans text-[14px] max-w-[75%] leading-relaxed" style={{ color: 'var(--text-muted)' }}>{tagline}</p>
      <V />
    </div>
  );
}

function AboutPage({ dark, total, pageNum }) {
  return (
    <div className="relative h-full px-8 flex flex-col justify-center" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] block mb-5" style={{ color: 'var(--accent)', opacity: 0.4 }}>About</span>
        <div className="flex gap-4 mb-5">
          <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border" style={{ borderColor: 'var(--surface-4)' }}>
            <img src="/candid/candid1.jpg" alt="Presenting" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-sans text-[15px] leading-[1.7] mb-1" style={{ color: 'var(--text-secondary)' }}>
              At India&rsquo;s largest matrimony platform (35M+ members), I own real-time communication for 200K daily users.
            </p>
            <p className="font-sans text-[13px] leading-[1.6]" style={{ color: 'var(--text-muted)' }}>
              AI architect for 370+ global contributors.
            </p>
          </div>
        </div>
        <p className="font-sans text-[15px] leading-[1.7] mb-5" style={{ color: 'var(--text-secondary)' }}>
          I&rsquo;m drawn to institution-building problems &mdash; where trust, clarity, and outcomes matter more than optics.
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {['Builder Mindset', 'Product Thinking', 'Comfort with Ambiguity', 'Engineering Depth'].map((t) => (
            <div key={t} className="flex items-center gap-2 p-3 rounded-xl border" style={{ borderColor: 'var(--surface-3)', background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)', opacity: 0.5 }} />
              <span className="font-mono text-[10px]" style={{ color: 'var(--text-muted)' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
      <Pg num={pageNum} total={total} />
      <V />
    </div>
  );
}

function StatsPage({ dark, total, pageNum }) {
  const stats = [
    { value: '200K+', label: 'Daily Active Users', sub: 'Consumer trust platform' },
    { value: '<12mo', label: 'Intern → Full-Time', sub: 'Fastest promotion track' },
    { value: '370+', label: 'Contributors', sub: 'Open-source AI community' },
    { value: '15+', label: 'Notification Flows', sub: 'Lifecycle pipelines, B2B SaaS' },
    { value: 'Top 100', label: 'Global Rank', sub: '/ 4000+ teams · 110+ countries' },
    { value: '2024', label: 'App of the Year', sub: 'Google Play Best Essential' },
  ];
  return (
    <div className="relative h-full px-8 flex flex-col justify-center" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] block mb-5" style={{ color: 'var(--accent)', opacity: 0.4 }}>Product Impact</span>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="p-3.5 rounded-xl border" style={{ borderColor: 'var(--surface-3)', background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
              <span className="font-serif text-[24px] block mb-1" style={{ color: 'var(--text-primary)' }}>{s.value}</span>
              <span className="font-mono text-[8px] uppercase tracking-wider block mb-1" style={{ color: 'var(--accent)', opacity: 0.5 }}>{s.label}</span>
              <span className="font-sans text-[10px]" style={{ color: 'var(--text-muted)' }}>{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
      <Pg num={pageNum} total={total} />
      <V />
    </div>
  );
}

function CaseStudyPage({ dark, total, pageNum }) {
  return (
    <div className="relative h-full px-8 flex flex-col justify-center" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] block mb-2" style={{ color: 'var(--accent)', opacity: 0.4 }}>Case Study</span>
        <h2 className="font-serif text-[24px] mb-1" style={{ color: 'var(--text-primary)' }}>Real-Time Communication</h2>
        <p className="font-mono text-[10px] uppercase tracking-wider mb-6" style={{ color: 'var(--accent)', opacity: 0.5 }}>India&rsquo;s Largest Matrimony Platform &middot; 200K DAU</p>
        {[
          { label: 'Problem', text: 'Chat reliability was inconsistent during peak hours. Users were dropping mid-conversation in a trust-critical product.' },
          { label: 'Approach', text: 'Rebuilt the real-time messaging layer. Focused on connection resilience and delivery guarantees.' },
          { label: 'Outcome', text: '99.2% uptime. Promoted intern → SDE I in under 12 months — fastest track in the org.' },
          { label: 'Learning', text: 'In trust products, reliability isn\'t a feature — it IS the product.' },
        ].map((item) => (
          <div key={item.label} className="mb-4">
            <span className="font-mono text-[9px] uppercase tracking-wider block mb-1" style={{ color: 'var(--accent)', opacity: 0.5 }}>{item.label}</span>
            <p className="font-sans text-[14px] leading-[1.6]" style={{ color: 'var(--text-secondary)' }}>{item.text}</p>
          </div>
        ))}
      </div>
      <Pg num={pageNum} total={total} />
      <V />
    </div>
  );
}

function PhotoPage({ src, caption, dark }) {
  return (
    <div className="relative h-full flex items-center justify-center" style={{ background: dark ? '#0a0a0b' : '#e5e0d3' }}>
      <img src={src} alt={caption} className="max-w-full max-h-full w-auto h-auto object-contain" loading="lazy" />
      <div className="absolute bottom-0 left-0 right-0 px-6 py-4" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
        <p className="font-mono text-[11px] text-white/70 tracking-wider">{caption}</p>
      </div>
    </div>
  );
}

function ProjectPage({ name, tagline, impact, learning, stack, img, dark, total, pageNum }) {
  return (
    <div className="relative h-full px-8 flex flex-col justify-center" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] block mb-4" style={{ color: 'var(--accent)', opacity: 0.4 }}>Product</span>
        {img && (
          <div className="w-full h-28 rounded-xl overflow-hidden mb-4 border" style={{ borderColor: 'var(--surface-3)' }}>
            <img src={img} alt={name} className="w-full h-full object-cover object-center" loading="lazy" />
          </div>
        )}
        <h2 className="font-serif text-[26px] mb-1" style={{ color: 'var(--text-primary)' }}>{name}</h2>
        <p className="font-mono text-[10px] uppercase tracking-wider mb-4" style={{ color: 'var(--accent)', opacity: 0.5 }}>{tagline}</p>
        <div className="mb-4 px-4 py-3 rounded-xl" style={{ background: dark ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.06)' }}>
          <span className="font-mono text-[8px] uppercase tracking-wider block mb-1" style={{ color: dark ? 'rgba(110,231,183,0.6)' : 'rgba(5,150,105,0.6)' }}>Impact</span>
          <p className="font-sans text-[13px]" style={{ color: dark ? 'rgba(110,231,183,0.8)' : 'rgba(5,150,105,0.8)' }}>{impact}</p>
        </div>
        <div className="p-3 rounded-xl border-l-2 mb-4" style={{ borderColor: 'var(--accent)', background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
          <p className="font-sans text-[13px] italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{learning}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {stack.map((t) => (
            <span key={t} className="font-mono text-[9px] px-2.5 py-1 rounded-lg border" style={{ borderColor: 'var(--surface-3)', color: 'var(--text-muted)' }}>{t}</span>
          ))}
        </div>
      </div>
      <Pg num={pageNum} total={total} />
      <V />
    </div>
  );
}

function TimelinePage({ label, items, dark, total, pageNum }) {
  return (
    <div className="relative h-full px-8 flex flex-col justify-center" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] block mb-5" style={{ color: 'var(--accent)', opacity: 0.4 }}>Journey &middot; {label}</span>
        <div className="space-y-2.5">
          {items.map((item, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl border" style={{ borderColor: 'var(--surface-3)', background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
              <span className="font-mono text-[11px] shrink-0 w-14 mt-0.5" style={{ color: 'var(--accent)', opacity: 0.6 }}>{item.year}</span>
              <div>
                <span className="font-sans text-[14px] block" style={{ color: 'var(--text-primary)' }}>{item.role}</span>
                <span className="font-mono text-[10px] block" style={{ color: 'var(--text-muted)' }}>{item.place}</span>
                <span className="font-sans text-[11px] italic" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>{item.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pg num={pageNum} total={total} />
      <V />
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
    { name: 'Huddle @ Work', type: 'Internal', img: '/evidence/huddle-shaadi.WEBP' },
  ];
  return (
    <div className="relative h-full px-8 flex flex-col justify-center" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] block mb-3" style={{ color: 'var(--accent)', opacity: 0.4 }}>Speaking</span>
        <p className="font-serif text-[22px] mb-5" style={{ color: 'var(--text-primary)' }}>10+ conferences.</p>
        <div className="space-y-2">
          {events.map((e) => (
            <div key={e.name} className="flex items-center gap-3 p-2 rounded-xl border" style={{ borderColor: 'var(--surface-3)', background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border" style={{ borderColor: 'var(--surface-4)' }}>
                <img src={e.img} alt={e.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-sans text-[13px] block truncate" style={{ color: 'var(--text-primary)' }}>{e.name}</span>
                <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{e.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pg num={pageNum} total={total} />
      <V />
    </div>
  );
}

function WritingPage({ dark, total, pageNum }) {
  const posts = [
    { title: 'Taste as a Service', preview: 'Product taste as pattern recognition', url: 'https://thekailashsharma.substack.com/p/taste-as-a-service' },
    { title: 'The AI Constitution Era', preview: 'AI governance is product design', url: 'https://thekailashsharma.substack.com/p/the-ai-constitution-era-has-started' },
    { title: 'Why Companies Still Hire Humans', preview: 'AI replaces tasks, not judgment', url: 'https://thekailashsharma.substack.com/p/why-companies-are-still-hiring-humans' },
  ];
  return (
    <div className="relative h-full px-8 flex flex-col justify-center" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] block mb-3" style={{ color: 'var(--accent)', opacity: 0.4 }}>Writing</span>
        <p className="font-mono text-[10px] mb-5" style={{ color: 'var(--text-muted)' }}>On Substack</p>
        <div className="space-y-3">
          {posts.map((p) => (
            <a key={p.title} href={p.url} target="_blank" rel="noopener noreferrer"
              className="block p-4 rounded-xl border" style={{ borderColor: 'var(--surface-3)', background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}
              onClick={(e) => e.stopPropagation()}>
              <h3 className="font-serif text-[16px] mb-1" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
              <p className="font-sans text-[12px] italic" style={{ color: 'var(--text-muted)' }}>{p.preview}</p>
            </a>
          ))}
        </div>
        <a href="https://thekailashsharma.substack.com/" target="_blank" rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px]"
          style={{ color: 'var(--accent)' }} onClick={(e) => e.stopPropagation()}>
          More on Substack ↗
        </a>
      </div>
      <Pg num={pageNum} total={total} />
      <V />
    </div>
  );
}

function HowIThinkPage({ dark, total, pageNum }) {
  return (
    <div className="relative h-full px-8 flex flex-col justify-center" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] block mb-3" style={{ color: 'var(--accent)', opacity: 0.4 }}>Framework</span>
        <h2 className="font-serif text-[24px] mb-6" style={{ color: 'var(--text-primary)' }}>How I approach problems</h2>
        {[
          { step: '01', title: 'Understand the constraint', desc: 'Not "What\'s the feature?" but "What\'s the real problem?"' },
          { step: '02', title: 'Build the smallest testable thing', desc: 'Prototypes over presentations. Ship something real to a real user.' },
          { step: '03', title: 'Measure what matters', desc: 'Not vanity metrics. Did the user\'s behavior change? Did trust increase?' },
        ].map((item) => (
          <div key={item.step} className="mb-5">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-mono text-[12px]" style={{ color: 'var(--accent)', opacity: 0.4 }}>{item.step}</span>
              <h3 className="font-sans text-[16px] font-medium" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
            </div>
            <p className="font-sans text-[13px] leading-[1.6] pl-7" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
          </div>
        ))}
      </div>
      <Pg num={pageNum} total={total} />
      <V />
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
    { label: 'For Innovators', url: 'https://drive.google.com/file/d/12GDzn9b11O6LAaxzgUBon7t6f-KelTLE/view?usp=sharing' },
    { label: 'For Generalists', url: 'https://drive.google.com/file/d/1kx_fpXjZhOBBNHZmW3nawCmdDOFxEqj0/view?usp=sharing' },
    { label: 'For Event Organizers', url: 'https://drive.google.com/file/d/169q0McYJEIDftS9-kXMRrdQbWMbfS3jZ/view?usp=sharing' },
  ];
  return (
    <div className="relative h-full px-8 flex flex-col items-center justify-center text-center" style={{ background: dark ? '#131315' : '#f5f2e8' }}>
      <PaperBg dark={dark} />
      <div className="relative w-full">
        <h2 className="font-serif text-[26px] mb-3" style={{ color: 'var(--text-primary)' }}>Currently exploring.</h2>
        <p className="font-sans text-[13px] mb-6 max-w-[85%] mx-auto" style={{ color: 'var(--text-muted)' }}>
          Consumer products, AI systems, or platform teams where both product thinking and engineering depth matter.
        </p>
        <div className="space-y-2 mb-5">
          {links.map((l) => (
            <a key={l.label} href={l.url} target={l.url.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
              className="block px-4 py-2.5 rounded-xl border"
              style={{ borderColor: 'var(--surface-3)', color: 'var(--text-primary)', background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}
              onClick={(e) => e.stopPropagation()}>
              <span className="font-sans text-[14px]">{l.label}</span>
            </a>
          ))}
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider block mb-2" style={{ color: 'var(--accent)', opacity: 0.4 }}>Proof of Work</span>
        <div className="flex flex-wrap gap-2 justify-center mb-5">
          {resumes.map((r) => (
            <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border font-mono text-[9px]"
              style={{ borderColor: 'var(--surface-3)', color: 'var(--text-muted)' }}
              onClick={(e) => e.stopPropagation()}>
              {r.label}
            </a>
          ))}
        </div>
        <a href="https://wa.me/+919326405547" target="_blank" rel="noopener noreferrer"
          className="font-sans text-[12px] inline-flex items-center gap-1.5" style={{ color: 'var(--accent)' }}
          onClick={(e) => e.stopPropagation()}>
          Fastest way to reach me? WhatsApp ↗
        </a>
      </div>
      <Pg num={pageNum} total={total} />
      <V />
    </div>
  );
}

function ThankYouPage({ dark }) {
  return (
    <div className="relative h-full flex flex-col items-center justify-center text-center px-10"
      style={{ background: dark ? 'linear-gradient(160deg,#1a1815,#0f0e0c)' : 'linear-gradient(160deg,#ebe6d8,#f5f2e8)' }}>
      <div className="absolute top-6 left-6 right-6 bottom-6 border rounded-lg" style={{ borderColor: 'var(--accent)', opacity: 0.08 }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
        <span className="font-mono text-[9px] uppercase tracking-[0.5em] block mb-8" style={{ color: 'var(--accent)', opacity: 0.3 }}>End</span>
        <h2 className="font-serif text-[32px] leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>Thank you</h2>
        <h2 className="font-serif italic text-[32px] leading-tight mb-6" style={{ color: 'var(--accent)', opacity: 0.7 }}>for reading.</h2>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>
        <div className="flex justify-center mb-6">
          <Sig dark={dark} className="h-16" />
        </div>
        <p className="font-sans text-[14px] mb-8" style={{ color: 'var(--text-muted)' }}>
          A human who loves Product &middot; Engineering &middot; AI
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.6 }}
        className="flex gap-3"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -6, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.3, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--accent)' }}
          />
        ))}
      </motion.div>
      <V />
    </div>
  );
}

function renderPage(page, idx, dark, total, onAIToggle) {
  const pg = idx + 1;
  switch (page.type) {
    case 'cover': return <CoverPage dark={dark} onAIToggle={onAIToggle} />;
    case 'whyme': return <WhyMePage dark={dark} total={total} />;
    case 'toc': return <TocPage dark={dark} total={total} />;
    case 'chapter': return <ChapterPage num={page.num} title={page.title} tagline={page.tagline} dark={dark} />;
    case 'about': return <AboutPage dark={dark} total={total} pageNum={pg} />;
    case 'stats': return <StatsPage dark={dark} total={total} pageNum={pg} />;
    case 'casestudy': return <CaseStudyPage dark={dark} total={total} pageNum={pg} />;
    case 'photo': return <PhotoPage src={page.src} caption={page.caption} dark={dark} />;
    case 'project': return <ProjectPage {...page} dark={dark} total={total} pageNum={pg} />;
    case 'timeline': return <TimelinePage label={page.label} items={page.items} dark={dark} total={total} pageNum={pg} />;
    case 'speaking': return <SpeakingPage dark={dark} total={total} pageNum={pg} />;
    case 'writing': return <WritingPage dark={dark} total={total} pageNum={pg} />;
    case 'howithink': return <HowIThinkPage dark={dark} total={total} pageNum={pg} />;
    case 'connect': return <ConnectPage dark={dark} total={total} pageNum={pg} />;
    case 'thankyou': return <ThankYouPage dark={dark} />;
    default: return null;
  }
}

export default function BookView({ onClose, onAIToggle }) {
  const { theme } = useTheme();
  const { play } = useSound();
  const dark = theme === 'dark';
  const flipBook = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [showNav, setShowNav] = useState(false);
  const [showPeek, setShowPeek] = useState(true);
  const touchRef = useRef({ startX: 0, startY: 0 });

  useEffect(() => {
    const update = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    if (!dims.w) return;
    const timer = setTimeout(() => setShowNav(true), 2000);
    return () => clearTimeout(timer);
  }, [dims.w]);

  useEffect(() => {
    const el = document.querySelector('.book-flip');
    if (!el) return;

    const onTouchStart = (e) => {
      touchRef.current.startX = e.touches[0].clientX;
      touchRef.current.startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - touchRef.current.startX;
      const dy = e.changedTouches[0].clientY - touchRef.current.startY;
      if (Math.abs(dx) < 30 || Math.abs(dy) > Math.abs(dx)) return;
      const fb = flipBook.current?.pageFlip();
      if (!fb) return;
      if (dx < -30) fb.flipNext();
      else if (dx > 30) fb.flipPrev();
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [dims.w]);

  const onFlip = useCallback((e) => {
    setCurrentPage(e.data);
    setShowNav(true);
    setShowPeek(false);
    play('pageTurn');
  }, [play]);

  const goNext = useCallback(() => flipBook.current?.pageFlip()?.flipNext(), []);
  const goPrev = useCallback(() => flipBook.current?.pageFlip()?.flipPrev(), []);

  const total = bookPages.length;
  if (!dims.w) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[80]" style={{ background: dark ? '#0a0a0b' : '#e5e0d3' }}>
      <div className="w-full h-full">
        <HTMLFlipBook
          ref={flipBook} width={dims.w} height={dims.h} size="stretch"
          minWidth={dims.w} maxWidth={dims.w} minHeight={dims.h} maxHeight={dims.h}
          showCover={false} mobileScrollSupport={false} onFlip={onFlip}
          flippingTime={450} usePortrait={true} maxShadowOpacity={0.4}
          drawShadow={true} autoSize={false} className="book-flip"
          style={{ overflow: 'hidden' }} startPage={0} clickEventForward={true}
          swipeDistance={1} useMouseEvents={true} showPageCorners={true}
        >
          {bookPages.map((page, i) => (
            <Page key={page.id}>{renderPage(page, i, dark, total, onAIToggle)}</Page>
          ))}
        </HTMLFlipBook>
      </div>

      <AnimatePresence>
        {showPeek && currentPage === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ delay: 1, duration: 0.5 }} className="fixed bottom-20 right-0 z-[84] pointer-events-none">
            <motion.div
              animate={{ rotateZ: [0, -15, -15, 0], x: [0, -8, -8, 0], y: [0, -8, -8, 0] }}
              transition={{ duration: 2.5, delay: 1.5, ease: 'easeInOut' }}
              className="w-16 h-16"
              style={{
                background: dark ? 'linear-gradient(135deg, rgba(30,28,25,0.95), rgba(19,19,21,0.8))' : 'linear-gradient(135deg, rgba(235,230,216,0.95), rgba(245,242,232,0.8))',
                borderLeft: '1px solid var(--surface-4)', borderTop: '1px solid var(--surface-4)',
                borderTopLeftRadius: '4px', boxShadow: '-4px -4px 12px rgba(0,0,0,0.15)', transformOrigin: 'bottom right',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPeek && currentPage === 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 2, duration: 0.5 }} className="fixed bottom-40 left-1/2 -translate-x-1/2 z-[84] pointer-events-none">
            <div className="px-4 py-2 rounded-full backdrop-blur-sm border" style={{
              background: dark ? 'rgba(19,19,21,0.8)' : 'rgba(245,242,232,0.9)', borderColor: 'var(--surface-4)',
            }}>
              <p className="font-mono text-[10px] whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>Swipe to turn pages →</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-0 left-0 right-0 z-[82] flex items-center justify-between px-5 pt-4 pointer-events-none">
        <span className="font-mono text-[10px] tracking-wider" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
          {currentPage + 1} / {total}
        </span>
        <button onClick={onClose}
          className="pointer-events-auto w-8 h-8 flex items-center justify-center rounded-full border backdrop-blur-sm"
          style={{ borderColor: 'var(--surface-4)', background: dark ? 'rgba(19,19,21,0.8)' : 'rgba(245,242,232,0.8)', color: 'var(--text-secondary)' }}>
          ×
        </button>
      </div>

      <AnimatePresence>
        {showNav && (
          <>
            {currentPage > 0 && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={goPrev}
                className="fixed left-3 top-1/2 -translate-y-1/2 z-[83] w-9 h-9 flex items-center justify-center rounded-full border backdrop-blur-sm"
                style={{ borderColor: 'var(--surface-4)', background: dark ? 'rgba(19,19,21,0.6)' : 'rgba(245,242,232,0.6)', color: 'var(--text-secondary)' }}>
                <span className="text-lg leading-none">‹</span>
              </motion.button>
            )}
            {currentPage < total - 1 && (
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={goNext}
                className="fixed right-3 top-1/2 -translate-y-1/2 z-[83] w-9 h-9 flex items-center justify-center rounded-full border backdrop-blur-sm"
                style={{ borderColor: 'var(--surface-4)', background: dark ? 'rgba(19,19,21,0.6)' : 'rgba(245,242,232,0.6)', color: 'var(--text-secondary)' }}>
                <span className="text-lg leading-none">›</span>
              </motion.button>
            )}
          </>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 left-0 right-0 z-[82] flex items-center justify-center gap-1 pointer-events-none">
        {bookPages.map((_, i) => (
          <div key={i} className="rounded-full transition-all duration-300" style={{
            width: i === currentPage ? 16 : 4, height: 4,
            background: i === currentPage ? 'var(--accent)' : 'var(--surface-4)',
            opacity: i === currentPage ? 0.7 : 0.3,
          }} />
        ))}
      </div>
    </motion.div>
  );
}
