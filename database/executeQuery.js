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
  let start = Date.now();
  const query_type = query.split(" ")[0].toLowerCase();
  let [results, metadata] = await mssql.query(query, {
    type: type[query_type],
  });
  let stop = Date.now();
  logger.debug(
    `Query executed in ${stop - start} ms with rows affected: ${metadata}`
  );
  if (!(results instanceof Array)) {
    results = [results];
  }
  return results;
}
