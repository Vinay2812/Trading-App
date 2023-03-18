import dump from "./dump.js";
import { NODE_ENV } from "../config.js";
import { convertDate } from "../date.js";

const symbolMap = {
  ok: "\u001b[32m\u221A\u001b[0m",
  err: "\u00D7",
};

const can_print = NODE_ENV !== "production";

function log({
  message,
  colorCode = 90,
  error = false,
  print = true,
  symbol = "ok",
  client,
}) {
  let data = {
    msg: message,
    time: convertDate(new Date().toString()),
  };
  data =
    can_print
      ? JSON.stringify(data)
          .split(/[\s\n"]/g)
          .filter((d) => d !== "")
          .join(" ")
          .replaceAll("\\n", "")
          .replaceAll("\\", "")
      : JSON.stringify(data);
  if (can_print && print) {
    console.log(
      `\u001b[${colorCode}m${symbolMap[symbol]} level: { ${NODE_ENV} } ${data}\u001b[0m`
    );
  }
  dump(data, error, client);
}

function logData(...message) {
  message.map((msg) =>
    log({
      message: msg,
      colorCode: 90,
    })
  );
}

function logError(...message) {
  message.map((msg) =>
    log({ message: msg, colorCode: 31, symbol: "err", error: true })
  );
}

function logJoiError(error, controller = "") {
  log({ message: "[", colorCode: 36, symbol: "err" });
  error.details.map((err) =>
    log({
      message: `${controller} controller req body err => ${err.message}`,
      colorCode: 91,
      symbol: "err",
    })
  );
  log({ message: "]", colorCode: 36, symbol: "err" });
}

function logClientError(...message) {
  message.map((msg) =>
    log({
      message: msg,
      colorCode: 31,
      symbol: "err",
      error: true,
      client: true,
    })
  );
}

function logSQL(data) {
  let colorCode = Object.keys(data).includes("query") ? 36 : 90;
  log({ message: data, colorCode, print: Object.keys(data).includes("query") });
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
