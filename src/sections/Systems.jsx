import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';
import ParallaxCard from '../components/ParallaxCard';
import { EvidenceTag } from '../components/EvidenceDrawer';
import { Sparkline } from '../components/Illustrations';
import { Footnote, MarginNote } from '../components/FootnoteSystem';
import { footnotes, marginNotes } from '../data/marginNotes';
import { useTheme } from '../hooks/useTheme';

const systems = [
  {
    id: 'ai-adoption',
    name: 'AI Adoption at Shaadi',
    tagline: 'Made a 200K-DAU org AI-native',
    problem: 'A 200K-DAU engineering org had no structured way of using AI. Velocity and quality were quietly leaking.',
    solution: 'I built the adoption framework, ran the internal presentations, and drove Cursor + Claude rollout org-wide — a ₹1 crore annual commitment.',
    impact: 'Velocity +15% · A/B cleanup −80% · crash rate −20%. Called "Pioneer of AI" by the Product Director.',
    learning: 'Adoption is a product problem. You ship a workflow people want, not a tool you mandate.',
    scale: 'Org-wide',
    spark: [4, 6, 5, 9, 12, 15, 18],
    sparkLabel: '+15% velocity',
    stack: ['AI Strategy', 'Cursor', 'Claude', 'Change Mgmt'],
    image: 'https://img.youtube.com/vi/9iy6XTGBMU0/hqdefault.jpg',
    links: [{ label: 'Watch the rollout ↗', href: 'https://youtu.be/9iy6XTGBMU0' }, { label: 'The talk ↗', href: 'https://youtu.be/tNQ7jIXdJkU' }],
    gradient: 'from-amber-500/5 to-orange-500/5',
  },
  {
    id: 'nuvi',
    name: 'Nuvi',
    tagline: "A company's brain, secured by role",
    problem: 'Sales, ops and product teams burn hours searching across 30 tools to answer a single question.',
    solution: 'A role-aware company knowledge brain — searchable, secured by permission. My own product, in active build.',
    impact: 'Founding idea → product. Building it now.',
    learning: 'The best 0→1 problems are the ones you feel personally, every day.',
    scale: '0→1 · building now',
    stack: ['AI', 'RAG', 'Product', 'Permissions'],
    links: [{ label: 'meetnuvi.com ↗', href: 'https://meetnuvi.com' }],
    image: '/candid/nuvi.png',
    imageFit: 'contain',
    gradient: 'from-violet-500/5 to-blue-500/5',
  },
  {
    id: 'ai-pipelines',
    name: 'Autonomous AI Pipelines',
    tagline: 'GTM-grade automation, in production',
    problem: 'Manual account & market research kills SDR productivity — hours per account, every day.',
    solution: 'Multi-agent n8n pipelines that plan searches, pull from multiple sources, validate findings, and output structured intelligence — no humans in the loop. Published on n8n\'s open-source page.',
    impact: 'What took an SDR 2 hours runs in minutes. Same signal-to-action logic behind Clay, Apollo & Instantly.',
    learning: 'Enrichment is just signal-to-action at scale — the model is the easy part, the pipeline is the product.',
    scale: 'In production',
    stack: ['n8n', 'OpenRouter', 'Claude', 'Gemini', 'Serper', 'Jina'],
    image: 'https://img.youtube.com/vi/zFY2_cZYkWY/hqdefault.jpg',
    links: [
      { label: 'Demo ↗', href: 'https://youtu.be/zFY2_cZYkWY' },
      { label: 'Research agent ↗', href: 'https://n8n.io/workflows/12504-research-topics-using-openrouter-ai-agents-with-serper-search-and-jina-ai-reports' },
      { label: 'Legal agent ↗', href: 'https://n8n.io/workflows/12508-research-us-legal-regulations-with-courtlistener-legiscan-openrouter-and-web-search' },
    ],
    gradient: 'from-emerald-500/5 to-cyan-500/5',
  },
  {
    id: 'dark-pattern',
    name: 'Dark Pattern Detection',
    tagline: 'Where design leaks revenue',
    problem: 'Conversion leaks are invisible until they cost revenue.',
    solution: 'An AI tool that audits product flows to find where design manipulates instead of converts — across product, legal and design surfaces at once.',
    impact: 'Top 5 — Emergent AI Hackathon.',
    learning: 'Revenue and ethics aren\'t opposites. Bad UX is just slow churn you can\'t see yet.',
    scale: 'Top 5',
    stack: ['AI', 'Product Audit', 'UX'],
    image: 'https://img.youtube.com/vi/lOawPY1Tltk/hqdefault.jpg',
    links: [{ label: 'Watch ↗', href: 'https://youtu.be/lOawPY1Tltk' }],
    gradient: 'from-rose-500/5 to-amber-500/5',
  },
  {
    id: 'tripify',
    name: 'Tripify',
    tagline: 'AI travel — product-led to acquisition',
    problem: 'Trip planning is broken across too many tabs and tools.',
    solution: 'An AI travel manager — grown to 600+ organic users with zero paid acquisition.',
    impact: 'Soft-acquired by My Irish Cousin. Pure product-led growth — I never pitched anyone.',
    learning: 'Distribution is a product feature, not a marketing afterthought.',
    scale: '600+ users · acquired',
    spark: [1, 2, 4, 6, 9, 14, 20],
    sparkLabel: '600+ organic',
    stack: ['Kotlin', 'Swift', 'AI', 'Maps'],
    image: '/candid/tripify.png',
    links: [{ label: 'GitHub ↗', href: 'https://github.com/thekaailashsharma/AI-Travel-Manager' }],
    evidence: 'tripify',
    gradient: 'from-blue-500/5 to-purple-500/5',
  },
  {
    id: 'ai-keyboard',
    name: 'Evolve with AI',
    tagline: 'On-device AI keyboard',
    problem: 'AI on mobile was cloud-dependent and slow.',
    solution: 'On-device AI inference inside an Android keyboard — before the category existed.',
    impact: 'Won Mumbai Hacks (500+ participants). #AndroidSpotlight by Google.',
    learning: 'The best AI interfaces disappear into the tools people already use.',
    scale: 'Hackathon winner',
    stack: ['Kotlin', 'Jetpack Compose', 'On-device AI'],
    image: '/evidence/android-spotlight.png',
    links: [{ label: 'GitHub ↗', href: 'https://github.com/thekaailashsharma/Evolve-with-AI' }],
    evidence: 'evolve-ai',
    footnoteKey: 'google-feature',
    gradient: 'from-amber-500/5 to-orange-500/5',
  },
  {
    id: 'twinmind',
    name: 'TwinMind (Android)',
    tagline: 'Real-time transcription',
    problem: 'Spoken thoughts and meeting context disappear the moment they\'re said.',
    solution: 'Native Android app transcribing audio in 10-second chunks with Gemini 2.5 Flash — structured summaries, Firebase sync.',
    impact: 'A take-home task, shipped to production quality.',
    learning: 'Hard constraints (10-second chunks) force better architecture.',
    scale: 'Take-home',
    stack: ['Android', 'Gemini 2.5 Flash', 'Firebase'],
    image: 'https://img.youtube.com/vi/IqDx3VpKhBA/hqdefault.jpg',
    links: [{ label: 'Demo ↗', href: 'https://youtu.be/IqDx3VpKhBA' }, { label: 'GitHub ↗', href: 'https://github.com/thekaailashsharma/TwinMind-TakeHome' }],
    gradient: 'from-cyan-500/5 to-blue-500/5',
  },
  {
    id: 'shorts',
    name: 'YouTube Shorts Clone',
    tagline: 'Studying retention at a systems level',
    problem: 'I wanted to understand scroll retention and feed engagement deeply — not theoretically.',
    solution: 'Rebuilt YouTube Shorts from scratch to learn the engagement loop from the inside.',
    impact: 'Featured by Google Android Developers (official LinkedIn).',
    learning: 'You understand a system best by rebuilding it.',
    scale: 'Google-featured',
    stack: ['Android', 'Jetpack Compose'],
    image: '/evidence/google-play-academy.png',
    links: [{ label: 'GitHub ↗', href: 'https://github.com/thekaailashsharma/ShortsClone' }],
    gradient: 'from-rose-500/5 to-orange-500/5',
  },
  {
    id: 'waste2wealth',
    name: 'Waste2Wealth',
    tagline: 'Gamified civic action',
    problem: 'Urban waste management had no user-activation loop — awareness without action.',
    solution: 'A gamified system that rewards community participation: report, organize, earn.',
    impact: '1st place at Mumbai Hacks (500+). Top 100 globally — Google Solution Challenge.',
    learning: 'Behavior change needs incentive design, not awareness campaigns.',
    scale: 'Global Top 100',
    stack: ['Android', 'Firebase', 'GCP'],
    image: '/evidence/mumbai-hacks.png',
    links: [{ label: 'GitHub ↗', href: 'https://github.com/Waste2Wealth/Waste2Wealth-v2' }],
    evidence: 'waste2wealth',
    footnoteKey: 'mumbai-hacks',
    gradient: 'from-emerald-500/5 to-cyan-500/5',
  },
  {
    id: 'wowdrobe',
    name: 'Wowdrobe',
    tagline: 'Fashion search + thrift economy',
    problem: 'Finding clothes that match your body, style and values is broken across every platform.',
    solution: 'A fashion search engine for companies, plus a thrift marketplace that rewards sustainable choices.',
    impact: 'Top 100 globally (Google Solution Challenge). Finalist — Titan Design Impact Movement.',
    learning: 'Search is a product problem, not a technology problem.',
    scale: 'Global Top 100',
    stack: ['Android', 'iOS', 'Search', 'Recommendations'],
    image: '/candid/wowdrobe.png',
    evidence: 'wowdrobe',
    gradient: 'from-rose-500/5 to-amber-500/5',
  },
];

export default function Systems({ openEvidence }) {
  const [activeSystem, setActiveSystem] = useState(null);
  const { theme } = useTheme();

  const dotColor = theme === 'dark' ? 'rgba(200,168,124,0.5)' : 'rgba(139,111,71,0.3)';

  return (
    <section id="systems" className="relative px-6 sm:px-10 lg:px-20 py-28 sm:py-36">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, ${dotColor} 1px, transparent 0)`,
        backgroundSize: '40px 40px',
        opacity: 0.015,
      }} />

      <div className="relative max-w-6xl mx-auto">
        <SectionLabel label="Systems I Built" />

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_200px] gap-10">
          <div>
            <FadeIn>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl dark:text-zinc-100 text-stone-900 leading-tight mb-3 max-w-xl">
                Zero-to-one execution.
              </h2>
              <p className="font-sans text-[15px] lg:text-base dark:text-zinc-500 text-stone-400 mb-16 max-w-lg leading-relaxed">
                Not a project grid. Every system started with an unclear problem — and most ended up solving a <span className="text-accent">revenue</span> one.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {systems.map((system, i) => {
                const isActive = activeSystem === system.id;
                return (
                  <FadeIn key={system.id} delay={i * 0.06} y={16}>
                    <ParallaxCard className="h-full" depth={isActive ? 0 : 9} glare>
                      <motion.div
                        onClick={() => setActiveSystem(isActive ? null : system.id)}
                        whileTap={{ scale: 0.985 }}
                        className={`group cursor-pointer rounded-xl border overflow-hidden transition-all duration-500 h-full bg-surface-1/50 backdrop-blur-md bg-gradient-to-br ${system.gradient} ${
                          isActive
                            ? 'border-accent/20 dark:shadow-2xl dark:shadow-black/30 shadow-lg shadow-stone-200/30'
                            : 'border-surface-3/50 hover:border-accent/30'
                        }`}
                        style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.4)' }}
                        layout
                      >
                        {system.image && (
                          <div className="relative w-full h-40 sm:h-44 overflow-hidden bg-surface-2/40">
                            <img
                              src={system.image}
                              alt={system.name}
                              loading="lazy"
                              className={`w-full h-full media-duotone transition-transform duration-700 group-hover:scale-105 ${system.imageFit === 'contain' ? 'object-contain p-3' : 'object-cover'}`}
                              style={{ objectPosition: system.imageFit === 'contain' ? 'center' : 'top center' }}
                              onError={(e) => { e.currentTarget.style.opacity = '0.2'; }}
                            />
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(245,241,230,0) 45%, var(--surface-1) 98%)' }} />
                            {system.image.includes('youtube') && (
                              <>
                                <span className="absolute top-2.5 left-2.5 font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1" style={{ background: 'rgba(14,124,123,.9)', color: '#fff' }}>▶ Demo</span>
                                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <span className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110" style={{ width: 46, height: 46, background: 'rgba(14,124,123,.85)', boxShadow: '0 8px 24px -6px rgba(14,124,123,.6)', border: '1px solid rgba(255,255,255,.45)' }}>
                                    <span style={{ color: '#fff', fontSize: 14, paddingLeft: 3 }}>▶</span>
                                  </span>
                                </span>
                              </>
                            )}
                          </div>
                        )}
                        <div className="p-6 sm:p-7">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className={`font-serif text-xl sm:text-2xl lg:text-[26px] transition-colors duration-300 ${isActive ? 'dark:text-zinc-100 text-stone-900' : 'dark:text-zinc-200 text-stone-700'}`}>
                                {system.name}
                              </h3>
                              <p className="font-mono text-[10px] lg:text-xs uppercase tracking-wider text-accent/40 mt-1">
                                {system.tagline}
                              </p>
                              {system.spark && (
                                <div className="mt-2 flex items-center gap-2">
                                  <Sparkline points={system.spark} />
                                  <span className="font-mono text-[9px] text-accent/50">{system.sparkLabel}</span>
                                </div>
                              )}
                            </div>
                            <span className={`font-mono text-[9px] px-2.5 py-1 rounded-full border transition-all duration-300 shrink-0 ${
                              isActive
                                ? 'bg-accent/10 border-accent/25 text-accent/80'
                                : 'bg-surface-2/50 border-surface-4/50 dark:text-zinc-600 text-stone-400'
                            }`}>
                              {system.scale}
                            </span>
                          </div>

                          <div className="mb-3">
                            <span className="font-mono text-[9px] lg:text-[11px] uppercase tracking-[0.2em] dark:text-zinc-600 text-stone-400 block mb-1.5">
                              Problem
                            </span>
                            <p className="font-sans text-[13px] lg:text-[15px] dark:text-zinc-500 text-stone-400 leading-relaxed">
                              {system.problem}
                            </p>
                          </div>

                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                className="overflow-hidden"
                              >
                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.4 }} className="mb-4">
                                  <span className="font-mono text-[9px] lg:text-[11px] uppercase tracking-[0.2em] text-accent/40 block mb-1.5">What I did</span>
                                  <p className="font-sans text-[13px] lg:text-[15px] dark:text-zinc-400 text-stone-500 leading-relaxed">{system.solution}</p>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.4 }} className="mb-4">
                                  <span className="font-mono text-[9px] lg:text-[11px] uppercase tracking-[0.2em] dark:text-emerald-400/40 text-emerald-600/50 block mb-1.5">Impact</span>
                                  <p className="font-sans text-[13px] lg:text-[15px] dark:text-emerald-300/70 text-emerald-700/70 leading-relaxed">
                                    {system.impact}
                                    {system.footnoteKey && footnotes[system.footnoteKey] && (
                                      <Footnote number={footnotes[system.footnoteKey].number} text={footnotes[system.footnoteKey].text} />
                                    )}
                                  </p>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="mb-5 p-3.5 rounded-lg bg-surface-3/30 border-l-2 border-accent/15">
                                  <span className="font-mono text-[9px] lg:text-[11px] uppercase tracking-[0.2em] text-accent/35 block mb-1.5">Key Learning</span>
                                  <p className="font-sans text-[13px] lg:text-[15px] dark:text-zinc-400 text-stone-500 leading-relaxed italic">{system.learning}</p>
                                </motion.div>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex flex-col gap-3">
                                  <div className="flex flex-wrap gap-1.5">
                                    {system.stack.map((tech) => (
                                      <span key={tech} className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-surface-3/50 dark:text-zinc-500 text-stone-400 tracking-wider">{tech}</span>
                                    ))}
                                  </div>
                                  <div className="flex items-center gap-3 flex-wrap">
                                    {system.links && system.links.map((l) => (
                                      <a
                                        key={l.label}
                                        href={l.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="font-mono text-[11px] text-accent hover:text-accent-bright underline underline-offset-2 decoration-accent/30 hover:decoration-accent/60 transition-colors"
                                      >
                                        {l.label}
                                      </a>
                                    ))}
                                    {system.evidence && (
                                      <EvidenceTag evidenceKey={system.evidence} onOpen={openEvidence} />
                                    )}
                                  </div>
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {!isActive && (
                            <p className="font-mono text-[10px] dark:text-zinc-700 text-stone-300 mt-3 dark:group-hover:text-zinc-500 group-hover:text-stone-500 transition-colors duration-300">
                              Click to explore &rarr;
                            </p>
                          )}
                        </div>
                      </motion.div>
                    </ParallaxCard>
                  </FadeIn>
                );
              })}
            </div>
          </div>

          {/* Margin notes */}
          <div className="hidden xl:flex flex-col gap-20 pt-32">
            {marginNotes.systems.map((note) => (
              <MarginNote key={note.id}>{note.text}</MarginNote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
