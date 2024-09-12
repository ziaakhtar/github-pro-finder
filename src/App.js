import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import GithubSearch from './components/GithubSearch';
import Profile from './components/Profile';
import './App.css';
function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<GithubSearch />} />
                    <Route path="/profile/:username" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
