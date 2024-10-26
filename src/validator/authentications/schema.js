const Joi = require('joi');

const PostAuthenticationPayloadSchema = Joi.object({
  username: Joi.string().empty('').required(),
  password: Joi.string().empty('').required(),
}).unknown(false);

const PutAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().empty('').required(),
}).unknown(false);

const DeleteAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().empty('').required(),
});

module.exports = {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
};
