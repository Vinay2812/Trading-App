import { API } from "./AxiosInstance";

export const getCompanyUserDataById = async (userId, signal) => await API.get(`/user/company/${userId}`, signal);
export const getAllCompanyNames = async (signal) => await API.get("/user/company-names", signal);
export const getUserDataFromNt1AccountMaster = async (accoid) => await API.get(`/user/nt_1_account_master/${accoid}`)