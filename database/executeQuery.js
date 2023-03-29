import logger from "../utils/logger.js";
// import mssql from "../connections/mssql-connection.js";
import sql from "mssql";
import { QueryTypes } from "sequelize";
import { DATABASE, DB_PASSWORD, DB_SERVER, DB_USER } from "../utils/config.js";
const type = {
  select: QueryTypes.SELECT,
  insert: QueryTypes.INSERT,
  update: QueryTypes.UPDATE,
  delete: QueryTypes.DELETE,
};

const connection = new sql.connect({
  user: DB_USER,
  password: DB_PASSWORD,
  server: DB_SERVER,
  database: DATABASE,
  options: {
    encrypt: true,
    trustedConnection: true,
    trustServerCertificate: true,
  }
}).then(async () => {
  logger.info("MSSQL Connected");
  const request = new sql.Request();
  return request;
}).catch((err) => {
  logger.error({err});
});

export default async function executeQuery(query) {
  const request = await connection;
  const result = await request.query(query);
  return result.recordset;
}
