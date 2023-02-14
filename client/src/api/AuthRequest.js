import { API } from "./AxiosInstance";

export const register = async(formData) => await API.post("/auth/register", formData); 
export const login = async(userData) => await API.post("/auth/login", userData);
export const verifyOTP = async(data) => await API.post("/auth/verify/", data);
export const updatePassword = async (data) => await API.patch("/auth/update/password", data);
export const getComapanies = async(mobile) => await API.get(`/auth/company/${mobile}`);
export const resendOTP = async(data) => await API.post("/auth/send", data);
export const getUser = async (data) => await API.post("/auth/user", data);
export const getUserOTP = async (userId) => await API.get(`/auth/user/${userId}`);