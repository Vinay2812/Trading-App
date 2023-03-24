import logger from "../utils/logger.js";
import mssql from "../connections/mssql-connection.js";
import { QueryTypes } from "sequelize";
const type = {
  select: QueryTypes.SELECT,
  insert: QueryTypes.INSERT,
  update: QueryTypes.UPDATE,
  delete: QueryTypes.DELETE,
};

export default async function executeQuery(query) {
  const query_type = query.split(" ")[0].toLowerCase();
  let [results] = await mssql.query(query, {
    type: type[query_type],
  });
  if (!(results instanceof Array)) {
    results = [results];
  }
  return results;
}
