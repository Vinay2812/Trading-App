export function validateReq(schema, data) {
  return schema.validate(data, { allowUnknown: true, abortEarly: false });
}

export function joiErrorRes(res, error, function_name = "") {
  logger.log("Req body error in - " + function_name)
  logger.joiError(error);
  res.status(422).json(error.details);
}
