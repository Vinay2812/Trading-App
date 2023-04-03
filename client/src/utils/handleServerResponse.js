import {
  notifyError,
  notifySuccess,
  notifyWarn,
} from "../components/Toast/Toast";
import logger from "./logger";

export function handleResponseError(error) {
  const errorCodeMap = new Map(
    Object.entries({
      400: `You made a bad request:\n`,
      401: `You are unauthorized:\n`,
      403: `This action is forbidden:\n`,
      404: `Can't find what you are looking for:\n`,
      409: `There is a conflict:\n`,
      422: `Validation error:\n`,
      500: `Something went wrong at server side:\n`,
    })
  );
  let statusCode = error?.response?.status;
  statusCode = statusCode ? statusCode.toString() : null;
  let errorMessage = error?.response?.data?.error?.message;
  if (statusCode === "422") {
    errorMessage = errorMessage[0].message;
  }
  if (errorCodeMap.has(statusCode)) {
    notifyError(errorCodeMap.get(statusCode) + errorMessage);
  } else {
    const statusFirstChar = statusCode.charAt(0);
    ["4", "5"].includes(statusFirstChar) &&
      notifyWarn(`Error code ${statusCode} not found in map\n${errorMessage}`);
  }
  const errorResponse = { success: false, error: errorMessage, data: null };
  return errorResponse;
}

export function handleResponseSuccess(res) {
  if (res.data.status === "success") {
    notifySuccess(res.data.message);
  }
  return {
    success: true,
    error: null,
    data: res.data.status === "success" ? res.data.data : "No data found",
    message: res.data.message,
  };
}
