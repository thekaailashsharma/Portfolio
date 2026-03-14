import { useEffect } from 'react';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

const ASCII_ART = `
%c
    ╔═══════════════════════════════════════════════╗
    ║                                               ║
    ║   Hey, you're looking at the source.          ║
    ║   That's how I got my first job too.          ║
    ║                                               ║
    ║   — Kailash Sharma                            ║
    ║     kailashps.1011@gmail.com                  ║
    ║     github.com/thekaailashsharma              ║
    ║                                               ║
    ║   Built with React, Framer Motion,            ║
    ║   too much coffee, and intention.             ║
    ║                                               ║
    ╚═══════════════════════════════════════════════╝
`;

const SCROLL_MESSAGES = [
  { threshold: 0.1, message: '%c👋 Still scrolling? The good stuff is coming.' },
  { threshold: 0.4, message: '%c⚡ You\'re halfway through. Most people bounce by now. Not you.' },
  { threshold: 0.7, message: '%c🔥 You\'ve read more of this site than most recruiters. Respect.' },
  { threshold: 0.95, message: '%c✨ You made it to the end. Seriously, let\'s talk: kailashps.1011@gmail.com' },
];

export default function EasterEggs() {
  useEffect(() => {
    console.log(ASCII_ART, 'color: #c8a87c; font-family: monospace; font-size: 11px;');

    let konamiIndex = 0;
    const handleKonami = (e) => {
      if (e.key === KONAMI[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === KONAMI.length) {
          konamiIndex = 0;
          triggerKonami();
        }
      } else {
        konamiIndex = 0;
      }
    };

    const triggerKonami = () => {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.9);transition:opacity 0.3s;';
      overlay.innerHTML = `
        <div style="text-align:center;font-family:monospace;color:#c8a87c;max-width:400px;padding:2rem;">
          <p style="font-size:3rem;margin-bottom:1rem;">🎮</p>
          <p style="font-size:1.1rem;margin-bottom:0.5rem;">You found the Konami Code!</p>
          <p style="font-size:0.8rem;color:#71717a;line-height:1.6;">
            "A human who loves nature and poetry"<br/>
            Sometimes the best code is the code<br/>
            that makes someone smile.
          </p>
          <p style="font-size:0.7rem;color:#3f3f46;margin-top:1.5rem;">Click anywhere to close</p>
        </div>
      `;
      overlay.onclick = () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
      };
      document.body.appendChild(overlay);
      requestAnimationFrame(() => { overlay.style.opacity = '1'; });
    };

    const logged = new Set();
    const handleScroll = () => {
      const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      SCROLL_MESSAGES.forEach(({ threshold, message }) => {
        if (progress >= threshold && !logged.has(threshold)) {
          logged.add(threshold);
          console.log(message, 'color: #c8a87c; font-size: 12px;');
        }
      });
    };

    window.addEventListener('keydown', handleKonami);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKonami);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
