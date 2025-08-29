// LocalStorage utility functions for managing user authentication data

export const localStorageKeys = {
  USER_DATA: 'userData',
  USER: 'user',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  LOGIN_TIME: 'loginTime'
};

// Store complete user data
export const storeUserData = (userData) => {
  try {
    const dataToStore = {
      user: userData.user || userData,
      accessToken: userData.accessToken || userData.token,
      refreshToken: userData.refreshToken,
      loginTime: new Date().toISOString()
    };

    // Store complete user data
    localStorage.setItem(localStorageKeys.USER_DATA, JSON.stringify(dataToStore));

    // Store individual items for easy access
    if (dataToStore.user) {
      localStorage.setItem(localStorageKeys.USER, JSON.stringify(dataToStore.user));
    }
    if (dataToStore.accessToken) {
      localStorage.setItem(localStorageKeys.ACCESS_TOKEN, dataToStore.accessToken);
    }
    if (dataToStore.refreshToken) {
      localStorage.setItem(localStorageKeys.REFRESH_TOKEN, dataToStore.refreshToken);
    }

    return true;
  } catch (error) {
    console.error('Error storing user data:', error);
    return false;
  }
};

// Get complete user data
export const getUserData = () => {
  try {
    const userData = localStorage.getItem(localStorageKeys.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Get user object
export const getUser = () => {
  try {
    const user = localStorage.getItem(localStorageKeys.USER);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// Get access token
export const getAccessToken = () => {
  return localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
};

// Get refresh token
export const getRefreshToken = () => {
  return localStorage.getItem(localStorageKeys.REFRESH_TOKEN);
};

// Check if user is logged in
export const isLoggedIn = () => {
  const userData = getUserData();
  if (!userData || !userData.accessToken) {
    return false;
  }

  // Check if token is expired (optional - you can implement token expiration logic)
  const loginTime = new Date(userData.loginTime);
  const currentTime = new Date();
  const hoursSinceLogin = (currentTime - loginTime) / (1000 * 60 * 60);

  // Token expires after 24 hours (adjust as needed)
  if (hoursSinceLogin > 24) {
    clearUserData();
    return false;
  }

  return true;
};

// Clear all user data
export const clearUserData = () => {
  try {
    localStorage.removeItem(localStorageKeys.USER_DATA);
    localStorage.removeItem(localStorageKeys.USER);
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(localStorageKeys.REFRESH_TOKEN);
    localStorage.removeItem(localStorageKeys.LOGIN_TIME);
    return true;
  } catch (error) {
    console.error('Error clearing user data:', error);
    return false;
  }
};

// Update specific user data
export const updateUserData = (key, value) => {
  try {
    const userData = getUserData();
    if (userData) {
      userData[key] = value;
      localStorage.setItem(localStorageKeys.USER_DATA, JSON.stringify(userData));
      
      // Also update individual item if it exists
      if (key === 'user') {
        localStorage.setItem(localStorageKeys.USER, JSON.stringify(value));
      } else if (key === 'accessToken') {
        localStorage.setItem(localStorageKeys.ACCESS_TOKEN, value);
      } else if (key === 'refreshToken') {
        localStorage.setItem(localStorageKeys.REFRESH_TOKEN, value);
      }
      
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating user data:', error);
    return false;
  }
};
