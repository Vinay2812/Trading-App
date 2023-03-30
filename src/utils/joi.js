import logger from "./logger.js";

export function validateReq(schema, data) {
  return schema.validate(data, { allowUnknown: true, abortEarly: false });
}

export function joiErrorRes(res, error, function_name = "") {
  logger.info("Req body error in - " + function_name);
  logger.error(error);
  res.status(422).json(error);
}
