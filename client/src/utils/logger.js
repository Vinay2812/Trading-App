import { postError } from "../api/ErrorRequest";

const symbolMap = {
  ok: "\u221A",
  err: "\u00D7",
};
function log({ message, colorCode = 0, error = false, symbol = "ok" }) {
  try {
    let msg = JSON.stringify(message);
    if (import.meta.env.DEV) {
      (message instanceof Object || message instanceof Array) &&
        console.log(message);
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

function logData(...message) {
  message.forEach((msg) => log({ msg }));
}

function logError(...message) {
  message.forEach((msg) => {
    log({ message: msg, colorCode: 31, error: true, symbol: "err" });
  });
}

const logger = {
  log: logData,
  error: logError,
};
export default logger;
