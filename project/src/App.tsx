import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import AIIntegration from './components/AIIntegration';
import Analytics from './components/Analytics';
import Pricing from './components/Pricing';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <AIIntegration />
        <Analytics />
        <Pricing />
      </main>
    </div>
  );
}

export default App;