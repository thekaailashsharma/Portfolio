import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT, SUGGESTED_QUESTIONS } from '../data/knowledge';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
          { role: 'model', parts: [{ text: "I understand. I'll answer questions about Kailash based on the provided information." }] },
          ...history,
          { role: 'user', parts: [{ text: userMsg }] },
        ],
      });

      const reply = response.text || "Sorry, I couldn't process that. Try asking something else!";
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      console.error('Chatbot error:', err);
      setMessages((prev) => [...prev, { role: 'assistant', text: "Something went wrong. Try again in a moment." }]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* FAB — positioned above mobile pill nav, visible in both themes */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3, type: 'spring', stiffness: 200 }}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close chat' : 'Ask AI about Kailash'}
        className="fixed z-[70] w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 right-4 md:right-8 bottom-[5.5rem] md:bottom-8"
        style={{
          backgroundColor: open ? 'var(--surface-2)' : 'var(--accent)',
          border: open ? '1px solid var(--surface-4)' : '2px solid var(--accent-bright)',
          boxShadow: open
            ? 'none'
            : '0 4px 20px rgba(200,168,124,0.35), 0 0 0 4px rgba(200,168,124,0.1)',
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="text-lg"
              style={{ color: 'var(--text-muted)' }}
            >
              ×
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="text-lg font-bold"
              style={{ color: 'var(--surface-0)' }}
            >
              ✦
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring on first appearance */}
        {!open && (
          <motion.span
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ repeat: 3, duration: 1.5, delay: 3.2 }}
            className="absolute inset-0 rounded-2xl"
            style={{ border: '2px solid var(--accent)' }}
          />
        )}
      </motion.button>

      {/* Chat panel — full width on mobile, side panel on desktop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="fixed z-[69] right-4 md:right-8 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[65vh] md:max-h-[70vh] bottom-[8.5rem] md:bottom-24 flex flex-col overflow-hidden rounded-2xl border"
            style={{
              backgroundColor: 'var(--surface-1)',
              borderColor: 'var(--surface-4)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            <div className="px-5 py-4 border-b shrink-0" style={{ borderColor: 'var(--surface-3)' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  Ask about Kailash
                </span>
              </div>
              <p className="font-sans text-[11px]" style={{ color: 'var(--text-muted)' }}>
                Powered by AI · Based on real information
              </p>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-[180px]">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="font-sans text-[12px] mb-3" style={{ color: 'var(--text-muted)' }}>
                    Try asking:
                  </p>
                  {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="block w-full text-left px-3 py-2 rounded-lg border transition-all duration-200"
                      style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--surface-3)', color: 'var(--text-secondary)' }}
                    >
                      <span className="font-sans text-[12px]">{q}</span>
                    </button>
                  ))}
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl border ${
                      msg.role === 'user' ? 'rounded-br-md' : 'rounded-bl-md'
                    }`}
                    style={{
                      backgroundColor: msg.role === 'user' ? 'rgba(200,168,124,0.12)' : 'var(--surface-2)',
                      borderColor: msg.role === 'user' ? 'rgba(200,168,124,0.2)' : 'var(--surface-3)',
                    }}
                  >
                    <p className="font-sans text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md border" style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--surface-3)' }}>
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: 'var(--accent)' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t shrink-0" style={{ borderColor: 'var(--surface-3)' }}>
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask anything about Kailash..."
                  className="flex-1 rounded-xl px-4 py-2.5 font-sans text-[13px] outline-none transition-colors border"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    borderColor: 'var(--surface-3)',
                    color: 'var(--text-primary)',
                  }}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border disabled:opacity-30 transition-all"
                  style={{ backgroundColor: 'rgba(200,168,124,0.12)', borderColor: 'rgba(200,168,124,0.25)' }}
                >
                  <svg className="w-4 h-4" style={{ color: 'var(--accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
