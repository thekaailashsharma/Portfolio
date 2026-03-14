import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';
import { useTheme } from '../hooks/useTheme';

const fragments = [
  {
    id: 'product-taste',
    title: 'On Product Taste',
    marker: '001',
    preview: 'Taste is pattern recognition applied to user experience.',
    body: [
      'Product taste isn\'t aesthetic preference. It\'s the ability to look at something and know — before analytics confirm — that it\'s not right.',
      'It develops from building and watching. Shipping something, watching users navigate it wrong, and understanding why the layout lied to them.',
      'The dangerous thing about taste is that it looks like opinion until the data catches up. The people who build the best products are the ones willing to hold unpopular product positions until the numbers validate them.',
      'Taste is also knowing when to ship ugly. Not every release needs polish. Some just need to exist so you can learn.',
    ],
  },
  {
    id: 'ai-automation',
    title: 'On AI Automation',
    marker: '002',
    preview: 'Most AI demos solve the easy 80%. Production demands the hard 20%.',
    body: [
      'The gap between an AI demo and a production AI system is enormous, and most of it is about failure handling.',
      'In demos, the model always works. In production, it fails in ways you never imagined — edge cases your training data never covered, user inputs that break your assumptions, hallucinations that look correct enough to fool the first reviewer.',
      'The real engineering is in the feedback loops: how do you detect failures? How quickly can a human intervene? How do you retrain without breaking what already works?',
      'I\'ve learned that the best AI systems are the ones where you\'ve carefully mapped where automation ends and human judgment begins. That boundary is the product.',
    ],
  },
  {
    id: 'ambiguity',
    title: 'On Ambiguity',
    marker: '003',
    preview: 'The best opportunities don\'t come with a clear spec.',
    body: [
      'Most people want clarity before they start working. I\'ve learned that clarity comes from working.',
      'The interesting problems — the ones where real value gets created — rarely arrive with a neat specification. They come as vague complaints from users, as patterns in data that don\'t quite make sense, as questions nobody in the room can answer confidently.',
      'Operating in ambiguity is a skill. It requires comfort with being wrong, willingness to change direction quickly, and the discipline to document what you learn as you learn it.',
      'I\'ve noticed the best builders don\'t wait for certainty. They move toward the uncertainty, build something small there, and use what they learn to find clarity.',
    ],
  },
  {
    id: 'decision-making',
    title: 'On Decision Making',
    marker: '004',
    preview: 'Speed of decision often matters more than quality of decision.',
    body: [
      'In early-stage building, reversible decisions should be made fast. The cost of a wrong reversible decision is nearly always lower than the cost of delayed action.',
      'I\'ve seen teams agonize over font choices while their core feature remained unvalidated. Prioritization failure is the most common execution failure.',
      'The framework I use: Is this decision reversible? If yes, make it in minutes. If no, make it in days, not weeks.',
      'The meta-skill is identifying which decisions actually matter. Most don\'t. The ones that do usually involve trust, money, or irreversible technical architecture.',
    ],
  },
  {
    id: 'constraints',
    title: 'On Building with Constraints',
    marker: '005',
    preview: 'Constraints aren\'t obstacles. They\'re design inputs.',
    body: [
      'The best products I\'ve built were the most constrained. Limited time, limited resources, unclear requirements. These constraints forced creative decisions that a fully-funded, fully-specced project never would.',
      'At hackathons, you have 24 hours. That constraint is a feature. It forces you to identify the single most important thing and build only that.',
      'In production, the constraints are different — uptime requirements, legacy systems, user expectations. But the principle is the same: constraints narrow the solution space, and a narrower solution space leads to more focused, more useful products.',
      'I\'ve learned to love constraints. They tell you what not to build, and that\'s the most valuable information in early product development.',
    ],
  },
];

export default function Thinking() {
  const [expanded, setExpanded] = useState(null);
  const { theme } = useTheme();

  return (
    <section id="thinking" className="relative px-6 sm:px-10 lg:px-20 py-28 sm:py-36">
      {/* Diagonal gradient */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: theme === 'dark'
          ? 'linear-gradient(135deg, rgba(200,168,124,0.4) 0%, transparent 50%)'
          : 'linear-gradient(135deg, rgba(139,111,71,0.3) 0%, transparent 50%)',
      }} />

      <div className="relative max-w-4xl mx-auto">
        <SectionLabel label="Thinking" number="06" />

        <FadeIn>
          <h2 className="font-serif text-3xl sm:text-4xl dark:text-zinc-100 text-stone-900 leading-tight mb-3">
            Thought fragments.
          </h2>
          <p className="font-sans text-[15px] dark:text-zinc-500 text-stone-400 mb-16 max-w-lg leading-relaxed">
            Short reflections on building, deciding, and operating in uncertainty.
            Not polished essays — working notes from the field.
          </p>
        </FadeIn>

        <div className="space-y-3">
          {fragments.map((fragment, i) => {
            const isExpanded = expanded === fragment.id;
            return (
              <FadeIn key={fragment.id} delay={i * 0.06} y={10}>
                <motion.article
                  onClick={() => setExpanded(isExpanded ? null : fragment.id)}
                  className={`cursor-pointer rounded-xl border transition-all duration-500 ${
                    isExpanded
                      ? 'bg-surface-2/80 border-accent/12 dark:shadow-xl dark:shadow-black/20 shadow-md shadow-stone-200/20'
                      : 'bg-surface-1/20 border-surface-3/40 hover:bg-surface-1/50 hover:border-surface-4/60'
                  }`}
                  layout
                >
                  <div className="p-5 sm:p-7">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-accent/35">
                          {fragment.marker}
                        </span>
                        <h3 className={`font-serif text-lg sm:text-xl transition-colors duration-300 ${isExpanded ? 'dark:text-zinc-100 text-stone-900' : 'dark:text-zinc-300 text-stone-700'}`}>
                          {fragment.title}
                        </h3>
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

                    <p className="font-sans text-[13.5px] dark:text-zinc-500 text-stone-400 leading-relaxed italic">
                      {fragment.preview}
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
                          <div className="pt-5 mt-5 border-t border-surface-4/30 space-y-4">
                            {fragment.body.map((paragraph, j) => (
                              <motion.p
                                key={j}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: j * 0.07, duration: 0.4 }}
                                className="font-sans text-[13.5px] dark:text-zinc-400 text-stone-500 leading-[1.85]"
                              >
                                {paragraph}
                              </motion.p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}