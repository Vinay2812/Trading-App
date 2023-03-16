import logger from "../utils/logger/logger.js";

export function validateReq(schema, data){
    return schema.validate(data, {allowUnknown: true, abortEarly: false})
}

export function joiErrorRes(res, error, function_name = ""){
    logger.joiError(error, function_name);
    res.status(422).json(error.details);
}