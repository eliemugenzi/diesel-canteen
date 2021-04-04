const asyncHandler = require("../../middleware/asyncHandler");
const { Admin, Food, Drink, Location } = require("../../database/models");

const jsonResponse = require("../../helpers/jsonResponse");

const addFood = asyncHandler(async (req, res) => {
  const { currentUser, body } = req;
  const foundAdmin = await Admin.findById(currentUser._id);

  if (!foundAdmin) {
    return jsonResponse({
      res,
      status: 403,
      message: "Unauthorized access",
    });
  }

  const location = await Location.findOne({
    name: body.location,
  });

  if (!location) {
    return jsonResponse({
      res,
      status: 404,
      message: "Location is not found",
    });
  }

  const Model = body.type === "food" ? Food : Drink;

  const payload = {
    ...body,
    type: undefined,
    location,
    user: currentUser,
  };

  const newFood = await Model.create(payload);

  return jsonResponse({
    res,
    status: 201,
    message: "Item has been created",
    data: newFood,
  });
});

module.exports = {
  addFood,
};
