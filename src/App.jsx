import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import PitchDeck from './pages/PitchDeck';
import CostCalculator from './pages/CostCalculator';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pitch-deck" element={<PitchDeck />} />
            <Route path="/cost-calculator" element={<CostCalculator />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;