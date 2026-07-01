import { useState, useCallback, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ThemeProvider } from './hooks/useTheme';
import { SoundProvider } from './components/SoundManager';
import Nav from './components/Nav';
import Cursor from './components/Cursor';
import Divider from './components/Divider';
import CommandPalette from './components/CommandPalette';
import MobileNav from './components/MobileNav';
import EvidenceDrawer from './components/EvidenceDrawer';
import AIChatbot from './components/AIChatbot';
import EasterEggs from './components/EasterEggs';
import BookView from './components/BookView';
import PresentationViewer from './components/PresentationViewer';
import PersonaBanner from './components/PersonaBanner';
import { usePersona } from './context/PersonaContext';
import Hero from './sections/Hero';
import CaseStudy from './sections/CaseStudy';
import About from './sections/About';
import Timeline from './sections/Timeline';
import Systems from './sections/Systems';
import Speaking from './sections/Speaking';
import Thinking from './sections/Thinking';
import Contact from './sections/Contact';
import { evidence as evidenceData } from './data/evidence';

function isMobile() {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

// Lens displacement map: red = horizontal bend, green = vertical bend, neutral (128) centre.
// Edges diverge from 128 so the backdrop refracts inward like a real glass lens (Aave technique).
const GLASS_MAP = 'data:image/svg+xml,' + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='240' height='180'>" +
  "<defs>" +
  "<linearGradient id='rx' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='rgb(255,0,0)'/><stop offset='0.5' stop-color='rgb(128,0,0)'/><stop offset='1' stop-color='rgb(0,0,0)'/></linearGradient>" +
  "<linearGradient id='gy' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='rgb(0,255,0)'/><stop offset='0.5' stop-color='rgb(0,128,0)'/><stop offset='1' stop-color='rgb(0,0,0)'/></linearGradient>" +
  "</defs>" +
  "<rect width='240' height='180' fill='url(#rx)'/>" +
  "<rect width='240' height='180' fill='url(#gy)' style='mix-blend-mode:screen'/>" +
  "</svg>"
);

const SECTION_MAP = {
  about: (openEvidence) => <About key="about" />,
  timeline: (openEvidence) => <Timeline key="timeline" openEvidence={openEvidence} />,
  systems: (openEvidence) => <Systems key="systems" openEvidence={openEvidence} />,
  speaking: (openEvidence) => <Speaking key="speaking" openEvidence={openEvidence} />,
  writing: (openEvidence) => <Thinking key="writing" />,
};

const DEFAULT_ORDER = ['about', 'timeline', 'systems', 'speaking', 'writing'];

const PATH_ORDERS = {
  solve: ['systems', 'timeline', 'about', 'speaking', 'writing'],
  build: ['writing', 'speaking', 'systems', 'timeline', 'about'],
};

export default function App({ onReady }) {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [activeEvidence, setActiveEvidence] = useState(null);
  const [chosenPath, setChosenPath] = useState(null);
  const [bookMode, setBookMode] = useState(false);
  const { persona } = usePersona();

  useEffect(() => {
    const timer = setTimeout(() => onReady?.(), 800);
    return () => clearTimeout(timer);
  }, [onReady]);

  const handleCommandToggle = useCallback((v) => setCmdOpen(v), []);
  const handleAIToggle = useCallback(() => setAiOpen((p) => !p), []);
  const handleAIClose = useCallback(() => setAiOpen(false), []);

  const openEvidence = useCallback((key) => {
    setActiveEvidence(evidenceData[key] || null);
    setEvidenceOpen(true);
  }, []);

  const handleBookToggle = useCallback((v) => {
    setBookMode(v);
    if (v) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, []);

  useEffect(() => {
    if (bookMode) {
      document.body.style.overflow = 'hidden';
    }
  }, [bookMode]);

  const sectionOrder = useMemo(() => {
    if (persona?.sectionOrder) return persona.sectionOrder;
    if (chosenPath && PATH_ORDERS[chosenPath]) return PATH_ORDERS[chosenPath];
    return DEFAULT_ORDER;
  }, [persona, chosenPath]);

  const renderedSections = useMemo(() => {
    return sectionOrder.map((key, i) => {
      const renderFn = SECTION_MAP[key];
      if (!renderFn) return null;
      return (
        <div key={key}>
          {i > 0 && <Divider />}
          {renderFn(openEvidence)}
        </div>
      );
    });
  }, [sectionOrder, openEvidence]);

  const ogTitle = persona?.ogTitle || 'Kailash Sharma — Product Builder, AI Systems, Zero-to-One';
  const ogDesc = persona?.ogDescription || "SDE at India's largest matrimony platform · AI Architect · 2x Google Top 100 globally · Speaker at 10+ conferences";

  return (
    <ThemeProvider>
      <SoundProvider>
        <Helmet>
          <title>{ogTitle}</title>
          <meta property="og:title" content={ogTitle} />
          <meta property="og:description" content={ogDesc} />
          <meta name="twitter:title" content={ogTitle} />
          <meta name="twitter:description" content={ogDesc} />
        </Helmet>
        <div className="min-h-screen bg-surface-0 dark:text-zinc-200 text-stone-800 font-sans antialiased">
          {/* Global liquid-glass (Aave method): a lens displacement map — R/G channels bend
              content horizontally/vertically, neutral (128) in the centre so edges refract inward. */}
          <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
            <filter id="liquid" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feImage href={GLASS_MAP} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="m" />
              <feGaussianBlur in="m" stdDeviation="0.6" result="mb" />
              <feDisplacementMap in="SourceGraphic" in2="mb" scale="16" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="liquid-panel" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feImage href={GLASS_MAP} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="m" />
              <feGaussianBlur in="m" stdDeviation="0.8" result="mb" />
              <feDisplacementMap in="SourceGraphic" in2="mb" scale="10" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>
          <EasterEggs />
          <Nav
            onCommandOpen={handleCommandToggle}
            onAIToggle={handleAIToggle}
            onBookToggle={isMobile() ? handleBookToggle : undefined}
            bookMode={bookMode}
          />
          <PersonaBanner />
          <CommandPalette open={cmdOpen} onClose={handleCommandToggle} />
          <MobileNav onCommandOpen={handleCommandToggle} />

          <main>
            <Hero onPathChoose={setChosenPath} chosenPath={chosenPath} />
            <CaseStudy />
            <PresentationViewer />
            <Divider />
            {renderedSections}
            <Divider />
            <Contact />
          </main>

          <EvidenceDrawer
            open={evidenceOpen}
            onClose={() => setEvidenceOpen(false)}
            evidence={activeEvidence}
          />
          <AIChatbot open={aiOpen} onClose={handleAIClose} />

          <AnimatePresence>
            {bookMode && (
              <BookView
                onClose={() => handleBookToggle(false)}
                onAIToggle={handleAIToggle}
              />
            )}
          </AnimatePresence>
        </div>
      </SoundProvider>
    </ThemeProvider>
  );
}
