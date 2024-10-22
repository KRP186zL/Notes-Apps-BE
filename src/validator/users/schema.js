const Joi = require('joi');
const { user, password } = require('pg/lib/defaults');

const userPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required()
}).unknown(false);

module.exports = { userPayloadSchema };