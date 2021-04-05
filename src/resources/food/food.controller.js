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
      message: "Only admins can add items",
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

const getFood = asyncHandler(async (req, res) => {
  const { query } = req;

  const Model = query.type === "food" ? Food : Drink;

  const foods = await Model.find({
    quantity: {
      $gte: 1,
    },
  });

  return jsonResponse({
    res,
    status: 200,
    data: foods,
  });
});

const getSingleFood = asyncHandler(async (req, res) => {
  const { params } = req;

  const foundFood = await Food.findById(params.id);
  const foundDrink = await Drink.findById(params.id);

  if (!(foundFood || foundDrink)) {
    return jsonResponse({
      res,
      status: 404,
      message: "Food not found",
    });
  }

  const _food = foundFood || foundDrink;

  return jsonResponse({
    res,
    status: 200,
    data: _food,
  });
});

module.exports = {
  addFood,
  getFood,
  getSingleFood,
};
