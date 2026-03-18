import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';
import { MarginNote } from '../components/FootnoteSystem';
import { marginNotes } from '../data/marginNotes';
import { useTheme } from '../hooks/useTheme';

const posts = [
  {
    id: 'taste-as-a-service',
    title: 'Taste as a Service',
    marker: '001',
    url: 'https://thekailashsharma.substack.com/p/taste-as-a-service',
    preview: 'Product taste isn\'t aesthetic preference — it\'s pattern recognition applied to user experience.',
    excerpt: [
      'Taste develops from building and watching. Shipping something, watching users navigate it wrong, and understanding why the layout lied to them.',
      'The dangerous thing about taste is that it looks like opinion until the data catches up. The people who build the best products hold unpopular positions until the numbers validate them.',
      'Taste is also knowing when to ship ugly. Not every release needs polish. Some just need to exist so you can learn.',
    ],
    featured: true,
  },
  {
    id: 'ai-constitution',
    title: 'The AI Constitution Era Has Started',
    marker: '002',
    url: 'https://thekailashsharma.substack.com/p/the-ai-constitution-era-has-started',
    preview: 'We\'re not just building AI systems — we\'re writing the constitutions they\'ll operate under.',
    excerpt: [
      'Every guardrail you add to an AI system is a constitutional amendment. Every prompt template is a law. Every fine-tuning dataset is a cultural norm.',
      'The teams that will win aren\'t the ones with the best models — they\'re the ones with the best governance. Because AI governance is product design.',
      'We\'re in the era where the humans writing the rules matter as much as the models following them.',
    ],
    featured: true,
  },
  {
    id: 'hiring-humans',
    title: 'Why Companies Are Still Hiring Humans',
    marker: '003',
    url: 'https://thekailashsharma.substack.com/p/why-companies-are-still-hiring-humans',
    preview: 'AI replaces tasks, not judgment. And judgment is what companies actually pay for.',
    excerpt: [
      'The real question isn\'t whether AI can do your job. It\'s whether AI can handle the ambiguous parts of your job — the parts where the answer isn\'t in the data.',
      'Companies hire humans for pattern recognition in novel situations. AI excels at pattern recognition in familiar ones. The gap between those two is where careers are built.',
      'The humans who thrive alongside AI aren\'t the ones who compete with it — they\'re the ones who know which problems to hand off and which to own.',
    ],
    featured: true,
  },
  {
    id: 'ambiguity',
    title: 'On Building in Ambiguity',
    marker: '004',
    preview: 'The best opportunities don\'t come with a clear spec.',
    excerpt: [
      'Most people want clarity before they start working. I\'ve learned that clarity comes from working.',
      'The interesting problems — the ones where real value gets created — rarely arrive with a neat specification. They come as vague complaints from users, as patterns in data that don\'t quite make sense.',
      'Operating in ambiguity is a skill. It requires comfort with being wrong, willingness to change direction quickly, and the discipline to document what you learn as you learn it.',
    ],
  },
  {
    id: 'decision-making',
    title: 'On Speed of Decision',
    marker: '005',
    preview: 'Speed of decision often matters more than quality of decision.',
    excerpt: [
      'In early-stage building, reversible decisions should be made fast. The cost of a wrong reversible decision is nearly always lower than the cost of delayed action.',
      'The framework I use: Is this decision reversible? If yes, make it in minutes. If no, make it in days, not weeks.',
      'The meta-skill is identifying which decisions actually matter. Most don\'t.',
    ],
  },
];

function WritingCard({ post, isExpanded, onToggle }) {
  const { theme } = useTheme();

  return (
    <motion.article
      onClick={onToggle}
      className="cursor-pointer group relative"
      layout
    >
      <div className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
        isExpanded
          ? 'dark:shadow-xl dark:shadow-black/20 shadow-md shadow-stone-200/20'
          : ''
      }`}>
        <div className={`absolute inset-0 transition-all duration-500 ${
          isExpanded
            ? theme === 'dark' ? 'bg-[#141416]' : 'bg-[#f5f2e8]'
            : theme === 'dark' ? 'bg-surface-1/30' : 'bg-surface-1/50'
        }`} />

        {isExpanded && (
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, ${theme === 'dark' ? '#c8a87c' : '#8b6f47'} 28px)`,
            backgroundPosition: '0 60px',
          }} />
        )}

        {isExpanded && (
          <div className="absolute left-12 sm:left-16 top-0 bottom-0 w-px opacity-10" style={{ backgroundColor: '#ef4444' }} />
        )}

        <div className="relative p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <span className={`font-mono text-[10px] transition-colors duration-300 ${
                isExpanded ? 'text-accent/60' : 'text-accent/35'
              }`}>
                {post.marker}
              </span>
              <h3 className={`font-serif text-lg sm:text-xl lg:text-2xl transition-colors duration-300 ${
                isExpanded ? 'dark:text-zinc-100 text-stone-900' : 'dark:text-zinc-300 text-stone-700'
              }`}>
                {post.title}
              </h3>
              {post.featured && (
                <span className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-accent/10 border border-accent/20 text-accent/70">
                  substack
                </span>
              )}
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.25 }}
              className={`w-5 h-5 flex items-center justify-center rounded-full border transition-all duration-300 shrink-0 ${
                isExpanded ? 'border-accent/40 text-accent' : 'border-surface-4/60 dark:text-zinc-700 text-stone-300'
              }`}
            >
              <span className="text-xs leading-none">+</span>
            </motion.div>
          </div>

          <p className={`font-sans text-[13.5px] lg:text-[15px] leading-relaxed italic transition-colors duration-300 ${
            isExpanded
              ? 'dark:text-zinc-400 text-stone-500 sm:ml-8'
              : 'dark:text-zinc-500 text-stone-400'
          }`}>
            {post.preview}
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
                <div className="pt-5 mt-5 border-t border-surface-4/20 space-y-5 sm:ml-8">
                  {post.excerpt.map((paragraph, j) => (
                    <motion.p
                      key={j}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: j * 0.07, duration: 0.4 }}
                      className="font-sans text-[13.5px] lg:text-[15px] dark:text-zinc-400 text-stone-500 leading-[1.85]"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                  {post.url && (
                    <motion.a
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 font-mono text-[11px] text-accent hover:text-accent-bright transition-colors pt-2"
                    >
                      Read full post on Substack
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </motion.a>
                  )}
                  {!post.url && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="pt-3"
                    >
                      <span className="font-mono text-[9px] dark:text-zinc-700 text-stone-300 italic">
                        — working note, from the field
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isExpanded && (
          <div className="absolute top-0 right-0 w-6 h-6 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`absolute -top-3 -right-3 w-6 h-6 rotate-45 ${
              theme === 'dark' ? 'bg-surface-3' : 'bg-stone-200'
            }`} />
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Thinking() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="writing" className="relative px-6 sm:px-10 lg:px-20 py-28 sm:py-36">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Writing" />

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_200px] gap-10">
          <div className="max-w-4xl">
            <FadeIn>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl dark:text-zinc-100 text-stone-900 leading-tight mb-3">
                Thinking out loud.
              </h2>
              <p className="font-sans text-[15px] lg:text-base dark:text-zinc-500 text-stone-400 mb-6 max-w-lg leading-relaxed">
                Product thinking, AI, and building — published on{' '}
                <a
                  href="https://thekailashsharma.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-bright underline underline-offset-2 decoration-accent/30 hover:decoration-accent/60 transition-colors"
                >
                  Substack
                </a>
                {' '}and working notes from the field.
              </p>
            </FadeIn>

            <div className="space-y-3">
              {posts.map((post, i) => (
                <FadeIn key={post.id} delay={i * 0.06} y={10}>
                  <WritingCard
                    post={post}
                    isExpanded={expanded === post.id}
                    onToggle={() => setExpanded(expanded === post.id ? null : post.id)}
                  />
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.3}>
              <div className="mt-8 text-center">
                <a
                  href="https://thekailashsharma.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-accent/20 bg-accent/5 text-accent text-[13px] font-sans hover:bg-accent/10 hover:border-accent/35 transition-all duration-300"
                >
                  Read more on Substack
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              </div>
            </FadeIn>
          </div>

          <div className="hidden xl:flex flex-col gap-20 pt-32">
            {marginNotes.thinking.map((note) => (
              <MarginNote key={note.id}>{note.text}</MarginNote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
