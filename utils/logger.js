import { createLogger, transports, format } from "winston";
import { NODE_ENV } from "./config.js";

const symbolMap = {
  debug: "\u001b[32m\u221A",
  error: "\u001b[31m\u00D7",
  info: "\u001b[36m\u221A",
  warn: "\u001b[33m\u221A",
  client: "\u001b[31m\u00D7",
};

const levelMap = {
  debug: "debug",
  error: "error",
  info: "info",
  warn: "SQL",
  client: "client"
};

function logData(info, next) {
  const symbol = symbolMap[info.level];
  console.log(
    `${symbol} { level: ${
      levelMap[info.level]
    }, time: ${new Date().toLocaleTimeString()} }\u001b[0m`,
    info.message
  );
  next();
}
const options = {
  transports: [
    new transports.Console({
      level: NODE_ENV === "production" ? "error" : "debug",
      log: logData,
      format: format.combine(format.prettyPrint()),
    }),
    new transports.File({
      filename: "./logs/debug.log",
      level: "debug",
      format: format.combine(format.prettyPrint()),
    }),
    new transports.File({
      filename: "./logs/error.log",
      level: "error",
      format: format.combine(format.prettyPrint()),
    }),
    new transports.File({
      filename: "./logs/mssql.log",
      level: "warn",
      format: format.combine(format.prettyPrint()),
    }),
    new transports.File({
      filename: "./logs/client.log",
      level: "client",
      format: format.combine(format.prettyPrint()),
    }),
  ],
};

const logger = createLogger(options);
export default logger;
