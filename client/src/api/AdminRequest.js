import logger from "../utils/logger";
import { API } from "./AxiosInstance";
import {
  handleResponseError,
  handleResponseSuccess,
} from "../utils/handleServerResponse";

export const adminLogin = async (loginData) => {
  try {
    const res = await API.post("/admin/login", loginData);
    return handleResponseSuccess(res);
  } catch (err) {
    return handleResponseError(err);
  }
};

export const getRegistrationListUsers = async (signal) => {
  try {
    const res = await API.get("/admin/registration-list/users", signal);
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
    return handleResponseSuccess(res);
  } catch (err) {
    return handleResponseError(err);
  }
};
export const addUser = async (userId) => {
  try {
    const res = await API.post(`/admin/registration-list/${userId}/add`);
    return handleResponseSuccess(res);
  } catch (err) {
    return handleResponseError(err);
  }
};
export const mapClient = async (mapData) => {
  try {
    const res = await API.put("/admin/registration-list/map", mapData);
    return handleResponseSuccess(res);
  } catch (err) {
    return handleResponseError(err);
  }
};
export async function getTenderBalances(signal) {
  try {
    const res = await API.get("/admin/publish-list/tenderbalances", signal);
    return handleResponseSuccess(res);
  } catch (err) {
    return handleResponseError(err);
  }
}
export const postDailyPublish = async (data) => {
  try {
    const res = await API.post("/admin/publish-list/dailypublish", data);
    return handleResponseSuccess(res);
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
    return handleResponseSuccess(res);
  } catch (err) {
    return handleResponseError(err);
  }
};

export const updateAllTrade = async (data) => {
  try {
    const res = await API.patch("/admin/published-list/trade/status/all", data);
    return handleResponseSuccess(res);
  } catch (err) {
    return handleResponseError(err);
  }
};

export const updateSingleSaleRate = async (data) => {
  try {
    const res = await API.patch("/admin/published-list/trade/sale_rate", data);
    return handleResponseSuccess(res);
  } catch (err) {
    return handleResponseError(err);
  }
};
export const updateAllSaleRate = async (data) => {
  try {
    const res = await API.patch("/admin/published-list/sale_rate/all", data);
    return handleResponseSuccess(res);
  } catch (err) {
    return handleResponseError(err);
  }
};
export const modifySingleTrade = async (data) => {
  try {
    const res = await API.patch("/admin/published-list/trade/update", data);
    return handleResponseSuccess(res);
  } catch (err) {
    return handleResponseError(err);
  }
};
