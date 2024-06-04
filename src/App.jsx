import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Bookshelf from './Bookshelf';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mybookshelf" element={<Bookshelf />} />
      </Routes>
    </Router>
  );
}

export default App;
