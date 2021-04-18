const { Router } = require("express");

const {
  newFoodRule,
  getFoodRule,
  orderFoodRule,
  searchRule,
} = require("./food.validator");
const {
  addFood,
  getFood,
  getSingleFood,
  placeOrder,
  searchFood,
} = require("./food.controller");
const checkAuth = require("../../middleware/check-auth");

const router = Router();

router.post("/", checkAuth, newFoodRule, addFood);
router.get("/", getFoodRule, getFood);
router.get("/search", searchRule, searchFood);
router.get("/:id", getSingleFood);
router.post("/:id/order", checkAuth, orderFoodRule, placeOrder);

module.exports = router;
