import logger from "../utils/logger.js";
import connection from "./dbConnect.js";

export default async function executeQuery(query, log = true){
    let start = Date.now();
    const request = await connection;
    const queryOutput = await request.query(query);
    let stop = Date.now();
    const data = {
        query,
        exec_time: (stop - start) + " ms"
    }
    log && logger.log(data);
    return queryOutput.recordset
}