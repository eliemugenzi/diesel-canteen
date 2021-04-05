const { isCelebrateError } = require("celebrate");

const joiErrors = () => (err, req, res, next) => {
  if (!isCelebrateError(err)) return next(err);

  const joiError =
    err.details.get("body").details[0].message ||
    err.details.get("query").details[0].message;

  const message = "Validation Error";

  return res.status(400).json({
    status: 400,
    message: joiError || message,
  });
};

module.exports = joiErrors;
