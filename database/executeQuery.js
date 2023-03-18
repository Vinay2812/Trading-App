import connection from "./dbConnect.js";

export default async function executeQuery(query, log = true) {
  let start = Date.now();
  const request = await connection;
  const queryOutput = await request.query(query);
  let stop = Date.now();
  const queryData = {
    query: JSON.stringify(query).split(/\s/).filter(d => d!=="").join(" ").replaceAll("\\n", "").replaceAll('"', ""),
    output: queryOutput,
    exec_time: stop - start + " ms",
  };
  log && logger.sql(queryData);
  return queryOutput.recordset;
}
