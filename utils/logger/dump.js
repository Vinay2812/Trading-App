import fs from "fs";
import executeQuery from "../../database/executeQuery.js";
import { NODE_ENV } from "../config.js";
import { TRADING_APP_ERRORS } from "../../database/dbSchema.js";

function formatDumpMessage(msg) {
  return msg.replace(/\[{/g, '[\n\t{')
  .replace(/}]/g, '}\n]')
  .replace(/, recordset/g, ',\n\trecordset')
  .replace(/},{/g, '},\n\t{')
  .replace(/ msg :/g, '\n\tmsg :')
  .replace(/, time/g, ',\n\ttime')
  .replace(/M }/g, 'M\n}')
  .replace(/\{ query/g, '{\n\t\tquery')
  .replace(/ , output :{ /g, ',\n\t\toutput :\n\t\t{\n\t\t\t')
  .replace(/, rowsAffected/g, ',\n\trowsAffected')
  .replace(/}, exec_time/g, '\n}\texec_time')
  .replace(/ms },/g, 'ms\n},') + '\n-------------------------------------------';
}
export default async function dump(msg, error = false, client = false) {
  if (NODE_ENV !== "production") {
    const file = `debug/${client ? "client.log" : "server.log"}`;
    if (!fs.existsSync(file)) {
      fs.mkdirSync("debug", { recursive: true });
    }
    fs.appendFile(
      file,
      `${formatDumpMessage(msg)}\n`,
      (err) => err && console.log("Failed to append in debug - err: " + err)
    );
  } else {
    const INSERT_ERROR_TO_TABLE = `
      INSERT into ${TRADING_APP_ERRORS} (error_from, error, error_time)
      VALUES ('${client ? "client" : "server"}', '${msg.replaceAll(
      "\\",
      ""
    )}', '${Date.now()}')
    `;
    if (error) {
      executeQuery(INSERT_ERROR_TO_TABLE, false).catch((err) =>
        console.log(err)
      );
    }
  }
}
