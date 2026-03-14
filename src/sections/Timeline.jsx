import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';

const nodes = [
  {
    id: 'shaadi',
    label: 'Shaadi.com',
    period: 'Dec 2024 — Present',
    role: 'Software Development Engineer',
    type: 'scale',
    learning: 'How small system changes influence user behavior at scale',
    details: [
      'Owned reliability of real-time communication systems for 10,000+ daily users.',
      'Worked on payments, chat, escalation — flows where trust and failure directly affect outcomes.',
      'Learned that at scale, every change is a behavioral experiment. Measure before you move.',
    ],
    systemNote: 'First time owning systems where downtime means real human conversations are lost.',
  },
  {
    id: 'openpaws',
    label: 'Open Paws AI',
    period: 'Jun 2025 — Present',
    role: 'AI Automation & GenAI Engineer',
    type: 'ai',
    learning: 'The gap between AI demos and production AI is trust in failure handling',
    details: [
      'Designed AI systems that replace manual judgment — not slide decks, real workflows.',
      'Validated outputs in production. Surfaced failure modes. Iterated based on what actually broke.',
      'Regularly made decisions with incomplete information, improving systems cycle by cycle.',
    ],
    systemNote: 'Most automation demos look good in slides. Production systems expose failure modes quickly.',
  },
  {
    id: 'leadbeam',
    label: 'Leadbeam.ai',
    period: 'Jun 2024 — Present',
    role: 'Product Manager',
    type: 'product',
    learning: 'Product management is translation — between users, engineers, and business reality',
    details: [
      'Led end-to-end development of the Leadbeam mobile app for US-based teams.',
      'Implemented 15+ FCM notification flows, Lead Maps, and managed full HubSpot integration.',
      'Streamlined CRM updates for 200+ users. Learned how workflow friction silently kills adoption.',
    ],
    systemNote: 'Remote product work across time zones forces clarity in communication. No room for ambiguity.',
  },
  {
    id: 'fold',
    label: 'Fold Money',
    period: 'Jul — Nov 2023',
    role: 'Android Developer Intern',
    type: 'engineering',
    learning: 'Good UI is a system, not a screen. Components compound.',
    details: [
      'Built bank account integrations and home-screen widgets for 10,000+ users.',
      'Created dynamic UI components with Jetpack Compose, optimizing flows that users touched daily.',
      'First real lesson in the difference between code that works and code that works at scale.',
    ],
    systemNote: 'Bengaluru. First time in a high-velocity startup environment. Everything moved fast.',
  },
  {
    id: 'hackathons',
    label: 'Hackathons & Competitions',
    period: '2023 — 2024',
    role: 'Builder & Competitor',
    type: 'builder',
    learning: 'Speed of execution is a muscle. Hackathons are the gym.',
    details: [
      'Top 100 globally in Google Solution Challenge, two consecutive years (2,000+ applicants).',
      '1st place at Mumbai Hacks — Mumbai\'s largest hackathon (500+ participants).',
      'Top 5 in Telangana\'s largest hackathon. Finalist at Design Impact Movement by Titan.',
      'Showcased product at Deshpande Startups, India\'s largest incubation centre.',
    ],
    systemNote: 'Hackathons taught me that the first version doesn\'t need to be good. It needs to be real.',
  },
  {
    id: 'speaking',
    label: 'Speaking & Mentorship',
    period: 'Ongoing',
    role: 'Speaker & Mentor',
    type: 'community',
    learning: 'Teaching forces clarity. If you can\'t explain it simply, you don\'t understand it yet.',
    details: [
      'Speaker at DevFest Mumbai, DevFest Bhopal, Swift Mumbai, GDG MAD Mumbai, Flutter Sparks.',
      'Mentored teams at FOSS Hacks (Pune) — India\'s largest FOSS United hackathon.',
      'Co-organized Cyberstorm CTF from scratch into a large-scale competition.',
      'Known for builder-first mentoring: practical, execution-focused, grounded in real constraints.',
    ],
    systemNote: 'The best mentoring moment: when a stuck team stops overthinking and starts shipping.',
  },
];

const typeColors = {
  scale: 'bg-blue-500/15 text-blue-400/80 border-blue-500/20 dark:bg-blue-500/15 dark:text-blue-400/80',
  ai: 'bg-purple-500/15 text-purple-400/80 border-purple-500/20 dark:bg-purple-500/15 dark:text-purple-400/80',
  product: 'bg-emerald-500/15 text-emerald-400/80 border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-400/80',
  engineering: 'bg-amber-500/15 text-amber-400/80 border-amber-500/20 dark:bg-amber-500/15 dark:text-amber-400/80',
  builder: 'bg-rose-500/15 text-rose-400/80 border-rose-500/20 dark:bg-rose-500/15 dark:text-rose-400/80',
  community: 'bg-cyan-500/15 text-cyan-400/80 border-cyan-500/20 dark:bg-cyan-500/15 dark:text-cyan-400/80',
};

const typeDotColors = {
  scale: '#60a5fa',
  ai: '#c084fc',
  product: '#6ee7b7',
  engineering: '#fbbf24',
  builder: '#fb7185',
  community: '#67e8f9',
};

export default function Timeline() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="timeline" className="relative px-6 sm:px-10 lg:px-20 py-28 sm:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Builder Timeline" number="03" />

        <FadeIn>
          <h2 className="font-serif text-3xl sm:text-4xl dark:text-zinc-100 text-stone-900 leading-tight mb-3 max-w-xl">
            Not a resume. A learning log.
          </h2>
          <p className="font-sans text-[15px] dark:text-zinc-500 text-stone-400 mb-16 max-w-lg leading-relaxed">
            Click any node to see what was actually learned — not the job description.
          </p>
        </FadeIn>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-surface-4/80 via-surface-4/30 to-transparent hidden sm:block" />

          <div className="space-y-3">
            {nodes.map((node, i) => {
              const isExpanded = expanded === node.id;
              return (
                <FadeIn key={node.id} delay={i * 0.07} y={12}>
                  <div className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-6 hidden sm:flex items-center justify-center z-10">
                      <motion.div
                        animate={{ scale: isExpanded ? 1.5 : 1 }}
                        transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                        className="w-[10px] h-[10px] rounded-full ring-4 ring-surface-0 transition-shadow duration-500"
                        style={{
                          backgroundColor: isExpanded ? typeDotColors[node.type] : 'var(--surface-4)',
                          boxShadow: isExpanded ? `0 0 16px ${typeDotColors[node.type]}40` : 'none',
                        }}
                      />
                    </div>

                    {/* Card */}
                    <motion.div
                      onClick={() => setExpanded(isExpanded ? null : node.id)}
                      className={`sm:ml-12 cursor-pointer rounded-xl border transition-all duration-500 ${
                        isExpanded
                          ? 'bg-surface-2/80 border-surface-4/80 dark:shadow-xl dark:shadow-black/20 shadow-md shadow-stone-200/30'
                          : 'bg-surface-1/20 border-surface-3/40 hover:bg-surface-1/50 hover:border-surface-4/60'
                      }`}
                      layout
                    >
                      <div className="p-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className={`font-serif text-lg sm:text-xl transition-colors duration-300 ${isExpanded ? 'dark:text-zinc-100 text-stone-900' : 'dark:text-zinc-300 text-stone-700'}`}>
                              {node.label}
                            </h3>
                            <span className={`font-mono text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-wider ${typeColors[node.type]}`}>
                              {node.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-mono text-[11px] dark:text-zinc-600 text-stone-400 whitespace-nowrap">
                              {node.period}
                            </span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 45 : 0 }}
                              transition={{ duration: 0.25 }}
                              className={`w-5 h-5 flex items-center justify-center rounded-full border transition-all duration-300 ${
                                isExpanded ? 'border-accent/40 text-accent' : 'border-surface-4/60 dark:text-zinc-600 text-stone-400'
                              }`}
                            >
                              <span className="text-xs leading-none">+</span>
                            </motion.div>
                          </div>
                        </div>

                        <p className="font-mono text-[11px] text-accent/50 mb-2">{node.role}</p>

                        <p className="font-sans text-[13.5px] dark:text-zinc-500 text-stone-400 italic leading-relaxed">
                          &ldquo;{node.learning}&rdquo;
                        </p>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pt-5 mt-5 border-t border-surface-4/40">
                                <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-6">
                                  <div className="space-y-3">
                                    {node.details.map((detail, j) => (
                                      <motion.p
                                        key={j}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: j * 0.07, duration: 0.4 }}
                                        className="font-sans text-[13px] dark:text-zinc-400 text-stone-500 leading-relaxed pl-3 border-l border-accent/15"
                                      >
                                        {detail}
                                      </motion.p>
                                    ))}
                                  </div>
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="font-mono text-[10px] dark:text-zinc-600 text-stone-400 border-l border-surface-4/50 pl-3 leading-relaxed"
                                  >
                                    <span className="block text-[9px] uppercase tracking-[0.25em] text-accent/25 mb-1.5">
                                      // reflection
                                    </span>
                                    <span className="italic">{node.systemNote}</span>
                                  </motion.div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}