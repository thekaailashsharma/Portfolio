import React from 'react';
import ReactDOM from 'react-dom/client';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import App from './App';

inject();
injectSpeedInsights();

function dismissSplash() {
  const splash = document.getElementById('splash');
  if (splash) {
    splash.classList.add('fade-out');
    setTimeout(() => splash.remove(), 600);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App onReady={dismissSplash} />
  </React.StrictMode>
);
