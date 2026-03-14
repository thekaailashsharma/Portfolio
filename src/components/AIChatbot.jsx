import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_PROMPT, SUGGESTED_QUESTIONS } from '../data/knowledge';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export default function AIChatbot({ open, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && open) onClose?.();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

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
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-[91] w-[calc(100vw-2rem)] sm:w-[500px] max-h-[80vh] flex flex-col overflow-hidden rounded-2xl border"
            style={{
              backgroundColor: 'var(--surface-1)',
              borderColor: 'var(--surface-4)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
            }}
          >
            <div className="px-5 py-4 border-b shrink-0 flex items-center justify-between" style={{ borderColor: 'var(--surface-3)' }}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-accent text-sm font-bold">✦</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                    Ask about Kailash
                  </span>
                </div>
                <p className="font-sans text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  Powered by AI · Based on real information
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-surface-4/50 hover:bg-surface-2/50 transition-colors"
              >
                <span style={{ color: 'var(--text-muted)' }}>×</span>
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-[200px]">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="font-sans text-[12px] mb-3" style={{ color: 'var(--text-muted)' }}>
                    Try asking:
                  </p>
                  {SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="block w-full text-left px-3 py-2 rounded-lg border transition-all duration-200 hover:border-accent/30"
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
                    <p className="font-sans text-[13px] leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
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
                  ref={inputRef}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
