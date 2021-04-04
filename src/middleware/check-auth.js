require("dotenv/config");

const jwt = require("jsonwebtoken");

const asyncHandler = require("./asyncHandler");
const jsonResponse = require("../helpers/jsonResponse");
const { User, Admin } = require("../database/models");

const { JWT_SECRET_KEY = "" } = process.env;

const checkAuth = asyncHandler(async (req, res, next) => {
  const { authorization = "" } = req.headers;

  if (!authorization) {
    return jsonResponse({
      res,
      status: 401,
      message: "Unauthorized access",
    });
  }

  const token = authorization.slice(4);
  if (!token) {
    return jsonResponse({
      res,
      status: 401,
      message: "Unauthorized access",
    });
  }

  jwt.verify(token, JWT_SECRET_KEY, async (error, decoded) => {
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

    const isUser = await User.findById(decoded._id);
    const isAdmin = await Admin.findById(decoded._id);

    if (!(isUser || isAdmin)) {
      return jsonResponse({
        res,
        status: 403,
        message: "Forbidden access",
      });
    }

    const _user = isUser || isAdmin;

    req.currentUser = _user;

    return next();
  });
});

module.exports = checkAuth;
