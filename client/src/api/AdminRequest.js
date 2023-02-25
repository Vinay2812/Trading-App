import { API } from "./AxiosInstance";

export const adminLogin = async(loginData) => await API.post("/admin/login", loginData);
export const getUsers = async () => await API.get("/admin/users");
export const updateAuthorization = async(userId, data) => await API.patch(`/admin/user/${userId}/authorization`, data);
export const addUser = async(userId) => await API.get(`/admin/user/${userId}/add`);
export const mapClient = async(mapData) => await API.put("/admin/map", mapData);
export const getTenderBalances = async(signal) => await API.get("/admin/tenderbalances", signal);
export const insertIntoTrDailyPublish = async(data) => await API.post("/admin/trDailyPublish", data);
export const getQryTrDailyBalance = async(signal) => await API.get("/admin/qrytrdailybalance", signal)
export const stopSingleTrade = async(data) => await API.patch("/admin/trade/stop", data);
export const stopAllTrade = async() => await API.patch("/admin/trade/stop/all");
export const startSingleTrade = async(data) => await API.patch("/admin/trade/start", data);
export const updateSingleSaleRate = async(data) => await API.patch("/admin/sale_rate", data);
export const updateAllSaleRate = async(data) => await API.patch("/admin/sale_rate/all", data);
export const modifySingleTrade = async(data) => await API.patch("/admin/trade/update", data);