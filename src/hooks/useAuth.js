import { useState, useEffect } from 'react';
import { isLoggedIn, getUser, getAccessToken, clearUserData } from '../utils/localStorage';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const loggedIn = isLoggedIn();
      const userData = getUser();
      const token = getAccessToken();

      if (loggedIn && userData && token) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        // Clear any invalid data
        clearUserData();
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUser(null);
      setIsAuthenticated(false);
      clearUserData();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      clearUserData();
      setUser(null);
      setIsAuthenticated(false);
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      return false;
    }
  };

  const refreshAuth = () => {
    checkAuthStatus();
  };

  return {
    user,
    isAuthenticated,
    loading,
    logout,
    refreshAuth,
    checkAuthStatus
  };
};
