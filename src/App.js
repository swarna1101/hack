import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar'; // Adjust the path based on your file structure
// Import your page components
import HomePage from './pages/HomePage';
import NPV from './pages/NPV';
import EMI from './pages/EMI';
import FinancialPlan from './pages/FinancialPlan';

function App() {
  return (
    <Router>
      <div>
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<HomePage />} />
          <Route path="/npv" element={<NPV />} />
          <Route path="/emi" element={<EMI />} />
          <Route path="/financial-plan" element={<FinancialPlan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
