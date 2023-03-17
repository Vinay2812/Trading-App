import { postError } from "../api/ErrorRequest";

const symbolMap = {
  ok: "\u221A",
  err: "\u00D7",
};
function log({ message, colorCode = 0, error = false, symbol = "ok" }) {
  try {
    let msg = JSON.stringify(message);
    if (import.meta.env.DEV) {
      console.log(
        " \u001b[" +
          colorCode +
          "m" +
          symbolMap[symbol] +
          " " +
          msg +
          "\u001b[0m"
      );
    }
    error && postError(message);
  } catch (err) {}
}

function logData(message) {
  log({ message });
}

function logError(message) {
  let errMsg = message.response
    ? `${message.response?.data} in ${
        message.response?.status
      } ${message.response?.config?.method?.toUpperCase()} ${
        message.response?.config?.url
      }`
    : message;
  log({ message: errMsg, colorCode: 31, error: true, symbol: "err" });
}

const logger = {
  log: logData,
  error: logError,
};
export default logger;
