import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import Signature from '../components/Signature';
import { FirstWeek } from '../components/Illustrations';
import { useTheme } from '../hooks/useTheme';

const links = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/thekaailashsharma',
    description: 'Professional updates & connections',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/thekaailashsharma',
    description: 'Code & open source work',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'Substack',
    href: 'https://thekailashsharma.substack.com/',
    description: 'Product thinking & AI writing',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/thekaailash',
    description: 'Thoughts & threads',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@thekaailashsharma',
    description: 'Demos, talks & the 2-min intro',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:kailashps.1011@gmail.com',
    description: 'For serious conversations',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
];

const resumes = [
  { label: 'Product Manager', desc: 'Product & GTM roles', id: '12GDzn9b11O6LAaxzgUBon7t6f-KelTLE', href: 'https://drive.google.com/file/d/12GDzn9b11O6LAaxzgUBon7t6f-KelTLE/view?usp=sharing' },
  { label: 'Engineering', desc: 'Technical deep-dive', id: '1kx_fpXjZhOBBNHZmW3nawCmdDOFxEqj0', href: 'https://drive.google.com/file/d/1kx_fpXjZhOBBNHZmW3nawCmdDOFxEqj0/view?usp=sharing' },
  { label: 'Speaker', desc: 'For event organizers', id: '169q0McYJEIDftS9-kXMRrdQbWMbfS3jZ', href: 'https://drive.google.com/file/d/169q0McYJEIDftS9-kXMRrdQbWMbfS3jZ/view?usp=sharing' },
];

export default function Contact() {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <section id="contact" className="relative px-6 sm:px-10 lg:px-20 py-28 sm:py-36">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/30 block mb-6">
              // end of file
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl dark:text-zinc-100 text-stone-900 leading-tight mb-6">
              Let&rsquo;s build something real.
            </h2>
            <p className="font-sans text-[15px] lg:text-base dark:text-zinc-500 text-stone-400 max-w-md mx-auto leading-relaxed mb-3">
              Open to Product Manager roles in consumer, AI, or platform teams — the kind where
              execution and ruthless prioritization decide whether the product survives.
            </p>
            <p className="font-sans text-[13.5px] dark:text-zinc-400 text-stone-500 max-w-lg mx-auto leading-relaxed mb-4">
              I think in <span className="text-accent">pipeline outcomes</span> — ICP fit, signal-to-action, pipeline velocity,
              conversion at every stage. Not just task completion.
            </p>
            <p className="font-sans text-[13px] dark:text-zinc-600 text-stone-400/90 max-w-sm mx-auto leading-relaxed italic mb-5">
              Available immediately. Give me a real problem and a week — happy to do a live build as the evaluation.
            </p>
            <a
              href="https://wa.me/+919326405547"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-[13px] text-accent hover:text-accent-bright transition-colors"
            >
              Fastest way to reach me? WhatsApp ↗
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="max-w-md mx-auto mb-12">
            <FirstWeek />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {links.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="group block"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="p-5 rounded-xl border border-surface-3/40 bg-surface-1/20 hover:bg-surface-1/60 hover:border-accent/20 transition-all duration-500 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="dark:text-zinc-600 text-stone-300 group-hover:text-accent transition-colors duration-300">
                      {link.icon}
                    </span>
                    <span className="font-sans text-base dark:text-zinc-300 text-stone-600 dark:group-hover:text-zinc-100 group-hover:text-stone-900 transition-colors duration-300">
                      {link.label}
                    </span>
                    <svg className="w-3.5 h-3.5 ml-auto dark:text-zinc-700 text-stone-300 group-hover:text-accent/60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                  <p className="font-mono text-[11px] dark:text-zinc-600 text-stone-400 group-hover:text-accent/60 transition-colors">
                    {link.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.18}>
          <div className="mb-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] dark:text-zinc-500 text-stone-400">
                Pick your lens · three résumés, one story
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {resumes.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass-panel glass-sheen rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="relative h-44 overflow-hidden bg-surface-2 flex items-center justify-center">
                    <img
                      src={`https://drive.google.com/thumbnail?id=${r.id}&sz=w600`}
                      alt={`${r.label} résumé preview`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                      onError={(e) => { e.currentTarget.style.opacity = '0.15'; }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 62%, rgba(33,27,22,.45))' }} />
                    <span className="absolute bottom-2.5 right-3 font-mono text-[9px] text-white/90 px-2 py-0.5 rounded-md" style={{ background: 'rgba(200,80,42,.85)' }}>Open ↗</span>
                  </div>
                  <div className="p-4">
                    <span className="font-sans text-[15px] dark:text-zinc-200 text-stone-700 group-hover:text-accent transition-colors">{r.label}</span>
                    <p className="font-mono text-[10px] dark:text-zinc-600 text-stone-400 mt-1">{r.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex justify-center mb-8">
            <Signature className="h-16 sm:h-20" dark={dark} />
          </div>
          <div className="border-t border-surface-3/30 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-serif text-lg dark:text-zinc-400 text-stone-500 mb-1">Kailash Sharma</p>
              <p className="font-mono text-[10px] dark:text-zinc-600 text-stone-400 tracking-wide">
                Mumbai, India &middot; {new Date().getFullYear()}
              </p>
            </div>
            <div className="text-right sm:text-right">
              <p className="font-mono text-[10px] dark:text-zinc-700 text-stone-300 tracking-wide italic">
                A human who loves Product &middot; Engineering &middot; AI
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
