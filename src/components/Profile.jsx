import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import ErrorMessage from './ErrorMessage';

const Profile = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const cachedProfile = localStorage.getItem(username);
            if (cachedProfile) {
                setProfile(JSON.parse(cachedProfile));
                setError(null);
            } else {
                try {
                    const response = await axios.get(`https://api.github.com/users/${username}`);
                    setProfile(response.data);
                    localStorage.setItem(username, JSON.stringify(response.data));
                    setError(null);
                } catch (error) {
                    setProfile(null);
                    setError("User not found. Please check the username and try again.");
                }
            }
        };
        fetchProfile();
    }, [username]);
    const handleBackButtonClick = () => navigate(-1);

    const handleVisitButtonClick = () => {
        window.open(profile?.html_url);
    };


    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        profile && (
            <div className='profile-container'>
            <button className='back-btn' onClick={handleBackButtonClick}>Back</button>
            <div className='profile-content'>
                    <div className='profile-img'>
                        <img src={profile.avatar_url} alt="Avatar" className='profile-avatar'></img>
                    </div>
                    <div className='profile-info'>
                        <h2 className='profile-name'>{profile.name}</h2>
                        <p className='profile-joined'>
                            Joined: {new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p className='profile-bio'>{profile.bio}</p>
                        <div className='container'>
                            <div className='profile-item'>
                                <p>Repos</p>
                                <p>{profile.public_repos}</p>
                            </div>
                            <div className='profile-item'>
                                <p>Followers</p>
                                <p>{profile.followers}</p>
                            </div>
                            <div className='profile-item'>
                                <p>Following</p>
                                <p>{profile.following}</p>
                            </div>
                        </div>
                        <button className='visit-btn' onClick={handleVisitButtonClick}>
                        Visit GitHub Profile
                    </button>
                    </div>
                </div>
            </div>     
        )
    );
};

export default Profile;
