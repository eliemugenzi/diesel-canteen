const { Joi, celebrate } = require("celebrate");

const newFoodRule = celebrate({
  body: Joi.object().keys({
    type: Joi.string().valid("food", "drink").required(),
    name: Joi.string().required(),
    price: Joi.number().integer().positive().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
    location: Joi.string().required(),
  }),
});

const getFoodRule = celebrate({
  query: Joi.object().keys({
    type: Joi.string().valid("food", "drinks").required(),
  }),
});

module.exports = {
  newFoodRule,
  getFoodRule,
};
