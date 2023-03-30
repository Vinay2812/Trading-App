import logger from "../utils/logger";
import { API } from "./AxiosInstance";
import {
  handleResponseError,
  handleResponseSuccess,
} from "./handleServerResponse";

export const adminLogin = async (loginData) => {
  try {
    const res = await API.post("/admin/login", loginData);
    return handleResponseSuccess(res, "Login successful");
  } catch (err) {
    return handleResponseError(err);
  }
};

export const getRegistrationListUsers = async () => {
  try {
    const res = await API.get("/admin/registration-list/users");
    return handleResponseSuccess(res);
  } catch (err) {
    return handleResponseError(err);
  }
};
export const updateAuthorization = async (userId, data) => {
  try {
    const res = await API.patch(
      `/admin/registration-list/user/${userId}/authorization`,
      data
    );
    return handleResponseSuccess(res, "Authorization updated successfully");
  } catch (err) {
    return handleResponseError(err);
  }
};
export const addUser = async (userId) => {
  try {
    const res = await API.post(`/admin/registration-list/${userId}/add`);
    return handleResponseSuccess(res, "User added successfully");
  } catch (err) {
    return handleResponseError(err);
  }
};
export const mapClient = async (mapData) => {
  try {
    const res = await API.put("/admin/registration-list/map", mapData);
    return handleResponseSuccess(res, "Client mapped successfully");
  } catch (err) {
    logger.error("/admin/map " + err);
    alert("Failed to map client");
  }
};
export async function getTenderBalances(signal) {
  try {
    const res = await API.get("/admin/publish-list/tenderbalances", signal);
    return handleResponseSuccess(res);
  } catch (err) {
    logger.error("/admin/tenderbalances " + err);
  }
}
export const postDailyPublish = async (data) => {
  try {
    const res = await API.post("/admin/publish-list/dailypublish", data);
    return handleResponseSuccess(res, "Trade published successfully");
  } catch (err) {
    return handleResponseError(err);
  }
};
export const getDailyBalance = async (signal) => {
  try {
    const res = await API.get("/admin/published-list/dailybalance", signal);
    return handleResponseSuccess(res);
  } catch (err) {
    return handleResponseError(err);
  }
};

export const updateSingleTrade = async (data) => {
  try {
    const res = await API.patch("/admin/published-list/trade/status", data);
    return handleResponseSuccess(res, "Trade updated successfully");
  } catch (err) {
    return handleResponseError(err);
  }
};

export const updateAllTrade = async (data) => {
  try {
    const res = await API.patch("/admin/published-list/trade/status/all", data);
    return handleResponseSuccess(res, "All trades updated successfully");
  } catch (err) {
    return handleResponseError(err);
  }
};

export const stopSingleTrade = async (data) => {
  try {
    const res = await API.patch("/admin/trade/stop", data);
    if (res.data.status === "success") {
      alert("Trade stopped successfully");
      return res.data.data;
    }
    return null;
  } catch (err) {
    return handleResponseError(err);
  }
};
export const stopAllTrade = async () => {
  try {
    const res = await API.patch("/admin/trade/stop/all");
    logger.log("/admin/trade/stop/all");
    alert("All trades stopped successfully");
    return res;
  } catch (err) {
    logger.error("/admin/trade/stop/all " + err);
    alert("Failed to stop all trades");
  }
};
export const startSingleTrade = async (data) => {
  try {
    const res = await API.patch("/admin/trade/start", data);
    logger.log("/admin/trade/start");
    alert("Trade started successfully");
    return res;
  } catch (err) {
    logger.error("/admin/trade/start " + err);
    alert("Failed to start trade");
  }
};
export const startAllTrade = async () => {
  try {
    const res = await API.patch("/admin/trade/start/all");
    logger.log("/admin/trade/start/all");
    alert("All trades started successfully");
    return res;
  } catch (err) {
    logger.error("/admin/trade/start/all " + err);
    alert("Failed to start all trades");
  }
};

export const updateSingleSaleRate = async (data) => {
  try {
    const res = await API.patch("/admin/published-list/trade/sale_rate", data);
    return handleResponseSuccess(res, "Sale rate updated successfully");
  } catch (err) {
    return handleResponseError(err);
  }
};
export const updateAllSaleRate = async (data) => {
  try {
    const res = await API.patch("/admin/published-list/sale_rate/all", data);
    return handleResponseSuccess(res, "All sale rates updated successfully");
  } catch (err) {
    return handleResponseError(err);
  }
};
export const modifySingleTrade = async (data) => {
  try {
    const res = await API.patch("/admin/published-list/trade/update", data);
    return handleResponseSuccess(res, "Modified trade successfully");
  } catch (err) {
    return handleResponseError(err);
  }
};
