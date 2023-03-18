import mongoose from "mongoose";
import mssql from "mssql";
import { invalidateOtp } from "../controller/AuthController.js";
import { updateCacheDocument } from "../utils/cache.js";
import {
  DATABASE,
  DB_PASSWORD,
  DB_SERVER,
  DB_USER,
  MONGO_URL_TEST,
  MONGO_URL_PROD,
  CACHE_REFRESH_INTERVAL,
  NODE_ENV,
  OTP_REFRESH_INTERVAL,
} from "../utils/config.js";

const config = {
  database: DATABASE,
  server: DB_SERVER,
  user: DB_USER,
  password: DB_PASSWORD,
  options: {
    trustedConnection: true,
    encrypt: false,
  },
};

mongoose
  .connect(`${NODE_ENV === "production" ? MONGO_URL_PROD : MONGO_URL_TEST}`)
  .then(() => {
    logger.log("mongodb connected");
    setInterval(() => {
      updateCacheDocument().then(
        (res) => res && logger.log(`Deleted ${res} caches`)
      );
    }, CACHE_REFRESH_INTERVAL);
  })
  .catch((err) => logger.error("failed to connect mongodb " + err));

const connection = mssql
  .connect(config)
  .then(() => {
    logger.log("mssql connected");
    setInterval(()=>{
      invalidateOtp();
    }, OTP_REFRESH_INTERVAL);
    return new mssql.Request();
  })
  .catch((err) => logger.error("DB not connected - \n" + err));

export default connection;
