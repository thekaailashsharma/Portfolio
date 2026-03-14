import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';
import { EvidenceTag } from '../components/EvidenceDrawer';
import { Footnote, MarginNote } from '../components/FootnoteSystem';
import { footnotes, marginNotes } from '../data/marginNotes';

const branches = {
  engineering: { x: 40, color: '#60a5fa', label: 'eng' },
  product: { x: 80, color: '#6ee7b7', label: 'prod' },
  ai: { x: 120, color: '#c084fc', label: 'ai' },
  community: { x: 160, color: '#67e8f9', label: 'community' },
};

const nodes = [
  {
    id: 'shaadi-sde',
    label: 'Shaadi.com',
    period: 'Jul 2025 — Present',
    role: 'Software Development Engineer I',
    branch: 'engineering',
    learning: 'How small system changes influence user behavior at scale',
    details: [
      'Promoted from intern to SDE I. Owns reliability of real-time communication systems for 10,000+ daily users.',
      'Works on payments, chat, escalation — flows where trust and failure directly affect outcomes.',
      'Every change is a behavioral experiment at this scale.',
    ],
    systemNote: 'First time owning systems where downtime means real human conversations are lost.',
    footnoteKey: 'shaadi-weight',
  },
  {
    id: 'openpaws',
    label: 'Open Paws',
    period: 'Aug 2025 — Present',
    role: 'AI Architect & Community',
    branch: 'ai',
    mergeFrom: ['community'],
    learning: 'The gap between AI demos and production AI is trust in failure handling',
    details: [
      'Designed AI systems that replace manual judgment — not slide decks, real workflows.',
      'Validated outputs in production. Surfaced failure modes. Iterated based on what actually broke.',
      'Community-driven approach: building AI tools that serve the community, not just the org.',
    ],
    systemNote: 'Most automation demos look good in slides. Production systems expose failure modes quickly.',
  },
  {
    id: 'shaadi-intern',
    label: 'Shaadi.com',
    period: 'Dec 2024 — Jul 2025',
    role: 'Software Development Engineer Intern',
    branch: 'engineering',
    learning: 'Real-time systems don\'t forgive sloppy code — 10k people are counting on it',
    details: [
      'First real production role. Owned real-time communication systems from day one.',
      'Learned the weight of production code when downtime means real people can\'t connect.',
      'Performance led to promotion to SDE I within 7 months.',
    ],
    systemNote: 'I was 21 when I first owned a system that could break 10,000 conversations.',
  },
  {
    id: 'leadbeam',
    label: 'Leadbeam.ai',
    period: 'Jun 2024 — Feb 2025',
    role: 'Product Manager + Developer',
    branch: 'product',
    learning: 'Product management is translation — between users, engineers, and business reality',
    details: [
      'Led end-to-end development of the Leadbeam mobile app for US-based teams.',
      'Implemented 15+ FCM notification flows, Lead Maps, and managed full HubSpot integration.',
      'Streamlined CRM updates for 200+ users.',
    ],
    systemNote: 'Remote product work across time zones forces clarity in communication.',
  },
  {
    id: 'my-irish-cousin',
    label: 'My Irish Cousin',
    period: 'Jun — Nov 2024',
    role: 'Product Manager',
    branch: 'product',
    learning: 'Managing a product for a foreign market requires empathy that no user persona can replace',
    details: [
      'Product Manager for an Irish travel product.',
      'Handled end-to-end product decisions, user flows, and stakeholder management.',
      'First experience managing a product for an international audience with different cultural expectations.',
    ],
    systemNote: 'Building for users whose context you don\'t share teaches you to rely on research over intuition.',
  },
  {
    id: 'fold',
    label: 'Fold Money',
    period: 'Jul — Nov 2023',
    role: 'Android Developer Intern',
    branch: 'engineering',
    learning: 'Good UI is a system, not a screen. Components compound.',
    details: [
      'Built bank account integrations and home-screen widgets for 10,000+ users.',
      'Created dynamic UI components with Jetpack Compose.',
      'First real lesson in the difference between code that works and code that works at scale.',
    ],
    systemNote: 'Bengaluru. First time in a high-velocity startup environment.',
    footnoteKey: 'fold-bengaluru',
  },
  {
    id: 'internshala',
    label: 'Internshala',
    period: 'Mar — Aug 2023',
    role: 'Technical Content Creator',
    branch: 'community',
    learning: 'Teaching through content forces you to truly understand what you\'re explaining',
    details: [
      'Created educational technical content reaching thousands of students.',
      'Learned to distill complex engineering concepts into accessible formats.',
      'Early experience in communicating technical ideas to non-technical audiences.',
    ],
    systemNote: 'Writing content about code made me a better coder. Teaching is the deepest form of learning.',
  },
  {
    id: 'easocare',
    label: 'Easocare',
    period: 'Feb — May 2023',
    role: 'Android Developer',
    branch: 'engineering',
    learning: 'Migrating production code requires patience and paranoia in equal measure',
    details: [
      'Migrated healthcare app to Jetpack Compose — one of the earliest production Compose migrations.',
      'Learned to work with legacy codebases while introducing modern patterns.',
      'Healthcare domain added extra weight to code quality decisions.',
    ],
    systemNote: 'Healthcare app. Every bug could mean someone misses a medical alert. That changes your testing habits.',
  },
  {
    id: 'hackathons',
    label: 'Hackathons & Competitions',
    period: '2023 — 2024',
    role: 'Builder & Competitor',
    branch: 'engineering',
    mergeFrom: ['product'],
    learning: 'Speed of execution is a muscle. Hackathons are the gym.',
    details: [
      'Top 100 globally in Google Solution Challenge — two consecutive years (2,000+ applicants).',
      '1st place at Mumbai Hacks — Mumbai\'s largest hackathon (500+ participants).',
      'Top 5 in G20 Google Hackathon. Finalist at Design Impact Movement by Titan.',
    ],
    systemNote: 'Hackathons taught me that the first version doesn\'t need to be good. It needs to be real.',
    evidence: 'mumbai-hacks',
    footnoteKey: 'mumbai-hacks',
  },
  {
    id: 'speaking',
    label: 'Speaking & Mentorship',
    period: 'Ongoing',
    role: 'Speaker & Mentor',
    branch: 'community',
    learning: 'Teaching forces clarity. If you can\'t explain it simply, you don\'t understand it yet.',
    details: [
      'Speaker at DevFest Mumbai, DevFest Bhopal, Swift Mumbai, GDG MAD Mumbai.',
      'Mentored teams at FOSS Hacks (Pune) — India\'s largest FOSS United hackathon.',
      'Co-organized Cyberstorm CTF from scratch into a large-scale competition.',
    ],
    systemNote: 'The best mentoring moment: when a stuck team stops overthinking and starts shipping.',
    evidence: 'devfest-mumbai',
  },
];

function GitLine({ fromBranch, index, totalNodes }) {
  const from = branches[fromBranch];
  if (!from) return null;

  return (
    <div className="absolute left-0 top-0 bottom-0 w-[200px] pointer-events-none hidden lg:block">
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
        <line
          x1={from.x} y1="0" x2={from.x} y2="100%"
          stroke={from.color}
          strokeWidth="1.5"
          strokeOpacity="0.15"
          strokeDasharray={index === totalNodes - 1 ? '4 4' : 'none'}
        />
        <circle
          cx={from.x} cy="32"
          r="5"
          fill={from.color}
          fillOpacity="0.6"
          stroke={from.color}
          strokeWidth="2"
          strokeOpacity="0.3"
        />
      </svg>
    </div>
  );
}

export default function Timeline({ openEvidence }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="timeline" className="relative px-6 sm:px-10 lg:px-20 py-28 sm:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Builder Timeline" />

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_200px] gap-10">
          <div>
            <FadeIn>
              <h2 className="font-serif text-3xl sm:text-4xl dark:text-zinc-100 text-stone-900 leading-tight mb-3 max-w-xl">
                Not a resume. A learning log.
              </h2>
              <p className="font-sans text-[15px] dark:text-zinc-500 text-stone-400 mb-6 max-w-lg leading-relaxed">
                Click any node to see what was actually learned — not the job description.
              </p>
            </FadeIn>

            <FadeIn delay={0.05}>
              <div className="flex flex-wrap gap-4 mb-12 ml-0 lg:ml-[200px]">
                {Object.entries(branches).map(([key, b]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color, opacity: 0.6 }} />
                    <span className="font-mono text-[9px] uppercase tracking-wider dark:text-zinc-600 text-stone-400">{b.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <div className="space-y-3">
              {nodes.map((node, i) => {
                const isExpanded = expanded === node.id;
                const branch = branches[node.branch];
                return (
                  <FadeIn key={node.id} delay={i * 0.05} y={12}>
                    <div className="relative">
                      <GitLine fromBranch={node.branch} index={i} totalNodes={nodes.length} />

                      <motion.div
                        onClick={() => setExpanded(isExpanded ? null : node.id)}
                        className={`lg:ml-[200px] cursor-pointer rounded-xl border transition-all duration-500 ${
                          isExpanded
                            ? 'bg-surface-2/80 border-surface-4/80 dark:shadow-xl dark:shadow-black/20 shadow-md shadow-stone-200/30'
                            : 'bg-surface-1/20 border-surface-3/40 hover:bg-surface-1/50 hover:border-surface-4/60'
                        }`}
                        layout
                      >
                        <div className="p-5 sm:p-6">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="w-2.5 h-2.5 rounded-full shrink-0 lg:hidden" style={{ backgroundColor: branch?.color, opacity: 0.6 }} />
                              <h3 className={`font-serif text-lg sm:text-xl transition-colors duration-300 ${isExpanded ? 'dark:text-zinc-100 text-stone-900' : 'dark:text-zinc-300 text-stone-700'}`}>
                                {node.label}
                              </h3>
                              <span className="font-mono text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-wider" style={{ borderColor: `${branch?.color}33`, color: branch?.color, backgroundColor: `${branch?.color}15` }}>
                                {branch?.label}
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
                            {node.footnoteKey && footnotes[node.footnoteKey] && (
                              <Footnote number={footnotes[node.footnoteKey].number} text={footnotes[node.footnoteKey].text} />
                            )}
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
                                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-6">
                                    <div className="space-y-3">
                                      {node.details.map((detail, j) => (
                                        <motion.p
                                          key={j}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: j * 0.07, duration: 0.4 }}
                                          className="font-sans text-[13px] dark:text-zinc-400 text-stone-500 leading-relaxed pl-3 border-l-2 transition-colors"
                                          style={{ borderColor: `${branch?.color}30` }}
                                        >
                                          {detail}
                                        </motion.p>
                                      ))}
                                      {node.evidence && (
                                        <motion.div
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          transition={{ delay: 0.3 }}
                                          className="pt-2"
                                        >
                                          <EvidenceTag evidenceKey={node.evidence} onOpen={openEvidence} />
                                        </motion.div>
                                      )}
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

          <div className="hidden xl:flex flex-col gap-20 pt-32">
            {marginNotes.timeline.map((note) => (
              <MarginNote key={note.id}>{note.text}</MarginNote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
