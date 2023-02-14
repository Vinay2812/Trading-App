import connection from "./dbConnect.js";

export default async function executeQuery(query){
    const request = await connection;
    const queryOutput = await request.query(query);
    // recorsets, recordset, rowsaffected
    // console.log(queryOutput);
    return queryOutput.recordset
}