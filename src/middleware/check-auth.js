require("dotenv/config");

const jwt = require("jsonwebtoken");

const asyncHandler = require("./asyncHandler");
const jsonResponse = require("../helpers/jsonResponse");

const { JWT_SECRET_KEY = "" } = process.env;

const checkAuth = asyncHandler(async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const token = authorization.splice(4);
  if (!token) {
    return jsonResponse({
      res,
      status: 401,
      message: "Unauthorized access",
    });
  }

  jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
    if (error || !decoded) {
      if (error.name === "TokenExpiredError") {
        return jsonResponse({
          res,
          status: 401,
          message: "Session expired, please login again",
        });
      }

      return jsonResponse({
        res,
        status: 401,
        message: "Invalid token",
      });
    }

    req.user = decoded;

    return next();
  });
});

module.exports = checkAuth;
