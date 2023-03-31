import logger from "../utils/logger.js";

const response_map = {
  success: ({ data = null, message = "" }) => ({
    status: "success",
    code: 200,
    data,
    message,
  }),
  fail: ({ status = 500, message = "Internal Server Error" }) => ({
    status: "fail",
    code: status,
    error: { message },
  }),
};

export default function response(err, req, res, next) {
  try {
    if (err.status) {
      logger.error(err.message || "Internal Server Error");
      res.status(err.status).json(response_map.fail(err));
    } else {
      res.status(200).json(response_map.success(err));
    }
  } catch (e) {
    console.log(e);
  }
}
