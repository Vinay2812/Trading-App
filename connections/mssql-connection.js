import { Sequelize } from "sequelize";
import { invalidateOtp } from "../controller/Auth/AuthController.js";
import {
  DATABASE,
  DB_PASSWORD,
  DB_SERVER,
  DB_USER,
  OTP_REFRESH_INTERVAL,
} from "../utils/config.js";
import logger from "../utils/logger.js";

const mssql = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_SERVER,
  logging: (msg) => logger.debug(msg),
  dialect: "mssql",
  define: {
    timestamps: false,
  },
});

export function connectMssql() {
  mssql
    .authenticate()
    .then(() => {
      setInterval(() => {
        invalidateOtp();
      }, OTP_REFRESH_INTERVAL);
      logger.info("Sequelize mssql Connected");
    })
    .catch((err) => {
      logger.error(err);
    });
}

export default mssql;
