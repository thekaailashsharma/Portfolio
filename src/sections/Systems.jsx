import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';
import ParallaxCard from '../components/ParallaxCard';
import { EvidenceTag } from '../components/EvidenceDrawer';
import { Footnote, MarginNote } from '../components/FootnoteSystem';
import { footnotes, marginNotes } from '../data/marginNotes';
import { useTheme } from '../hooks/useTheme';

const systems = [
  {
    id: 'tripify',
    name: 'Tripify',
    tagline: 'AI-Powered Travel Manager',
    problem: 'Travel planning is fragmented. Users bounce between maps, reviews, and booking sites without a unified experience.',
    solution: 'AI-powered travel manager integrating Google Maps Platform and Mapbox. Users explore hidden gems, plan trips, discover events, and share stories — all in one native experience.',
    impact: '600+ downloads. Native Android & iOS. Built and shipped in under a month.',
    learning: 'Integrating multiple map SDKs taught me that the hardest UX problem is making complex data feel simple.',
    scale: '600+ users',
    stack: ['Kotlin', 'Swift', 'Google Maps', 'Mapbox', 'AI'],
    evidence: 'tripify',
    gradient: 'from-blue-500/5 to-purple-500/5',
  },
  {
    id: 'waste2wealth',
    name: 'Waste2Wealth',
    tagline: 'Making Cities Sustainable, Rewarding, and Fun',
    problem: 'Waste management is invisible. Citizens have no incentive to participate, and communities lack tools to coordinate.',
    solution: 'A gamified community cleanup app. Report waste, organize cleanups, earn rewards. Turned environmental action into something people actually do repeatedly.',
    impact: 'Top 100 globally in Google Solution Challenge. 1st place at Mumbai Hacks (500+ participants).',
    learning: 'Behavior change needs incentive design, not just awareness campaigns.',
    scale: 'Global Top 100',
    stack: ['Android', 'Firebase', 'GCP', 'Jetpack Compose'],
    evidence: 'waste2wealth',
    footnoteKey: 'mumbai-hacks',
    gradient: 'from-emerald-500/5 to-cyan-500/5',
  },
  {
    id: 'wowdrobe',
    name: 'Wowdrobe',
    tagline: 'Fashion Search Engine + Thrift Economy',
    problem: 'Finding clothes that match your body type, style preferences, and sustainability values is broken across existing platforms.',
    solution: 'A search engine for fashion companies to find well-matched clothing. Plus a thrifting marketplace that rewards sustainable fashion choices.',
    impact: 'Top 100 globally in Google Solution Challenge. Finalist at Design Impact Movement by Titan.',
    learning: 'Search is a product problem, not a technology problem. What users search for reveals what they actually want.',
    scale: 'Global Top 100',
    stack: ['Android', 'iOS', 'Search Systems', 'Recommendation Engine'],
    evidence: 'wowdrobe',
    gradient: 'from-rose-500/5 to-amber-500/5',
  },
  {
    id: 'ai-keyboard',
    name: 'Evolve with AI',
    tagline: 'AI Keyboard for Android',
    problem: 'AI capabilities are locked inside chat interfaces. Users shouldn\'t have to switch apps to access intelligence.',
    solution: 'An AI-powered keyboard that brings generative AI directly into the typing experience. Contextual suggestions, transformations, and AI features accessible from any app.',
    impact: 'Featured on Google Play Academy blog. #AndroidSpotlight by Android Developers (Google).',
    learning: 'The best AI interfaces disappear into existing workflows. Users don\'t want a new app — they want their current tools to be smarter.',
    scale: 'Google Featured',
    stack: ['Kotlin', 'Jetpack Compose', 'AI/ML', 'Android IME'],
    evidence: 'evolve-ai',
    footnoteKey: 'google-feature',
    gradient: 'from-amber-500/5 to-orange-500/5',
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
              <h2 className="font-serif text-3xl sm:text-4xl dark:text-zinc-100 text-stone-900 leading-tight mb-3 max-w-xl">
                Zero-to-one execution.
              </h2>
              <p className="font-sans text-[15px] dark:text-zinc-500 text-stone-400 mb-16 max-w-lg leading-relaxed">
                Not a project grid. Each system started with an unclear problem and ended with something real in someone's hands.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {systems.map((system, i) => {
                const isActive = activeSystem === system.id;
                return (
                  <FadeIn key={system.id} delay={i * 0.08} y={16}>
                    <ParallaxCard className="h-full" depth={isActive ? 0 : 6}>
                      <motion.div
                        onClick={() => setActiveSystem(isActive ? null : system.id)}
                        className={`group cursor-pointer rounded-xl border overflow-hidden transition-all duration-500 h-full bg-gradient-to-br ${system.gradient} ${
                          isActive
                            ? 'border-accent/15 dark:shadow-2xl dark:shadow-black/30 shadow-lg shadow-stone-200/30'
                            : 'border-surface-3/40 hover:border-surface-4/60'
                        }`}
                        layout
                      >
                        <div className="p-6 sm:p-7">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className={`font-serif text-xl sm:text-2xl transition-colors duration-300 ${isActive ? 'dark:text-zinc-100 text-stone-900' : 'dark:text-zinc-200 text-stone-700'}`}>
                                {system.name}
                              </h3>
                              <p className="font-mono text-[10px] uppercase tracking-wider text-accent/40 mt-1">
                                {system.tagline}
                              </p>
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
                            <span className="font-mono text-[9px] uppercase tracking-[0.2em] dark:text-zinc-600 text-stone-400 block mb-1.5">
                              Problem
                            </span>
                            <p className="font-sans text-[13px] dark:text-zinc-500 text-stone-400 leading-relaxed">
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
                                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent/40 block mb-1.5">Solution</span>
                                  <p className="font-sans text-[13px] dark:text-zinc-400 text-stone-500 leading-relaxed">{system.solution}</p>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.4 }} className="mb-4">
                                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] dark:text-emerald-400/40 text-emerald-600/50 block mb-1.5">Impact</span>
                                  <p className="font-sans text-[13px] dark:text-emerald-300/70 text-emerald-700/70 leading-relaxed">
                                    {system.impact}
                                    {system.footnoteKey && footnotes[system.footnoteKey] && (
                                      <Footnote number={footnotes[system.footnoteKey].number} text={footnotes[system.footnoteKey].text} />
                                    )}
                                  </p>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="mb-5 p-3.5 rounded-lg bg-surface-3/30 border-l-2 border-accent/15">
                                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent/35 block mb-1.5">Key Learning</span>
                                  <p className="font-sans text-[13px] dark:text-zinc-400 text-stone-500 leading-relaxed italic">{system.learning}</p>
                                </motion.div>

                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex items-center gap-3 flex-wrap">
                                  <div className="flex flex-wrap gap-1.5">
                                    {system.stack.map((tech) => (
                                      <span key={tech} className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-surface-3/50 dark:text-zinc-500 text-stone-400 tracking-wider">{tech}</span>
                                    ))}
                                  </div>
                                  {system.evidence && (
                                    <EvidenceTag evidenceKey={system.evidence} onOpen={openEvidence} />
                                  )}
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
