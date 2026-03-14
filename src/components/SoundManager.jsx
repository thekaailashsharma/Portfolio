import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const SoundContext = createContext({ enabled: false, toggle: () => {}, play: () => {} });

const createOscillator = (ctx, freq, duration, volume = 0.03) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = freq;
  osc.type = 'sine';
  gain.gain.value = 0;
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
};

const createPageTurn = (ctx) => {
  const bufferSize = ctx.sampleRate * 0.12;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const t = i / bufferSize;
    const envelope = Math.sin(t * Math.PI) * (1 - t * 0.6);
    data[i] = (Math.random() * 2 - 1) * envelope;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = 2200;
  bandpass.Q.value = 0.8;

  const gain = ctx.createGain();
  gain.gain.value = 0.07;

  source.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(ctx.destination);
  source.start(ctx.currentTime);
};

const sounds = {
  click: (ctx) => createOscillator(ctx, 800, 0.08, 0.02),
  hover: (ctx) => createOscillator(ctx, 600, 0.05, 0.01),
  open: (ctx) => {
    createOscillator(ctx, 440, 0.1, 0.02);
    setTimeout(() => createOscillator(ctx, 660, 0.1, 0.02), 60);
  },
  close: (ctx) => {
    createOscillator(ctx, 660, 0.1, 0.02);
    setTimeout(() => createOscillator(ctx, 440, 0.1, 0.02), 60);
  },
  section: (ctx) => createOscillator(ctx, 520, 0.15, 0.015),
  pageTurn: (ctx) => createPageTurn(ctx),
};

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(false);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    if (enabled && !ctx) {
      setCtx(new (window.AudioContext || window.webkitAudioContext)());
    }
  }, [enabled, ctx]);

  const toggle = useCallback(() => setEnabled((p) => !p), []);

  const play = useCallback((name) => {
    if (!enabled || !ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    sounds[name]?.(ctx);
  }, [enabled, ctx]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, play }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
