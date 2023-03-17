import logger from "../utils/logger";
import { API } from "./AxiosInstance";

export async function register(formData) {
  try {
    const res = await API.post("/auth/register", formData);
    return res;
  } catch (err) {
    logger.error(err);
  }
}
export async function login(userData) {
  try {
    const res = await API.post("/auth/login", userData);
    return res;
  } catch (err) {
    logger.error(err);
  }
}
export async function verifyOTP(data) {
  try {
    const res = await API.post("/auth/verify/", data);
    logger.log(res)
    return res;
  } catch (err) {
    logger.error(err);
  }
}
export async function updatePassword(data) {
  try {
    const res = await API.patch("/auth/update/password", data);
    return res;
  } catch (err) {
    logger.error(err);
  }
}
export async function getComapanies(mobile) {
  try {
    const res = await API.get(`/auth/company/${mobile}`);
    return res;
  } catch (err) {
    logger.error(err);
  }
}
export async function resendOTP(data) {
  try {
    const res = await API.post("/auth/send", data);
    return res;
  } catch (err) {
    logger.error(err);
    return err;
  }
}
export async function getUser(data) {
  try {
    const res = await API.post("/auth/user", data);
    return res;
  } catch (err) {
    logger.error(err);
  }
}
export async function getUserOTP(userId) {
  try {
    const res = await API.get(`/auth/user/${userId}`);
    return res;
  } catch (err) {
    logger.error(err);
    return err;
  }
}
