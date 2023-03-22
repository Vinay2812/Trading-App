import { UserBankDetails, UserOnlineDetails } from "../models/User.js";
import logger from "../utils/logger.js";

export async function syncMssql() {
  try {
    await UserOnlineDetails.sync();
  } catch (err) {
    logger.error("failed to sync online user details " + err);
  }
  try {
    await UserBankDetails.sync();
  } catch (err) {
    logger.error("failed to sync user bank details " + err);
  }
}

export { connectMongodb } from "./mongo-connection.js";
export { connectMssql } from "./mssql-connection.js";
export { connectSocket } from "./socket-connection.js";
