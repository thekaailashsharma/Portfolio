import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';
import SystemNote from '../components/SystemNote';
import Annotation from '../components/Annotation';

const talks = [
  { event: 'DevFest Mumbai', type: 'Conference' },
  { event: 'DevFest Bhopal', type: 'Conference' },
  { event: 'Swift Mumbai', type: 'Meetup' },
  { event: 'GDG MAD Mumbai', type: 'Community' },
  { event: 'Flutter Sparks Mumbai', type: 'Meetup' },
  { event: 'Android Developers Meetup, Pune', type: 'Community' },
];

const mentoring = [
  {
    label: 'FOSS Hacks (Pune)',
    desc: "India's largest FOSS United hackathon. Helped teams move from abstract ideas to working prototypes.",
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

export default function Speaking() {
  return (
    <section id="speaking" className="relative px-6 sm:px-10 lg:px-20 py-28 sm:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Speaking & Mentorship" number="05" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-20">
          <div>
            <FadeIn>
              <h2 className="font-serif text-3xl sm:text-4xl dark:text-zinc-100 text-stone-900 leading-tight mb-3 max-w-xl">
                Teaching builders to{' '}
                <Annotation note="Most hackathon teams fail not because of skill, but because they spend too long deciding. The ones who ship first learn first.">
                  ship faster
                </Annotation>
                .
              </h2>
              <p className="font-sans text-[15px] dark:text-zinc-500 text-stone-400 mb-12 max-w-lg leading-relaxed">
                Builder-first mentoring. Practical, execution-focused, and grounded in real constraints. No motivational fluff.
              </p>
            </FadeIn>

            {/* Speaking engagements */}
            <FadeIn delay={0.1}>
              <div className="mb-12">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/40 mb-6">
                  Speaking
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {talks.map((talk, i) => (
                    <FadeIn key={talk.event} delay={i * 0.04} y={8}>
                      <div className="group flex items-center justify-between p-4 rounded-xl border border-surface-3/40 bg-surface-1/15 hover:border-surface-4/60 hover:bg-surface-1/40 transition-all duration-400">
                        <span className="font-sans text-[13.5px] dark:text-zinc-400 text-stone-500 dark:group-hover:text-zinc-200 group-hover:text-stone-800 transition-colors">
                          {talk.event}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-wider dark:text-zinc-600 text-stone-400 px-2 py-0.5 rounded-md bg-surface-3/40">
                          {talk.type}
                        </span>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Mentoring */}
            <FadeIn delay={0.15}>
              <div className="mb-12">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/40 mb-6">
                  Mentoring
                </h3>
                <div className="space-y-3">
                  {mentoring.map((item, i) => (
                    <FadeIn key={item.label} delay={i * 0.06} y={10}>
                      <div className="p-5 rounded-xl border border-surface-3/40 bg-surface-1/15 hover:border-surface-4/50 transition-all duration-400">
                        <h4 className="font-sans text-[15px] dark:text-zinc-300 text-stone-700 mb-1.5">
                          {item.label}
                        </h4>
                        <p className="font-sans text-[13px] dark:text-zinc-500 text-stone-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Philosophy */}
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
                    <p key={i} className="font-sans text-[13px] dark:text-zinc-400 text-stone-500 leading-relaxed pl-3 border-l border-accent/12">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Side notes */}
          <div className="hidden lg:flex flex-col gap-20 pt-24">
            <SystemNote>
              The best mentoring moment: when a stuck team stops overthinking and starts shipping.
            </SystemNote>
            <SystemNote>
              Featured by Google as #AndroidSpotlight. But the real signal is when your mentees start mentoring others.
            </SystemNote>
          </div>
        </div>
      </div>
    </section>
  );
}