const Joi = require('joi');

module.exports.SCHEMALogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports.SCHEMARegister = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});
