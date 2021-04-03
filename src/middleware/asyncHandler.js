const { log } = console;
const chalk = require("chalk");
const jsonResponse = require("../helpers/jsonResponse");

const asyncHandler = (cb) => async (req, res, next) => {
  try {
    cb(req, res, next);
  } catch (error) {
    log(chalk.red(error));

    const message = error.message || error.data.message;

    const status = error.status || 500;
    return jsonResponse({
      res,
      status,
      message,
    });
  }
};

module.exports = asyncHandler;
