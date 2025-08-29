import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { user, isAuthenticated, loading } = useAuth();

  // Show loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to HRMS Dashboard</h1>
        <p className="home-description">
          Manage your human resources efficiently with our comprehensive dashboard.
        </p>
        <div className="home-actions">
          <Link to="/login" className="home-btn primary">
            Login
          </Link>
          <Link to="/register" className="home-btn secondary">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
