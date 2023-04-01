import logger from "../utils/logger";
import { API } from "./AxiosInstance";
export async function postError(error) {
  try {
    const res = await API.post("/error", { error: JSON.stringify(error) });
    return res;
  } catch (err) {
    logger.error(err);
  }
}
