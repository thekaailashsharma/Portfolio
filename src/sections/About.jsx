import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';
import Annotation from '../components/Annotation';
import { Footnote, MarginNote } from '../components/FootnoteSystem';
import { footnotes, marginNotes } from '../data/marginNotes';
import { useGitHubStats } from '../hooks/useGitHubStats';

function AnimatedNumber({ value, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

function BentoCell({ children, className = '', delay = 0 }) {
  return (
    <FadeIn delay={delay} y={16}>
      <div className={`rounded-2xl border border-surface-3/50 bg-surface-1/30 hover:bg-surface-1/60 hover:border-surface-4/60 transition-all duration-500 p-6 h-full ${className}`}>
        {children}
      </div>
    </FadeIn>
  );
}

export default function About() {
  const stats = useGitHubStats();

  return (
    <section id="about" className="relative px-6 sm:px-10 lg:px-20 py-28 sm:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="About" />

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_200px] gap-10">
          <div>
            <FadeIn>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl dark:text-zinc-100 text-stone-900 leading-[1.15] mb-10">
                I build things in spaces where the{' '}
                <Annotation note="Most interesting problems don't come with a spec. They come with a constraint and a deadline. The solution reveals itself only after you start building.">
                  problem isn't fully defined
                </Annotation>{' '}
                yet.
              </h2>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
              <BentoCell className="col-span-2 md:col-span-2 md:row-span-2" delay={0.05}>
                <p className="font-sans text-[14px] sm:text-[15px] dark:text-zinc-400 text-stone-500 leading-[1.8] mb-4">
                  At{' '}
                  <Annotation note="India's largest matrimony platform. 35M+ members. Real-time communication systems where trust and reliability aren't features — they're the product.">
                    India's largest matrimony platform
                  </Annotation>
                  {' '}(35M+ members), I own real-time communication for 200K+ daily users.
                  <Footnote number={footnotes['shaadi-weight'].number} text={footnotes['shaadi-weight'].text} />
                </p>
                <p className="font-sans text-[14px] sm:text-[15px] dark:text-zinc-400 text-stone-500 leading-[1.8] mb-4">
                  At{' '}
                  <Annotation note="AI Architect & Community — designing AI systems for animal advocacy. 370+ global contributors building open-source AI tools.">
                    Open Paws
                  </Annotation>
                  , I architect AI systems for an open-source community of 370+ global contributors.
                </p>
                <p className="font-sans text-[14px] sm:text-[15px] dark:text-zinc-400 text-stone-500 leading-[1.8]">
                  I'm drawn to institution-building problems — the kind where trust, clarity, and outcomes matter more than optics.
                </p>
              </BentoCell>

              <BentoCell delay={0.1}>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent/40 block mb-3">Daily Active Users</span>
                <span className="font-serif text-4xl sm:text-5xl dark:text-zinc-100 text-stone-900 block mb-1">
                  <AnimatedNumber value={200} suffix="K+" />
                </span>
                <span className="font-sans text-[12px] dark:text-zinc-500 text-stone-400">Consumer trust platform</span>
              </BentoCell>

              <BentoCell delay={0.15}>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent/40 block mb-3">Intern → SDE I</span>
                <span className="font-serif text-4xl sm:text-5xl dark:text-zinc-100 text-stone-900 block mb-1">
                  &lt;12mo
                </span>
                <span className="font-sans text-[12px] dark:text-zinc-500 text-stone-400">
                  Fastest promotion cycle
                </span>
              </BentoCell>

              <BentoCell delay={0.2} className="overflow-hidden !p-0">
                <div className="w-full h-full min-h-[160px] bg-surface-2">
                  <img
                    src="/evidence/devfest-bhopal.png"
                    alt="Kailash Sharma"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
              </BentoCell>

              <BentoCell delay={0.25}>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent/40 block mb-3">Philosophy</span>
                <p className="font-serif text-[16px] dark:text-zinc-300 text-stone-600 italic leading-relaxed">
                  "You can't deliver the future if you're not in the future."
                </p>
              </BentoCell>

              <BentoCell delay={0.12} className="col-span-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent/40 block mb-3">Product Impact</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="font-serif text-2xl dark:text-zinc-100 text-stone-900 block">370+</span>
                    <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-wider text-accent/50 block leading-tight">Contributors</span>
                    <span className="font-sans text-[10px] dark:text-zinc-600 text-stone-400 hidden sm:block">Open-source AI</span>
                  </div>
                  <div>
                    <span className="font-serif text-2xl dark:text-zinc-100 text-stone-900 block"><AnimatedNumber value={200} suffix="+" /></span>
                    <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-wider text-accent/50 block leading-tight">B2B Users</span>
                    <span className="font-sans text-[10px] dark:text-zinc-600 text-stone-400 hidden sm:block">Zero → retention</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="font-serif text-2xl dark:text-zinc-100 text-stone-900 block">2024</span>
                    <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-wider text-accent/50 block leading-tight">App of the Year</span>
                    <span className="font-sans text-[10px] dark:text-zinc-600 text-stone-400 hidden sm:block">Google Play Best</span>
                  </div>
                </div>
              </BentoCell>

              <BentoCell delay={0.18} className="col-span-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent/40 block mb-3">Surface Areas</span>
                <div className="flex flex-wrap gap-2">
                  {['Product Strategy', 'AI Systems', 'Consumer Products', 'Zero-to-One', 'Notification Design', 'Android', 'iOS', 'GenAI'].map((s) => (
                    <motion.span
                      key={s}
                      whileHover={{ scale: 1.05, y: -1 }}
                      className="font-mono text-[10px] px-2.5 py-1 rounded-lg bg-surface-2/60 border border-surface-3/50 dark:text-zinc-400 text-stone-500 cursor-default transition-colors hover:border-accent/30 hover:text-accent"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </BentoCell>

              <BentoCell delay={0.22} className="col-span-2 md:col-span-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent/40 block mb-3">Background</span>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <div>
                    <span className="font-sans text-[12px] dark:text-zinc-500 text-stone-400">Education</span>
                    <p className="font-sans text-[13px] dark:text-zinc-300 text-stone-600">B.Tech AI & DS · 8.85 GPA</p>
                  </div>
                  <div>
                    <span className="font-sans text-[12px] dark:text-zinc-500 text-stone-400">GitHub</span>
                    <p className="font-sans text-[13px] dark:text-zinc-300 text-stone-600">
                      <AnimatedNumber value={stats.repos} /> repos · <AnimatedNumber value={stats.stars} />★
                    </p>
                  </div>
                  <div>
                    <span className="font-sans text-[12px] dark:text-zinc-500 text-stone-400">Hackathons</span>
                    <p className="font-sans text-[13px] dark:text-zinc-300 text-stone-600">
                      Top 100 / 4000+ teams globally
                      <Footnote number={footnotes['compose-early'].number} text={footnotes['compose-early'].text} />
                    </p>
                  </div>
                  <div>
                    <span className="font-sans text-[12px] dark:text-zinc-500 text-stone-400">Recognition</span>
                    <p className="font-sans text-[13px] dark:text-zinc-300 text-stone-600">
                      1st @ National Hackathon · G20 Top 5
                      <Footnote number={footnotes['solution-challenge'].number} text={footnotes['solution-challenge'].text} />
                    </p>
                  </div>
                </div>
              </BentoCell>
            </div>

            <FadeIn delay={0.25}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-8 border-t border-surface-3/60">
                {[
                  { trait: 'Builder Mindset', desc: 'I default to building. Prototypes over presentations, shipping over planning.' },
                  { trait: 'Comfort with Ambiguity', desc: 'I operate well when the spec is thin and the constraints are thick.' },
                  { trait: 'Product Thinking', desc: 'Every engineering decision is a product decision. I think about users first.' },
                  { trait: 'Engineering Depth', desc: 'Android, iOS, backend, AI systems. I go where the problem needs me.' },
                ].map((item, i) => (
                  <FadeIn key={item.trait} delay={0.08 * i} y={10}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="group p-5 rounded-xl border border-transparent hover:border-surface-4/50 hover:bg-surface-1/50 transition-all duration-500"
                    >
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/50 mb-2.5 group-hover:text-accent/70 transition-colors">
                        {item.trait}
                      </h4>
                      <p className="font-sans text-[13px] dark:text-zinc-500 text-stone-400 leading-relaxed dark:group-hover:text-zinc-400 group-hover:text-stone-600 transition-colors">
                        {item.desc}
                      </p>
                    </motion.div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </div>

          <div className="hidden xl:flex flex-col gap-16 pt-32">
            {marginNotes.about.map((note) => (
              <MarginNote key={note.id}>{note.text}</MarginNote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
