import { ThemeProvider } from './hooks/useTheme';
import Nav from './components/Nav';
import Cursor from './components/Cursor';
import Divider from './components/Divider';
import Hero from './sections/Hero';
import About from './sections/About';
import Pillars from './sections/Pillars';
import Timeline from './sections/Timeline';
import Systems from './sections/Systems';
import Speaking from './sections/Speaking';
import Thinking from './sections/Thinking';
import Contact from './sections/Contact';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface-0 dark:text-zinc-200 text-stone-800 font-sans antialiased">
        <Cursor />
        <Nav />
        <main>
          <Hero />
          <Divider />
          <About />
          <Divider />
          <Pillars />
          <Divider />
          <Timeline />
          <Divider />
          <Systems />
          <Divider />
          <Speaking />
          <Divider />
          <Thinking />
          <Divider />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}