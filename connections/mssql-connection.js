import { Sequelize } from "sequelize";
import {
  DATABASE,
  DB_PASSWORD,
  DB_SERVER,
  DB_USER,
} from "../utils/config.js";
import logger from "../utils/logger.js";

const mssql = new Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_SERVER,
  plain: true,
  benchmark: true,
  logging: (msg, timing) => logger.warn(`Executed query - ${msg} in ${timing} ms`),
  dialect: "mssql",
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

export function connectMssql() {
  mssql
    .authenticate({ logging: false})
    .then(() => {
      logger.info("Sequelize mssql Connected");
    })
    .catch((err) => {
      logger.error(err);
    });
}

export default mssql;
