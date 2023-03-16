import logger from "../utils/logger/logger.js";
import connection from "./dbConnect.js";

export default async function executeQuery(query, log = true) {
  let start = Date.now();
  const request = await connection;
  const queryOutput = await request.query(query);
  let stop = Date.now();
  const queryData = {
    query,
    exec_time: stop - start + " ms",
  };
  const queryOutputData = {
    output: queryOutput.recordset,
  };
  log && logger.sql(queryData);
  log && logger.sql(queryOutputData);
  return queryOutput.recordset;
}
