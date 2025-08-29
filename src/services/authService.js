import axios from "axios";

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



