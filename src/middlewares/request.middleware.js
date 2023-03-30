export default function ValidateRequest(validator = null) {
    return function (req, res, next) {
      if (null) {
        return next();
      }
      const { error, value } = validator.validate(
        { ...req.body, ...req.params, ...req.query, ...req.headers },
        { allowUnknown: true, abortEarly: false }
      );
      if (error) {
        return next(createHttpError.UnprocessableEntity(error.details));
      }
      req.body = value;
      next();
    };
  }