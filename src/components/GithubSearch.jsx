import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GithubSearch.css';

const GithubSearch = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username) {
            navigate(`/profile/${username}`);
        }
    };

    return (
        <div className='main-container'>
            <h1 className='main-title'>GitHub Profile Finder</h1>
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    name="username"
                    placeholder="Enter Github username..."
                    value={username}
                    className='search-input'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit" className='search-btn'>Search</button>
            </form>
        </div>
    );
};

export default GithubSearch;
