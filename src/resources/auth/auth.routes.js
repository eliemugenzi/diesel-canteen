const { Router } = require("express");

const { loginRule, signUpRule } = require("./auth.validator");
const { login, signUp } = require("./auth.controller");

const router = Router();

router.post("/signup", signUpRule, signUp);
router.post("/login", loginRule, login);

module.exports = router;
