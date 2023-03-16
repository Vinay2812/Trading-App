import { postError } from "../api/ErrorRequest";

const symbolMap = {
  ok: "\u221A",
  err: "\u00D7",
};
function log({ message, colorCode = 0, error = false, symbol = "ok" }) {
  if (import.meta.env.DEV) {
    console.log(
      " \u001b[" +
        colorCode +
        "m" +
        symbolMap[symbol] +
        " " +
        message +
        "\u001b[0m"
    );
  }
  error && postError(message)
}

function logData(message) {
  log({ message });
}

function logError(message) {
  log({ message, colorCode: 31, error: true, symbol: "err" });
}

const logger = {
  log: logData,
  error: logError,
};
export default logger;
