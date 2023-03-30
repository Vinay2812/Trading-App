import logger from "../utils/logger";

export function handleResponseError(error) {
  logger.error(error);
  const statusCode = error?.response?.status;
  const errorMessage = error?.response?.data?.error?.message;
  switch (statusCode) {
    case 400: {
      alert(`You made a bad request:\n${errorMessage}`);
      return { success: false, error: errorMessage, data: null };
    }
    case 401: {
      alert(`You are unauthorized:\n${errorMessage}`);
      return { success: false, error: errorMessage, data: null };
    }
    case 403: {
      alert(`This action is forbidden:\n${errorMessage}`);
      return { success: false, error: errorMessage, data: null };
    }
    case 404: {
      alert(`Can't find what you are looking for:\n${errorMessage}`);
      return { success: false, error: errorMessage, data: null };
    }
    case 422: {
      const msg = errorMessage[0].message;
      alert(`Validation error:\n${msg}`);
      return msg;
    }
    case 500: {
      alert(`Something went wrong at server side:\n${errorMessage}`);
      return { success: false, error: errorMessage, data: null };
    }
    default: {
      alert(`Something went wrong:\n${errorMessage}`);
      return { success: false, error: errorMessage, data: null };
    }
  }
}

export function handleResponseSuccess(res, alert = null) {
  if (res.data.status === "success") {
    alert && window.alert(alert);
    return { success: true, error: null, data: res.data.data };
  }
  return { success: true, error: null, data: "No data found" };
}
