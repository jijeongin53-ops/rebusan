import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Landing from './components/Landing';
import Test from './components/Test';
import Results from './components/Results';
import SecretPage from './components/SecretPage';
import CuratorGuide from './components/CuratorGuide';
import DataDashboard from './components/DataDashboard';
import './index.css';

function App() {
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  const goToLanding = () => navigate('/');
  const startTest = () => navigate('/test');
  const openGuide = () => navigate('/guide');
  const openDashboard = () => navigate('/admin');

  const handleTestComplete = (cat) => {
    setCategory(cat);
    navigate('/results');
  };

  const handleOrderComplete = () => {
    navigate('/secret');
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <Landing
            onStartTest={startTest}
            onOpenGuide={openGuide}
            onOpenAdmin={openDashboard}
          />
        } />
        <Route path="/test" element={<Test onComplete={handleTestComplete} />} />
        
        <Route path="/results" element={
          category ? (
            <Results category={category} onOrderComplete={handleOrderComplete} />
          ) : (
            <Navigate to="/" replace />
          )
        } />
        
        <Route path="/secret" element={
          category ? (
            <SecretPage category={category} />
          ) : (
            <Navigate to="/" replace />
          )
        } />
        
        <Route path="/guide" element={<CuratorGuide onBack={goToLanding} />} />
        <Route path="/admin" element={<DataDashboard onBack={goToLanding} />} />
        
        {/* Catch all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
