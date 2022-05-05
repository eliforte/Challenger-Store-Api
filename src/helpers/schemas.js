const Joi = require('joi');

module.exports.SCHEMALogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports.SCHEMARegister = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string(),
  balance: Joi.number().strict().required(),
});

module.exports.SCHEMACreateProduct = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().strict().required(),
  quantity: Joi.number().strict().required(),
  description: Joi.string().required(),
});

module.exports.SCHEMAEditProduct = Joi.object({
  name: Joi.string(),
  price: Joi.number().strict(),
  quantity: Joi.number().strict(),
  description: Joi.string(),
});
