
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-info mb-4" style={{ fontFamily: 'Segoe UI, Arial, sans-serif', fontSize: '1.1rem' }}>
          <NavLink className="navbar-brand d-flex align-items-center" to="/" style={{ color: '#222', fontWeight: 700, fontSize: '1.3rem' }}>
            OctoFit Tracker
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><NavLink className="nav-link" to="/activities" style={{ color: '#222' }}>Activities</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/leaderboard" style={{ color: '#222' }}>Leaderboard</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/teams" style={{ color: '#222' }}>Teams</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/users" style={{ color: '#222' }}>Users</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/workouts" style={{ color: '#222' }}>Workouts</NavLink></li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
