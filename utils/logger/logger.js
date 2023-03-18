import dump from "./dump.js";
import { NODE_ENV } from "../config.js";
import { convertDate } from "../date.js";

const symbolMap = {
  ok: "\u001b[32m\u221A",
  err: "\u001b[31m\u00D7",
};

const can_print = NODE_ENV !== "production";

function log({
  message,
  colorCode = 90,
  error = false,
  print = true,
  symbol = "ok",
  client,
  level,
}) {
  let data = {
    msg: message,
    time: convertDate(new Date().toString()),
  };
  if(print && can_print){
    console.log(`${symbolMap[symbol]} \u001b[${colorCode}m{ level: ${level} }\u001b[0m`, message);
  }
  data =
    can_print
      ? JSON.stringify(data)
          .split(/[\s\n"]/g)
          .filter((d) => d !== "")
          .join(" ")
          .replaceAll("\\n", "")
          .replaceAll("\\", "")
      : JSON.stringify(data);
  dump(data, error, client);
}

function logData(...message) {
  message.map((msg) =>
    log({
      message: msg,
      colorCode: 32,
      level: "debug"
    })
  );
}

function logError(...message) {
  message.map((msg) =>
    log({ message: msg, colorCode: 31, symbol: "err", error: true, level: "error" })
  );
}

function logJoiError(error) {
    log({
      message: error,
      colorCode: 91,
      symbol: "err",
      level: "joi error"
    })
}

function logClientError(...message) {
  message.map((msg) =>
    log({
      message: msg,
      colorCode: 31,
      symbol: "err",
      error: true,
      client: true,
      level: "client error"
    })
  );
}

function logSQL(data) {
  let colorCode = Object.keys(data).includes("query") ? 36 : 90;
  log({ message: data, colorCode, level: "mssql" });
}
global.logger = {
  log: logData,
  error: logError,
  joiError: logJoiError,
  sql: logSQL,
  client: logClientError,
  print: (msg) => can_print && console.log(msg),
};
export default logger;
