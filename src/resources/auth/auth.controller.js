const asyncHandler = require("../../middleware/asyncHandler");
const { User, Admin } = require("../../database/models");
const jsonResponse = require("../../helpers/jsonResponse");
const bcrypt = require("bcrypt");

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
  return jsonResponse({
    res,
    status: 200,
    data: _user,
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
      message: "User already exist!",
    });
  }

  const payload = {
    ...body,
    type: undefined,
  };

  const user = await Model.create(payload);

  return jsonResponse({
    res,
    status: 201,
    message: "User has been created",
    data: user,
  });
});

module.exports = {
  login,
  signUp,
};
