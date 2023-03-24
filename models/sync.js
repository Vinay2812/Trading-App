import logger from "../utils/logger.js";
import { AccountMaster } from "./AccountMaster.js";
import { AppErrors } from "./AppErrors.js";
import { DailyPublish } from "./DailyPublish.js";
import { UserBankDetails, UserOnlineDetails } from "./User.js";

export default async function syncMssql() {
  const options = {
    logging: false,
    alter: false,
  };
  try {
    await UserOnlineDetails.sync(options);
  } catch (err) {
    logger.error("failed to sync online user details " + err);
  }
  try {
    await UserBankDetails.sync(options);
  } catch (err) {
    logger.error("failed to sync user bank details " + err);
  }
  try {
    await AccountMaster.sync(options);
  } catch (err) {
    logger.error("failed to sync nt_1_accountmaster " + err);
  }
  try {
    await AppErrors.sync(options);
  } catch (err) {
    logger.error("failed to sync trading_app_errors " + err);
  }
  try {
    await DailyPublish.sync(options);
  } catch (err) {
    logger.error("failed to sync tr daily publish " + err);
  }
}
