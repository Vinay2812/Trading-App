import logger from "../utils/logger";
import { API } from "./AxiosInstance";

export const adminLogin = async (loginData) => {
  try {
    const res = await API.post("/admin/login", loginData);
    logger.log("/admin/login");
    return res;
  } catch (err) {
    logger.error("/admin/login " + err);
  }
};

export const getUsers = async () => {
  try {
    const res = await API.get("/admin/users");
    logger.log("/admin/users");
    return res;
  } catch (err) {
    logger.error("/admin/users " + err);
  }
};
export const updateAuthorization = async (userId, data) => {
  try {
    const res = await API.patch(`/admin/user/${userId}/authorization`, data);
    logger.log(`/admin/user/${userId}/authorization`);
    return res;
  } catch (err) {
    logger.error(`/admin/user/${userId}/authorization ` + err);
  }
};
export const addUser = async (userId) => {
  try {
    const res = await API.get(`/admin/user/${userId}/add`);
    logger.log(`/admin/user/${userId}/add`);
    return res;
  } catch (err) {
    logger.error(`/admin/user/${userId}/add ` + err);
  }
};
export const mapClient = async (mapData) => {
  try {
    const res = await API.put("/admin/map", mapData);
    logger.log("/admin/map");
    return res;
  } catch (err) {
    logger.error("/admin/map " + err);
  }
};
export async function getTenderBalances(signal) {
  try {
    const res = await API.get("/admin/tenderbalances", signal);
    logger.log("/admin/tenderbalances");
    return res;
  } catch (err) {
    logger.error("/admin/tenderbalances " + err);
  }
}
export const insertIntoTrDailyPublish = async (data) => {
  try {
    const res = await API.post("/admin/trDailyPublish", data);
    logger.log("/admin/trDailyPublish");
    return res;
  } catch (err) {
    logger.error("/admin/trDailyPublish " + err);
  }
};
export const getQryTrDailyBalance = async (signal) => {
  try {
    const res = await API.get("/admin/qrytrdailybalance", signal);
    logger.log("/admin/qrytrdailybalance");
    return res;
  } catch (err) {
    logger.error("/admin/qrytrdailybalance " + err);
  }
};
export const stopSingleTrade = async (data) => {
  try {
    const res = await API.patch("/admin/trade/stop", data);
    logger.log("/admin/trade/stop");
    return res;
  } catch (err) {
    logger.error("/admin/trade/stop " + err);
  }
};
export const stopAllTrade = async () => {
  try {
    const res = await API.patch("/admin/trade/stop/all");
    logger.log("/admin/trade/stop/all");
    return res;
  } catch (err) {
    logger.error("/admin/trade/stop/all " + err);
  }
};
export const startSingleTrade = async (data) => {
  try {
    const res = await API.patch("/admin/trade/start", data);
    logger.log("/admin/trade/start");
    return res;
  } catch (err) {
    logger.error("/admin/trade/start " + err);
  }
};
export const startAllTrade = async () => {
  try {
    const res = await API.patch("/admin/trade/start/all");
    logger.log("/admin/trade/start/all");
    return res;
  } catch (err) {
    logger.error("/admin/trade/start/all " + err);
  }
};
export const updateSingleSaleRate = async (data) => {
  try {
    const res = await API.patch("/admin/sale_rate", data);
    logger.log("/admin/sale_rate");
    return res;
  } catch (err) {
    logger.error("/admin/sale_rate " + err);
  }
};
export const updateAllSaleRate = async (data) => {
  try {
    const res = await API.patch("/admin/sale_rate/all", data);
    logger.log("/admin/sale_rate/all");
    return res;
  } catch (err) {
    logger.error("/admin/sale_rate/all " + err);
  }
};
export const modifySingleTrade = async (data) => {
  try {
    const res = await API.patch("/admin/trade/update", data);
    logger.log("/admin/trade/update");
    return res;
  } catch (err) {
    logger.error("/admin/trade/update " + err);
  }
};
