import logger from "./logger.js";

export function SendResponse(res, statusCode, data) {
  const isError = statusCode >= 400;
  isError && logger.error(data);
  res.status(statusCode).json(data);
}
