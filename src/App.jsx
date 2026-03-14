import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
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
import Hero from './sections/Hero';
import About from './sections/About';
import Timeline from './sections/Timeline';
import Systems from './sections/Systems';
import Speaking from './sections/Speaking';
import Thinking from './sections/Thinking';
import Contact from './sections/Contact';
import { evidence as evidenceData } from './data/evidence';

export default function App() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [activeEvidence, setActiveEvidence] = useState(null);
  const [chosenPath, setChosenPath] = useState(null);
  const [bookMode, setBookMode] = useState(false);

  const handleCommandToggle = useCallback((v) => setCmdOpen(v), []);

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

  const solveSections = (
    <>
      <Systems openEvidence={openEvidence} />
      <Divider />
      <Timeline openEvidence={openEvidence} />
      <Divider />
      <About />
      <Divider />
      <Speaking openEvidence={openEvidence} />
      <Divider />
      <Thinking />
    </>
  );

  const buildSections = (
    <>
      <Thinking />
      <Divider />
      <Speaking openEvidence={openEvidence} />
      <Divider />
      <Systems openEvidence={openEvidence} />
      <Divider />
      <Timeline openEvidence={openEvidence} />
      <Divider />
      <About />
    </>
  );

  const defaultSections = (
    <>
      <About />
      <Divider />
      <Timeline openEvidence={openEvidence} />
      <Divider />
      <Systems openEvidence={openEvidence} />
      <Divider />
      <Speaking openEvidence={openEvidence} />
      <Divider />
      <Thinking />
    </>
  );

  const renderSections = () => {
    if (chosenPath === 'solve') return solveSections;
    if (chosenPath === 'build') return buildSections;
    return defaultSections;
  };

  return (
    <ThemeProvider>
      <SoundProvider>
        <div className="min-h-screen bg-surface-0 dark:text-zinc-200 text-stone-800 font-sans antialiased">
          <EasterEggs />
          <Cursor />
          <Nav onCommandOpen={handleCommandToggle} />
          <CommandPalette open={cmdOpen} onClose={handleCommandToggle} />
          <MobileNav
            onCommandOpen={handleCommandToggle}
            onBookToggle={handleBookToggle}
            bookMode={bookMode}
          />

          <main>
            <Hero onPathChoose={setChosenPath} chosenPath={chosenPath} />
            <Divider />
            {renderSections()}
            <Divider />
            <Contact />
          </main>

          <EvidenceDrawer
            open={evidenceOpen}
            onClose={() => setEvidenceOpen(false)}
            evidence={activeEvidence}
          />
          <AIChatbot />

          <AnimatePresence>
            {bookMode && (
              <BookView onClose={() => handleBookToggle(false)} />
            )}
          </AnimatePresence>
        </div>
      </SoundProvider>
    </ThemeProvider>
  );
}
