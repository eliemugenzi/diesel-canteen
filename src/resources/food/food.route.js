const { Router } = require("express");

const { newFoodRule, getFoodRule, orderFoodRule } = require("./food.validator");
const {
  addFood,
  getFood,
  getSingleFood,
  placeOrder,
} = require("./food.controller");
const checkAuth = require("../../middleware/check-auth");

const router = Router();

router.post("/", checkAuth, newFoodRule, addFood);
router.get("/", getFoodRule, getFood);
router.get("/:id", getSingleFood);
router.post("/:id/order", checkAuth, orderFoodRule, placeOrder);

module.exports = router;
