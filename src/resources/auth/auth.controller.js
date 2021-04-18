const asyncHandler = require("../../middleware/asyncHandler");
const { User, Admin, Token } = require("../../database/models");
const jsonResponse = require("../../helpers/jsonResponse");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../../helpers/jwt");

const login = asyncHandler(async (req, res) => {
  const { body } = req;
  const user = await User.findOne({
    login_id: body.login_id,
  });

  const admin = await Admin.findOne({
    login_id: body.login_id,
  });

  if (!user && !admin) {
    return jsonResponse({
      res,
      status: 404,
      message: "User does not exist",
    });
  }

  const _user = user || admin;

  if (!bcrypt.compareSync(body.password, _user.password)) {
    return jsonResponse({
      res,
      status: 401,
      message: "Invalid credentials",
    });
  }

  const isAdmin = !!admin;

  const userData = {
    ..._user._doc,
    password: undefined,
  };

  const token = generateToken(userData);

  await Token.create({
    user: _user,
    token,
  });

  return jsonResponse({
    res,
    status: 200,
    data: {
      ...userData,
      token,
      is_admin: isAdmin,
    },
  });
});

const signUp = asyncHandler(async (req, res) => {
  const { body } = req;

  const Model = body.type === "admin" ? Admin : User;

  const foundUser = await Model.findOne({
    login_id: body.login_id,
  });

  if (foundUser) {
    return jsonResponse({
      res,
      status: 409,
      message: "Login ID is already taken!",
    });
  }

  const payload = {
    ...body,
    type: undefined,
  };

  const user = await Model.create(payload);

  const token = generateToken({
    ...user._doc,
    password: undefined,
  });

  await Token.create({
    token,
    user,
  });

  return jsonResponse({
    res,
    status: 201,
    message: "User has been created",
    data: {
      ...user._doc,
      token,
      is_admin: body.type === "admin",
    },
  });
});

module.exports = {
  login,
  signUp,
};
