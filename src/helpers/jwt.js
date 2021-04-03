const jwt = require("jsonwebtoken");
require("dotenv/config");

const { JWT_SECRET_KEY = "" } = process.env;

const generateToken = (payload, expiresIn = "30d") => {
  try {
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn });

    return token;
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = {
  generateToken,
};
