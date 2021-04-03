const { Joi, celebrate } = require("celebrate");

const loginRule = celebrate({
  body: Joi.object().keys({
    login_id: Joi.number().integer().positive().required(),
    password: Joi.string().required(),
  }),
});

const signUpRule = celebrate({
  body: Joi.object().keys({
    login_id: Joi.number().integer().positive().required(),
    name: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    type: Joi.string().valid("student", "admin").required(),
  }),
});

module.exports = {
  loginRule,
  signUpRule,
};
