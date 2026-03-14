import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';

const pillars = [
  {
    id: 'ai',
    label: 'AI Systems',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    summary: 'Building AI that works in production, not in demos.',
    details: [
      'Designing systems that replace manual judgment with validated automation.',
      'Surfacing failure modes before users do. Iterating based on real-world behavior, not benchmarks.',
      'The hard part is never the model — it\'s knowing where humans still need to be in the loop.',
    ],
    tags: ['GenAI', 'Automation', 'Production AI', 'Failure Analysis'],
  },
  {
    id: 'consumer',
    label: 'Consumer Products',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    summary: 'Products people use daily, at scale, where trust is the feature.',
    details: [
      'Real-time systems impacting 10k+ daily users where reliability directly affects outcomes.',
      'Decision-heavy flows — payments, chat, escalation — requiring careful trade-offs between speed, safety, and confidence.',
      'Small system changes create large behavioral shifts. I\'ve learned to measure before I move.',
    ],
    tags: ['Scale', 'Payments', 'Real-time', 'Trust Systems'],
  },
  {
    id: 'execution',
    label: 'Early Product Execution',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    summary: 'Zero-to-one. From unclear problems to shipped products.',
    details: [
      'Taking ambiguous problem statements and shipping something real within weeks.',
      'Working across the full stack — Android, iOS, backend, cloud — going wherever the problem needs me.',
      'The goal is always learning velocity. Ship fast, learn faster, iterate before the window closes.',
    ],
    tags: ['Zero-to-One', 'Full Stack', 'Rapid Iteration', 'User Research'],
  },
];

export default function Pillars() {
  const [active, setActive] = useState(null);

  return (
    <section id="work" className="relative px-6 sm:px-10 lg:px-20 py-28 sm:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="What I Work On" number="02" />

        <FadeIn>
          <h2 className="font-serif text-3xl sm:text-4xl dark:text-zinc-100 text-stone-900 leading-tight mb-3 max-w-xl">
            Three overlapping surfaces.
          </h2>
          <p className="font-sans text-[15px] dark:text-zinc-500 text-stone-400 mb-16 max-w-md leading-relaxed">
            Most of my work sits at the intersection of these. The best problems live there.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map((pillar, i) => {
            const isActive = active === pillar.id;
            return (
              <FadeIn key={pillar.id} delay={i * 0.1}>
                <motion.div
                  onClick={() => setActive(isActive ? null : pillar.id)}
                  className={`group relative cursor-pointer rounded-xl border transition-all duration-500 ${
                    isActive
                      ? 'bg-surface-2 border-accent/25 dark:shadow-lg dark:shadow-accent/5 shadow-md shadow-stone-200/40'
                      : 'bg-surface-1/60 border-surface-3/60 hover:border-surface-4 hover:bg-surface-1'
                  }`}
                  layout
                >
                  <div className="p-6 sm:p-7">
                    <div className="flex items-start justify-between mb-5">
                      <span className={`transition-colors duration-300 ${isActive ? 'text-accent' : 'dark:text-zinc-600 text-stone-300 dark:group-hover:text-zinc-400 group-hover:text-stone-500'}`}>
                        {pillar.icon}
                      </span>
                      <motion.div
                        animate={{ rotate: isActive ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-5 h-5 flex items-center justify-center rounded-full border transition-all duration-300 ${
                          isActive ? 'border-accent/40 text-accent' : 'border-surface-4 dark:text-zinc-600 text-stone-300'
                        }`}
                      >
                        <span className="text-sm leading-none">+</span>
                      </motion.div>
                    </div>

                    <h3 className={`font-serif text-xl sm:text-2xl mb-2.5 transition-colors duration-300 ${isActive ? 'dark:text-zinc-100 text-stone-900' : 'dark:text-zinc-300 text-stone-700'}`}>
                      {pillar.label}
                    </h3>

                    <p className="font-sans text-[13px] dark:text-zinc-500 text-stone-400 leading-relaxed">
                      {pillar.summary}
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
                        <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-2 border-t border-surface-4/40 mx-4 sm:mx-5 space-y-3">
                          {pillar.details.map((detail, j) => (
                            <motion.p
                              key={j}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.08, duration: 0.4 }}
                              className="font-sans text-[13px] dark:text-zinc-400 text-stone-500 leading-relaxed pl-3 border-l border-accent/20"
                            >
                              {detail}
                            </motion.p>
                          ))}
                          <div className="flex flex-wrap gap-1.5 pt-3">
                            {pillar.tags.map((tag) => (
                              <span key={tag} className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-surface-3/80 dark:text-zinc-500 text-stone-400 tracking-wider uppercase">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}