import { motion, AnimatePresence } from 'framer-motion';

function BrandedCard({ evidence }) {
  return (
    <div
      className="aspect-video rounded-xl flex flex-col items-center justify-center p-8 text-center"
      style={{ background: evidence.gradient }}
    >
      <span className="text-4xl mb-3 drop-shadow-lg">{evidence.icon}</span>
      <span className="text-white/90 font-serif text-xl font-medium mb-1">
        {evidence.brand}
      </span>
      {evidence.tagline && (
        <span className="text-white/50 font-mono text-[10px] uppercase tracking-wider">
          {evidence.tagline}
        </span>
      )}
    </div>
  );
}

function GitHubCard({ evidence }) {
  return (
    <div
      className="aspect-video rounded-xl flex flex-col items-center justify-center p-8 text-center"
      style={{ background: evidence.gradient }}
    >
      <svg className="w-10 h-10 text-white/80 mb-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      <span className="text-white/70 font-mono text-[11px] mb-3">
        {evidence.repo}
      </span>
      <a
        href={`https://github.com/${evidence.repo}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white/90 font-mono text-[11px] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        View on GitHub
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </a>
    </div>
  );
}

export default function EvidenceDrawer({ open, onClose, evidence }) {
  if (!evidence) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[91] w-full sm:w-[420px] bg-surface-1 border-l border-surface-4/60 shadow-2xl dark:shadow-black/60 overflow-y-auto"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent/60" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] dark:text-zinc-500 text-stone-400">
                    Evidence
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-surface-4/50 hover:bg-surface-2/50 transition-colors"
                >
                  <span className="text-sm dark:text-zinc-400 text-stone-500">×</span>
                </button>
              </div>

              <div className="mb-6 rounded-xl overflow-hidden border border-surface-3/60">
                {evidence.type === 'branded' ? (
                  <BrandedCard evidence={evidence} />
                ) : evidence.type === 'github' ? (
                  <GitHubCard evidence={evidence} />
                ) : (
                  <div className="aspect-video bg-surface-2 flex items-center justify-center overflow-hidden">
                    {evidence.placeholder ? (
                      <img
                        src={evidence.placeholder}
                        alt={evidence.caption}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="flex flex-col items-center gap-3 p-6" style={{ display: evidence.placeholder ? 'none' : 'flex' }}>
                      <div className="w-12 h-12 rounded-xl bg-surface-3/60 flex items-center justify-center">
                        <svg className="w-6 h-6 dark:text-zinc-600 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                      <p className="font-mono text-[10px] dark:text-zinc-600 text-stone-400 text-center">
                        Photo placeholder — add to /public/evidence/
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <p className="font-sans text-[15px] dark:text-zinc-300 text-stone-600 leading-relaxed mb-4">
                {evidence.caption}
              </p>

              {evidence.details && (
                <p className="font-sans text-[13px] dark:text-zinc-500 text-stone-400 leading-relaxed">
                  {evidence.details}
                </p>
              )}

              {evidence.type === 'github' && evidence.repo && (
                <a
                  href={`https://github.com/${evidence.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] text-accent hover:text-accent-bright transition-colors"
                >
                  github.com/{evidence.repo}
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function EvidenceTag({ label, evidenceKey, onOpen }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onOpen?.(evidenceKey);
      }}
      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-accent/8 border border-accent/15 hover:bg-accent/15 hover:border-accent/30 transition-all duration-200 group"
    >
      <svg className="w-2.5 h-2.5 text-accent/50 group-hover:text-accent/80 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
      <span className="font-mono text-[8px] uppercase tracking-wider text-accent/60 group-hover:text-accent/90 transition-colors">
        {label || 'proof'}
      </span>
    </button>
  );
}
