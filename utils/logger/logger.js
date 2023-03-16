import { config } from "dotenv";
import dump from "./dump.js";
import { NODE_ENV } from "../config.js";
import { convertDate } from "../date.js";

config();
const symbolMap = {
  ok: "\u221A",
  err: '\u00D7',
}
function log({ message, colorCode = 90, error = false, print = true, symbol = "ok", client}) {
  let data = {
    msg: message,
    time: convertDate(new Date().toString()),
  };
  data =
    NODE_ENV !== "production"
      ? JSON.stringify(data)
          .split(/[\s\n"]/g)
          .filter((d) => d !== "")
          .join(" ")
          .replaceAll("\\n", "")
          .replaceAll("\\", "")
      : JSON.stringify(data);
  if (NODE_ENV !== "production" && print) {
    console.log(" \u001b[" + colorCode + "m" + symbolMap[symbol] + " " + data + "\u001b[0m");
  }
  dump(data, error, client);
}

function logData(message) {
  log({
    message,
    colorCode: 90,
  });
}

function logError(message, client = false) {
  log({ message, colorCode: 31, symbol: "err", error: true, client });
}

function logJoiError(error, controller = "") {
  error.details.map((err) =>
    log({
      message: `${controller} controller req body err => ${err.message}`,
      colorCode: 91,
      symbol: "err"
    })
  );
}

function logSQL(data) {
  let colorCode = Object.keys(data).includes("query") ? 36 : 90;
  log({ message: data, colorCode, print: Object.keys(data).includes("query") });
}
const logger = {
  log: logData,
  error: logError,
  joiError: logJoiError,
  sql: logSQL,
};
export default logger;
