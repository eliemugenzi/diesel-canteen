const { Router } = require("express");

const { newFoodRule } = require("./food.validator");
const { addFood } = require("./food.controller");
const checkAuth = require("../../middleware/check-auth");

const router = Router();

router.post("/", checkAuth, newFoodRule, addFood);

module.exports = router;
