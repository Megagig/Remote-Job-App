import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FetchJob from './components/FetchJob';
import FetchJobDetails from './components/FetchJobDetails';

const App = () => (
  <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<FetchJob />} />
        <Route path="jobdetails/:id" element={<FetchJobDetails />} />
      </Routes>
    </div>
  </Router>
);

export default App;
