import React, { useState } from 'react';
import Landing from './components/Landing';
import Test from './components/Test';
import Signup from './components/Signup';
import Results from './components/Results';
import SecretPage from './components/SecretPage';
import CuratorGuide from './components/CuratorGuide';
import DataDashboard from './components/DataDashboard';
import { useLanguage } from './LanguageContext';
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
  const { language, setLanguage } = useLanguage();
  
  // URL 파라미터 확인 (공유 링크로 접속한 경우 처리)
  const queryParams = new URLSearchParams(window.location.search);
  const sharedResult = queryParams.get('result');

  const [view, setView] = useState(sharedResult ? 'results' : 'landing'); // 'landing' | 'signup' | 'test' | 'results' | 'secret' | 'guide' | 'admin'
  const [category, setCategory] = useState(sharedResult || null);
  const [email, setEmail] = useState('');

  const goToLanding = () => {
    // URL 파라미터가 있다면 제거하여 깨끗한 상태로 랜딩으로 이동
    if (window.location.search) {
      window.history.pushState({}, '', window.location.pathname);
    }
    setView('landing');
  };
  const startSignup = () => setView('signup');
  const handleSignupComplete = (userEmail) => {
    setEmail(userEmail);
    setView('test');
  };
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
          <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
          <button className={language === 'ja' ? 'active' : ''} onClick={() => setLanguage('ja')}>JA</button>
          <button className={language === 'zh' ? 'active' : ''} onClick={() => setLanguage('zh')}>CH</button>
        </div>
      </header>

      {/* Main View Area */}
      <main className="main-content">
        {view === 'landing' && (
          <Landing
            onStartTest={startSignup}
            onOpenGuide={openGuide}
            onOpenAdmin={openAdmin}
          />
        )}
        {view === 'signup' && <Signup onComplete={handleSignupComplete} />}
        {view === 'test' && <Test onComplete={handleTestComplete} onBack={goToLanding} />}
        {view === 'results' && <Results category={category} email={email} onOrderComplete={handleOrderComplete} onRetake={goToLanding} />}
        {view === 'secret' && <SecretPage category={category} onExplore={openGuide} />}
        {view === 'guide' && <CuratorGuide onBack={goToLanding} />}
        {view === 'admin' && <DataDashboard onBack={goToLanding} />}
      </main>

      {/* Global Footer Navigation */}
      <footer className="app-footer">
        <button 
          className={`footer-nav-item ${['landing', 'signup', 'test', 'results', 'secret'].includes(view) ? 'active' : ''}`}
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
