import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { PersonaProvider } from './context/PersonaContext';
import App from './App';

function dismissSplash() {
  const splash = document.getElementById('splash');
  if (splash) {
    splash.classList.add('fade-out');
    setTimeout(() => splash.remove(), 600);
  }
}

function Root() {
  return (
    <PersonaProvider>
      <App onReady={dismissSplash} />
    </PersonaProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/for/:slug" element={<Root />} />
        </Routes>
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
