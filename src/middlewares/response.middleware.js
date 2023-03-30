import logger from "../utils/logger.js";

export default function response(err, req, res, next) {
  try {
    const response_map = {
      success: ({ data = null, message }) => ({
        status: "success",
        code: 200,
        data,
        message,
      }),
      fail: ({ status, message }) => ({
        status: "fail",
        code: status,
        error: { message },
      }),
    };
    if (err.status) {
      logger.error({ err });
      res.status(err.status).json(response_map.fail(err));
    } else {
      res.status(200).json(response_map.success(err));
    }
  } catch (e) {
    console.log(e);
  }
}
