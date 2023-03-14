import fs from "fs";
import executeQuery from "../database/executeQuery.js";
import { NODE_ENV } from "./config.js";

export default async function dump(msg, error = false) {
  if (NODE_ENV !== "production") {
    const file = "debug/debug.log";
    if (!fs.existsSync(file)) {
      fs.mkdirSync("debug", { recursive: true });
    }
    fs.appendFile(file, `${msg}\n`, (err) =>
      err ? console.log("Failed to append in debug - err: " + err) : ""
    );
  } else {
    const INSERT_ERROR_TO_TABLE = `
      INSERT into trading_app_errors (error, error_time)
      VALUES ('${(msg.replace(/[{}]/), "")}', '${Date.now()}')
    `;
    if (error) {
      executeQuery(INSERT_ERROR_TO_TABLE, false).catch((err) =>
        console.log(err)
      );
    }
  }
}
