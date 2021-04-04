const { Router } = require("express");
const auth = require("./auth/auth.routes");
const food = require("./food/food.route");

const router = Router();

router.use("/auth", auth);
router.use("/food", food);

module.exports = router;
