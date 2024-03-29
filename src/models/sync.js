import logger from "../utils/logger.js";
import { AccountMaster, AppErrors, DailyPublish, UserBankDetails, UserOnlineDetails } from "./index.js";

export default function syncMssql() {
  const options = {
    logging: false,
    alter: false,
  };
  UserOnlineDetails.sync(options).catch((err) =>
    logger.error("failed to sync online user details " + err)
  );
  UserBankDetails.sync(options).catch((err) =>
    logger.error("failed to sync user bank details " + err)
  );
  AccountMaster.sync(options).catch((err) =>
    logger.error("failed to sync nt_1_accountmaster " + err)
  );
  AppErrors.sync(options).catch((err) =>
    logger.error("failed to sync trading_app_errors " + err)
  );
  DailyPublish.sync(options).catch((err) =>
    logger.error("failed to sync tr daily publish " + err)
  );
}
