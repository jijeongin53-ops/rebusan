import React, { useState } from 'react';
import Landing from './components/Landing';
import Test from './components/Test';
import Results from './components/Results';
import SecretPage from './components/SecretPage';
import CuratorGuide from './components/CuratorGuide';
import DataDashboard from './components/DataDashboard';
import './index.css';

// Simple Icons
const DiscoverIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
  </svg>
);

const GuideIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    <polyline points="10 2 10 10 13 7 16 10 16 2"></polyline>
  </svg>
);

function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'test' | 'results' | 'secret' | 'guide' | 'admin'
  const [category, setCategory] = useState(null);

  const goToLanding = () => setView('landing');
  const startTest = () => setView('test');
  const openGuide = () => setView('guide');
  const openAdmin = () => setView('admin');

  const handleTestComplete = (cat) => {
    setCategory(cat);
    setView('results');
  };

  const handleOrderComplete = () => {
    setView('secret');
  };

  return (
    <div className="app-layout">
      {/* Global Header */}
      <header className="app-header">
        <div className="app-logo">ReBusan</div>
        <div className="lang-toggle">
          <button className="active">EN</button>
          <button>JA</button>
          <button>CH</button>
        </div>
      </header>

      {/* Main View Area */}
      <main className="main-content">
        {view === 'landing' && (
          <Landing
            onStartTest={startTest}
            onOpenGuide={openGuide}
            onOpenAdmin={openAdmin}
          />
        )}
        {view === 'test' && <Test onComplete={handleTestComplete} onBack={goToLanding} />}
        {view === 'results' && <Results category={category} onOrderComplete={handleOrderComplete} onRetake={startTest} />}
        {view === 'secret' && <SecretPage category={category} onExplore={openGuide} />}
        {view === 'guide' && <CuratorGuide onBack={goToLanding} />}
        {view === 'admin' && <DataDashboard onBack={goToLanding} />}
      </main>

      {/* Global Footer Navigation */}
      <footer className="app-footer">
        <button 
          className={`footer-nav-item ${['landing', 'test', 'results', 'secret'].includes(view) ? 'active' : ''}`}
          onClick={goToLanding}
        >
          <DiscoverIcon />
          Discover
        </button>
        <button 
          className={`footer-nav-item ${view === 'guide' ? 'active' : ''}`}
          onClick={openGuide}
        >
          <GuideIcon />
          Guide
        </button>
      </footer>
    </div>
  );
}

export default App;
