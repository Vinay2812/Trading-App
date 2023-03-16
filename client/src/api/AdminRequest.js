import logger from "../utils/logger";
import { API } from "./AxiosInstance";

export const adminLogin = async (loginData) => {
  try {
    const res = await API.post("/admin/login", loginData);
    logger.log("/admin/login");
    alert("Login successful")
    return res;
  } catch (err) {
    alert("Login failed")
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
    alert("Authorization updated successfully")
    return res;
  } catch (err) {
    logger.error(`/admin/user/${userId}/authorization ` + err);
    alert("Failed to update authorization")
  }
};
export const addUser = async (userId) => {
  try {
    const res = await API.get(`/admin/user/${userId}/add`);
    logger.log(`/admin/user/${userId}/add`);
    alert("User added successfully")
    return res;
  } catch (err) {
    logger.error(`/admin/user/${userId}/add ` + err);
    alert("Failed to add user")
  }
};
export const mapClient = async (mapData) => {
  try {
    const res = await API.put("/admin/map", mapData);
    logger.log("/admin/map");
    alert("Client mapped successfully")
    return res;
  } catch (err) {
    logger.error("/admin/map " + err);
    alert("Failed to map client")
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
    alert("Inserted into tr_daily_publish successfully")
    return res;
  } catch (err) {
    logger.error("/admin/trDailyPublish " + err);
    alert("Failed to insert into tr_daily_publish")
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
    alert("Trade stopped successfully")
    return res;
  } catch (err) {
    alert("Failed to stop trade")
    logger.error("/admin/trade/stop " + err);
  }
};
export const stopAllTrade = async () => {
  try {
    const res = await API.patch("/admin/trade/stop/all");
    logger.log("/admin/trade/stop/all");
    alert("All trades stopped successfully")
    return res;
  } catch (err) {
    logger.error("/admin/trade/stop/all " + err);
    alert("Failed to stop all trades")
  }
};
export const startSingleTrade = async (data) => {
  try {
    const res = await API.patch("/admin/trade/start", data);
    logger.log("/admin/trade/start");
    alert("Trade started successfully")
    return res;
  } catch (err) {
    logger.error("/admin/trade/start " + err);
    alert("Failed to start trade")
  }
};
export const startAllTrade = async () => {
  try {
    const res = await API.patch("/admin/trade/start/all");
    logger.log("/admin/trade/start/all");
    alert("All trades started successfully")
    return res;
  } catch (err) {
    logger.error("/admin/trade/start/all " + err);
    alert("Failed to start all trades")
  }
};
export const updateSingleSaleRate = async (data) => {
  try {
    const res = await API.patch("/admin/sale_rate", data);
    logger.log("/admin/sale_rate");
    alert("Sale rate updated successfully")
    return res;
  } catch (err) {
    alert("Failed to update sale rate")
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
