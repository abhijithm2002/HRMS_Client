import axios from "axios";
import CONSTANTS_COMMON from "../Constants/Common";
import Api, {authInstance} from '../Api/axiosInstance';

export const userSignup = async(userData) => {
    console.log('userDataaaaa', userData)
    const response = await authInstance.post(`/api/auth/userSignup`, userData);
   return response
}

export const userLogin = async(userData) => {
    const response = await authInstance.post(`/api/auth/userLogin`, userData);
    return response;
}


export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token found");

    const res = await axios.post(`${CONSTANTS_COMMON.API_BASE_URL}/api/auth/refresh-token`, {
      refreshToken,
    });

    const newAccessToken = res.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);

    return { accessToken: newAccessToken };
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};
