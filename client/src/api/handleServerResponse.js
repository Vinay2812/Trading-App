import logger from "../utils/logger";

export function handleResponseError(error) {
  logger.error(error.message);
  const statusCode = error?.response?.status;
  const errorMessage = error?.response?.data?.error?.message;
  const errorResponse = { success: false, error: errorMessage, data: null };
  switch (statusCode) {
    case 400: {
      alert(`You made a bad request:\n${errorMessage}`);
      break;
    }
    case 401: {
      alert(`You are unauthorized:\n${errorMessage}`);
      break;
    }
    case 403: {
      alert(`This action is forbidden:\n${errorMessage}`);
      break;
    }
    case 404: {
      alert(`Can't find what you are looking for:\n${errorMessage}`);
      break;
    }
    case 409: {
      alert(`There is a conflict:\n${errorMessage}`);
      break;
    }
    case 422: {
      const msg = errorMessage[0].message;
      alert(`Validation error:\n${msg}`);
      return { success: false, error: msg, data: null };
    }
    case 500: {
      alert(`Something went wrong at server side:\n${errorMessage}`);
      break;
    }
    default: {
      return { success: false, error: errorMessage, data: null };
    }
  }
  return errorResponse;
}

export function handleResponseSuccess(res, alert = false) {
  if (res.data.status === "success") {
    alert && window.alert(res.data.message);
    return {
      success: true,
      error: null,
      data: res.data.data,
      message: res.data.message,
    };
  }
  return {
    success: true,
    error: null,
    data: "No data found",
    message: res.data.message,
  };
}
