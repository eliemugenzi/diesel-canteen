const { Router } = require("express");

const { newFoodRule, getFoodRule } = require("./food.validator");
const { addFood, getFood } = require("./food.controller");
const checkAuth = require("../../middleware/check-auth");

const router = Router();

router.post("/", checkAuth, newFoodRule, addFood);
router.get("/", getFoodRule, getFood);

module.exports = router;
