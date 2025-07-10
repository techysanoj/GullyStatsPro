import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CreateMatch from './components/CreateMatch';
import Home from './components/Home'; // Optional

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-match" element={<CreateMatch />} />
      </Routes>
    </Router>
  );
};

export default App;
