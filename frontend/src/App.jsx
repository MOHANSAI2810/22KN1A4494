import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Shorten from './Shorten';
import Stats from './Stats';
import './App.css';
const App = () => {
  return (
    <Router>
      <div className="container">
        <h2 className="title">🔗 Smart URL Shortener</h2>
        <nav className="nav">
          <Link to="/">Shorten URL</Link>
          <Link to="/stats">History</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Shorten />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
