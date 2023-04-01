import logger from "../utils/logger";
import { API } from "./AxiosInstance";

export async function getCompanyUserDataById(userId, signal) {
  try {
    const res = await API.get(`/user/company/${userId}`, signal);
    return res;
  } catch (err) {
    logger.error(err);
  }
}
export async function getAllCompanyNames(signal) {
  try {
    const res = await API.get("/user/company-names", signal);
    return res;
  } catch (err) {
    logger.error(err);
  }
}
export async function getUserDataFromNt1AccountMaster(accoid) {
  try {
    const res = await API.get(`/user/nt_1_account_master/${accoid}`);
    return res;
  } catch (err) {
    logger.error(err);
  }
}
