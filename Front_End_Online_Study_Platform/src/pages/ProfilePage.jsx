import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/ProfilePage.css";
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';

const ProfilePage = ({ email }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate(); 

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log('Email from URL:', email);

    if (!email) {
      setError('No email found.');
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://version-app-lac.vercel.app/user/getUser', {
          params: { email: email }
        });
        console.log('User data received:', response.data);
        setUserData(response.data.user);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching user data.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [location, email]);

  const handleLogout = () => {
    window.location.href = "https://landingpage-blush-ten.vercel.app/";
    window.location.reload(); // Ensures a full reload of the target page
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      <Navbar  />
      <div className="profile-container">
        <h1 className="profile-title">User Profile</h1>
        {userData ? (
          <div className="profile-card">
            <div className="profile-header">
              <h2>{userData.name}</h2>
              <p>{userData.email}</p>
            </div>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-title">Account Created On:</span>
                <span>{new Date(userData.dateAccCreated).toLocaleDateString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Active:</span>
                <span>{userData.isActive ? 'Yes' : 'No'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Streak:</span>
                <span>{userData.streak}</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Points:</span>
                <span>{userData.points}</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Questions Solved:</span>
                <span>{userData.numQuestionsSolved}</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Articles Contributed:</span>
                <span>{userData.numArticlesContributed}</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Active Days:</span>
                <span>{userData.activeDays}</span>
              </div>
              <div className="stat-item">
                <span className="stat-title">Last Solved Date:</span>
                <span>{userData.lastSolvedDate ? new Date(userData.lastSolvedDate).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <p>No user data found.</p>  
        )}
      </div>
    </>
  );
};

export default ProfilePage;
