import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';
import SystemNote from '../components/SystemNote';
import Annotation from '../components/Annotation';

export default function About() {
  return (
    <section id="about" className="relative px-6 sm:px-10 lg:px-20 py-28 sm:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="About" number="01" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-20">
          {/* Main narrative */}
          <div className="space-y-8">
            <FadeIn>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl dark:text-zinc-100 text-stone-900 leading-[1.15] mb-8">
                I build things in spaces where the{' '}
                <Annotation note="Most interesting problems don't come with a spec. They come with a constraint and a deadline. The solution reveals itself only after you start building.">
                  problem isn't fully defined
                </Annotation>{' '}
                yet.
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="font-sans text-base sm:text-[17px] dark:text-zinc-400 text-stone-500 leading-[1.8] max-w-2xl">
                I've worked across consumer products, AI systems, and early-stage execution.
                At{' '}
                <Annotation note="10,000+ daily users. Real-time communication systems where trust and reliability aren't features — they're the product. Small system changes influence user behavior, drop-offs, and trust at scale.">
                  Shaadi.com
                </Annotation>
                , I own real-time communication systems for 10k+ daily users.
                At{' '}
                <Annotation note="Designing AI systems that replace manual judgment — not demos. Validated AI outputs in production, surfaced failure modes, and iterated based on real-world behavior, not benchmarks.">
                  Open Paws AI
                </Annotation>
                , I design AI that replaces manual judgment in production.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="font-sans text-base sm:text-[17px] dark:text-zinc-400 text-stone-500 leading-[1.8] max-w-2xl">
                Before that, I built features for{' '}
                <Annotation note="Bank account integrations, home-screen widgets, dynamic UI components. 10k+ users. Learned that good UI is a system, not a screen.">
                  Fold Money
                </Annotation>
                's 10k+ users, led product for{' '}
                <Annotation note="US-based CRM platform. Led end-to-end development — 15+ FCM notification flows, Lead Maps, complete HubSpot integration. 200+ active users.">
                  Leadbeam
                </Annotation>
                , and shipped zero-to-one products that got{' '}
                <Annotation note="Top 100 globally in Google Solution Challenge — two consecutive years (2023 & 2024). Out of 2,000+ applicants worldwide. Featured on Google Play Academy blog and Android Developers LinkedIn as #AndroidSpotlight.">
                  recognized globally by Google
                </Annotation>
                .
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="font-sans text-base sm:text-[17px] dark:text-zinc-400 text-stone-500 leading-[1.8] max-w-2xl">
                I'm drawn to{' '}
                <Annotation note="Institution-building problems require trust, clarity, and outcomes. Optics are secondary. The work itself has to be real.">
                  institution-building problems
                </Annotation>
                {' '}— the kind where trust, clarity, and outcomes matter more than optics.
                I think clearly under pressure, extract insight from real users, and iterate
                fast enough to learn before the window closes.
              </p>
            </FadeIn>

            {/* Builder traits */}
            <FadeIn delay={0.25}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-14 pt-8 border-t border-surface-3/60">
                {[
                  {
                    trait: 'Builder Mindset',
                    desc: 'I default to building. Prototypes over presentations, shipping over planning.',
                  },
                  {
                    trait: 'Comfort with Ambiguity',
                    desc: 'I operate well when the spec is thin and the constraints are thick.',
                  },
                  {
                    trait: 'Product Thinking',
                    desc: 'Every engineering decision is a product decision. I think about users first.',
                  },
                  {
                    trait: 'Engineering Depth',
                    desc: 'Android, iOS, backend, AI systems. I go where the problem needs me.',
                  },
                ].map((item, i) => (
                  <FadeIn key={item.trait} delay={0.08 * i} y={10}>
                    <div className="group p-5 rounded-xl border border-transparent hover:border-surface-4/50 hover:bg-surface-1/50 transition-all duration-500">
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/50 mb-2.5 group-hover:text-accent/70 transition-colors">
                        {item.trait}
                      </h4>
                      <p className="font-sans text-[13px] dark:text-zinc-500 text-stone-400 leading-relaxed dark:group-hover:text-zinc-400 group-hover:text-stone-600 transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Side notes column */}
          <div className="hidden lg:flex flex-col gap-20 pt-24">
            <SystemNote>
              GPA 8.85 — University of Mumbai.
              But the real education happened in hackathons and production bugs.
            </SystemNote>
            <SystemNote>
              Featured on official Google Play Academy blog
              and Android Developers LinkedIn as #AndroidSpotlight.
            </SystemNote>
            <SystemNote>
              1st place, Mumbai Hacks — Mumbai's largest hackathon.
              500+ participants. Built a waste management app.
            </SystemNote>
          </div>
        </div>
      </div>
    </section>
  );
}