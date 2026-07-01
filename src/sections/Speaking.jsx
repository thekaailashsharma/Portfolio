import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';
import Annotation from '../components/Annotation';
import PhotoReveal from '../components/PhotoReveal';
import { EvidenceTag } from '../components/EvidenceDrawer';
import { MarginNote } from '../components/FootnoteSystem';
import { marginNotes } from '../data/marginNotes';

const talks = [
  { event: 'DevFest Mumbai', type: 'Conference', evidence: 'devfest-mumbai', photo: '/evidence/devfest-mumbai.png' },
  { event: 'DevFest Bhopal', type: 'Conference', evidence: 'devfest-bhopal', photo: '/evidence/devfest-bhopal.png' },
  { event: 'Swift Mumbai', type: 'Meetup', evidence: 'swift-mumbai', photo: '/evidence/swift-mumbai.png' },
  { event: 'Swift Bengaluru', type: 'Meetup', evidence: 'swift-bengaluru', photo: '/evidence/swift-bengaluru.png' },
  { event: 'GDG MAD Mumbai', type: 'Community', evidence: 'gdg-mad', photo: '/evidence/gdg-mad.png' },
  { event: 'Droid Tribe', type: 'Community', evidence: 'droid-tribe', photo: '/evidence/droid-tribe.png' },
  { event: 'Huddle @ Shaadi', type: 'Internal', evidence: 'huddle-shaadi', photo: '/evidence/huddle-shaadi.WEBP' },
];

const mentoring = [
  {
    label: 'FOSS Hacks (Pune)',
    desc: "India's largest FOSS United hackathon. Helped teams move from abstract ideas to working prototypes.",
    evidence: 'foss-hacks',
  },
  {
    label: 'Cyberstorm CTF',
    desc: 'Co-organized and mentored. Built from scratch into a large-scale security competition.',
  },
  {
    label: 'College Hackathons',
    desc: 'Multiple events. The common pattern: helping teams escape analysis paralysis and ship something real.',
  },
];

export default function Speaking({ openEvidence }) {
  return (
    <section id="speaking" className="relative px-6 sm:px-10 lg:px-20 py-28 sm:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Speaking & Mentorship" />

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_200px] gap-10">
          <div>
            <FadeIn>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl dark:text-zinc-100 text-stone-900 leading-tight mb-3 max-w-xl">
                Teaching builders to{' '}
                <Annotation note="Most hackathon teams fail not because of skill, but because they spend too long deciding. The ones who ship first learn first.">
                  ship faster
                </Annotation>
                .
              </h2>
              <p className="font-sans text-[15px] lg:text-base dark:text-zinc-500 text-stone-400 mb-12 max-w-lg leading-relaxed">
                Builder-first mentoring. Practical, execution-focused, and grounded in real constraints. No motivational fluff.
              </p>
            </FadeIn>

            <FadeIn delay={0.06}>
              <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-3 mb-3">
                {/* featured — Droid Tribe (his best stage photo) */}
                <div className="relative rounded-2xl overflow-hidden border border-surface-3/50 aspect-[16/10]" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.4)' }}>
                  <img src="/evidence/droid-tribe.png" alt="Speaking at Droid Tribe" loading="lazy" className="w-full h-full object-cover media-duotone transition-transform duration-700 hover:scale-[1.04]" style={{ objectPosition: 'center 22%' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(33,27,22,.7))' }} />
                  <span className="absolute bottom-3 left-3.5 font-mono text-[11px] text-white/95 tracking-wide">Droid Tribe · community</span>
                </div>
                {/* ReachGraph — talks over time (teal = data channel) */}
                <div className="rounded-2xl border border-surface-3/50 bg-surface-1/30 backdrop-blur-md p-5 flex flex-col" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,.4)' }}>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent/50 mb-1">On stage, over time</span>
                  <span className="font-serif text-2xl dark:text-zinc-100 text-stone-900 mb-2">10+ talks</span>
                  <svg viewBox="0 0 200 90" className="w-full flex-1" preserveAspectRatio="none">
                    <line x1="0" y1="80" x2="200" y2="80" stroke="rgba(33,27,22,.12)" strokeWidth="1" />
                    <motion.path d="M4,74 C40,70 60,56 90,44 C120,32 150,26 196,10" fill="none" stroke="#0E7C7B" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeOut' }} />
                    <motion.circle cx="196" cy="10" r="4" fill="#0E7C7B" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 }} />
                  </svg>
                  <div className="flex justify-between font-mono text-[8px] text-stone-400 mt-1"><span>2023</span><span style={{ color: '#0E7C7B' }}>now</span></div>
                </div>
              </div>
              {/* curated stage gallery — DevFest Bhopal highlighted, four equal tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-10">
                {[
                  { src: '/stage/IMG_2585.WEBP', pos: 'center 26%', label: 'DevFest Bhopal', highlight: true },
                  { src: '/stage/IMG_2577.WEBP', pos: 'center 42%', label: '' },
                  { src: '/evidence/devfest-mumbai.png', pos: 'center 20%', label: 'DevFest Mumbai' },
                  { src: '/evidence/gdg-mad.png', pos: 'center 22%', label: 'GDG MAD' },
                ].map((p, i) => (
                  <motion.div
                    key={p.src}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] ${p.highlight ? 'border-2' : 'border border-surface-3/50'}`}
                    style={p.highlight ? { borderColor: 'rgba(200,80,42,.5)', boxShadow: '0 10px 28px -12px rgba(200,80,42,.35)' } : {}}
                  >
                    <img src={p.src} alt={`Kailash Sharma speaking${p.label ? ' at ' + p.label : ''}`} loading="lazy" className="w-full h-full object-cover media-duotone transition-transform duration-700 hover:scale-105" style={{ objectPosition: p.pos }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 52%, rgba(33,27,22,.62))' }} />
                    {p.label && <span className="absolute bottom-2 left-2.5 font-mono text-[9px] text-white/90 tracking-wide">{p.label}</span>}
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mb-12">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/40 mb-6">
                  Speaking
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {talks.map((talk, i) => (
                    <FadeIn key={talk.event} delay={i * 0.04} y={8}>
                      <div className="group flex items-center justify-between p-4 rounded-xl border border-surface-3/40 bg-surface-1/15 hover:border-surface-4/60 hover:bg-surface-1/40 transition-all duration-400">
                        <PhotoReveal
                          src={talk.photo}
                          caption={`Speaking at ${talk.event}`}
                        >
                          <span className="font-sans text-[13.5px] lg:text-[15px] dark:text-zinc-400 text-stone-500 dark:group-hover:text-zinc-200 group-hover:text-stone-800 transition-colors">
                            {talk.event}
                          </span>
                        </PhotoReveal>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] uppercase tracking-wider dark:text-zinc-600 text-stone-400 px-2 py-0.5 rounded-md bg-surface-3/40">
                            {talk.type}
                          </span>
                          {talk.evidence && (
                            <EvidenceTag evidenceKey={talk.evidence} onOpen={openEvidence} label="" />
                          )}
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mb-12">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/40 mb-6">
                  Mentoring
                </h3>
                <div className="space-y-3">
                  {mentoring.map((item, i) => (
                    <FadeIn key={item.label} delay={i * 0.06} y={10}>
                      <div className="p-5 rounded-xl border border-surface-3/40 bg-surface-1/15 hover:border-surface-4/50 transition-all duration-400">
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="font-sans text-[15px] lg:text-base dark:text-zinc-300 text-stone-700">
                            {item.label}
                          </h4>
                          {item.evidence && (
                            <EvidenceTag evidenceKey={item.evidence} onOpen={openEvidence} />
                          )}
                        </div>
                        <p className="font-sans text-[13px] lg:text-[15px] dark:text-zinc-500 text-stone-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="p-6 rounded-xl bg-surface-2/50 border border-surface-3/40">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] dark:text-zinc-500 text-stone-400">
                    Mentoring Philosophy
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    'Don\'t mentor ideas. Mentor execution.',
                    'The best teams don\'t need motivation — they need clarity on what to build first.',
                    'Ship something ugly today. Polish it tomorrow. Overthinking kills more projects than bad code.',
                  ].map((line, i) => (
                    <p key={i} className="font-sans text-[13px] lg:text-[15px] dark:text-zinc-400 text-stone-500 leading-relaxed pl-3 border-l border-accent/12">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="hidden xl:flex flex-col gap-20 pt-32">
            {marginNotes.speaking.map((note) => (
              <MarginNote key={note.id}>{note.text}</MarginNote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
