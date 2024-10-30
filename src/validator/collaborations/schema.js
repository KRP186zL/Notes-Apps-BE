const Joi = require('joi');

const CollaborationPayloadSchema = Joi.object({
  noteId: Joi.string().empty('').required(),
  userId: Joi.string().empty('').required(),
}).unknown(false);

module.exports = { CollaborationPayloadSchema };
