import React, { useState } from 'react';
import './Register.css';
import {Image} from "@heroui/react";
import loginpage from '../assets/images/loginpage.png'
import { userSignup } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');
    
    try {
      const response = await userSignup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('Registration successful! Please login.');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        setTimeout(() => {
          navigate('/login')
        }, 2000);
      } else {
        setErrors({ general: response.data?.message || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error('Registration error:', error);
     
      if (error.response) {
     
        const errorMessage = error.response.data?.message || 'Registration failed. Please try again.';
        setErrors({ general: errorMessage });
      } else if (error.request) {
       
        setErrors({ general: 'Network error. Please check your connection and try again.' });
      } else {
       
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (errors.general) {
      setErrors(prev => ({
        ...prev,
        general: ''
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="login-container">
      {/* Logo Header */}
      <div className="logo-header">
        <div className="logo">
          <div className="logo-icon"></div>
          <span className="logo-text">LOGO</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-wrapper">
          <div className="login-card">
            <div className="card-content">
              {/* Left Side - Purple Section */}
              <div className="left-section">
                {/* Dashboard Preview Image */}
                <div className="dashboard-preview">
                  <div className="preview-container">
                    <Image
                      src={loginpage}
                      alt="Dashboard Preview"
                      width={400}
                      height={300}
                      className="preview-image"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="text-content">
                  <h2 className="main-heading">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  </h2>
                  <p className="description">
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>

                  {/* Navigation Dots */}
                  <div className="navigation-dots">
                    <div className="dot dot-active"></div>
                    <div className="dot dot-inactive"></div>
                    <div className="dot dot-inactive"></div>
                  </div>
                </div>
              </div>

              {/* Right Side - Registration Form */}
              <div className="right-section">
                <div className="form-container">
                  <div>
                    <h1 className="welcome-title">Welcome to Dashboard</h1>
                  </div>

                  {/* Success Message */}
                  {successMessage && (
                    <div className="success-message">
                      {successMessage}
                    </div>
                  )}

                  {/* General Error Message */}
                  {errors.general && (
                    <div className="error-message">
                      {errors.general}
                    </div>
                  )}

                  <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Full Name*
                      </label>
                      <input 
                        id="name" 
                        name="name"
                        type="text" 
                        placeholder="Full Name" 
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && <span className="field-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address*
                      </label>
                      <input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="Email Address" 
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="password" className="form-label">
                        Password*
                      </label>
                      <div className="password-container">
                        <input 
                          id="password" 
                          name="password"
                          type={showPassword ? "text" : "password"} 
                          placeholder="Password" 
                          className={`form-input ${errors.password ? 'error' : ''}`}
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <button 
                          type="button" 
                          className="password-toggle" 
                          onClick={togglePasswordVisibility}
                          aria-label="Toggle password visibility"
                        >
                          <svg className="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                      </div>
                      {errors.password && <span className="field-error">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password*
                      </label>
                      <div className="password-container">
                        <input 
                          id="confirmPassword" 
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"} 
                          placeholder="Confirm Password" 
                          className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                        <button 
                          type="button" 
                          className="password-toggle" 
                          onClick={toggleConfirmPasswordVisibility}
                          aria-label="Toggle confirm password visibility"
                        >
                          <svg className="eye-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>
                      </div>
                      {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                    </div>

                    <div className="forgot-password">
                      <a href="#" className="forgot-link">
                        Forgot password?
                      </a>
                    </div>

                    <button 
                      type="submit" 
                      className="login-button"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Registering...' : 'Register'}
                    </button>

                    <div className="register-section">
                      <span className="register-text">
                        Already have an account?{" "}
                        <a href="#" className="register-link">
                          Login
                        </a>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Register;
