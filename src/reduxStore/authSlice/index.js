import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("userData")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  isAuthenticated:
    !!localStorage.getItem("accessToken") && !!localStorage.getItem("userData"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = true;

      if (user && accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userData", JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
    },
  },
});

// Actions
export const { setCredentials, logout } = authSlice.actions;

// Selector
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;

// Reducer
export default authSlice.reducer;
