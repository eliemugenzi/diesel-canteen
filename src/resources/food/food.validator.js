const { Joi, celebrate } = require("celebrate");

module.exports.newFoodRule = celebrate({
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

module.exports.getFoodRule = celebrate({
  query: Joi.object().keys({
    type: Joi.string().valid("food", "drinks").required(),
  }),
});

module.exports.orderFoodRule = celebrate({
  body: Joi.object().keys({
    quantity: Joi.number().integer().min(1).required(),
  }),
});

module.exports.searchRule = celebrate({
  query: Joi.object().keys({
    q: Joi.string().min(1).required(),
  }),
});

module.exports.filterRule = celebrate({
  query: Joi.object().keys({
    location: Joi.string().min(1).required(),
  }),
});
