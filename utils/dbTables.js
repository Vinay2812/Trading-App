import executeQuery from "../database/executeQuery.js";

export async function tableExists(table_name){
    const CHECK_TABLE_EXIST = `IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME='${table_name}')
      SELECT 1 AS res ELSE SELECT 0 AS res;`;
      console.log(CHECK_TABLE_EXIST)
    const tableExists = await (await executeQuery(CHECK_TABLE_EXIST))[0];
    return tableExists.res == "1"
}