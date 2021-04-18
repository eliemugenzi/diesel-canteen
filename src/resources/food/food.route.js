const { Router } = require("express");

const {
  newFoodRule,
  getFoodRule,
  orderFoodRule,
  searchRule,
  filterRule,
} = require("./food.validator");
const {
  addFood,
  getFood,
  getSingleFood,
  placeOrder,
  searchFood,
  filterFood,
} = require("./food.controller");
const checkAuth = require("../../middleware/check-auth");

const router = Router();

router.post("/", checkAuth, newFoodRule, addFood);
router.get("/", getFoodRule, getFood);
router.get("/search", searchRule, searchFood);
router.get("/filter", filterRule, filterFood);
router.get("/:id", getSingleFood);
router.post("/:id/order", checkAuth, orderFoodRule, placeOrder);

module.exports = router;
