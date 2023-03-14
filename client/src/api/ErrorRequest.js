import {API} from "./AxiosInstance"
export const postError = async(err) => API.post("/error", err);