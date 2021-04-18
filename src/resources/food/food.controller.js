const asyncHandler = require("../../middleware/asyncHandler");
const { Admin, Food, Drink, Location } = require("../../database/models");

const jsonResponse = require("../../helpers/jsonResponse");

module.exports.addFood = asyncHandler(async (req, res) => {
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

module.exports.getFood = asyncHandler(async (req, res) => {
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

module.exports.getSingleFood = asyncHandler(async (req, res) => {
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

module.exports.placeOrder = asyncHandler(async (req, res) => {
  const { params, body } = req;

  const foundFood = await Food.findById(params.id);
  const foundDrink = await Drink.findById(params.id);

  const _food = foundFood || foundDrink;

  if (!_food) {
    return jsonResponse({
      res,
      status: 404,
      message: "Food not found",
    });
  }

  if (body.quantity > _food.quantity) {
    return jsonResponse({
      res,
      status: 403,
      message: `We only have ${_food.quantity} left in stock`,
    });
  }

  await _food.update({
    quantity: Number(_food.quantity) - Number(body.quantity),
  });

  return jsonResponse({
    res,
    status: 200,
    message: "Order is placed",
  });
});

module.exports.searchFood = asyncHandler(async (req, res) => {
  const { q } = req.query;

  const foods = await Food.find({
    name: {
      $regex: q,
      $options: "i",
    },
  });

  const drinks = await Drink.find({
    name: {
      $regex: q,
      $options: "i",
    },
  });

  return jsonResponse({
    res,
    status: 200,
    data: {
      food: foods,
      drinks: drinks,
    },
  });
});
