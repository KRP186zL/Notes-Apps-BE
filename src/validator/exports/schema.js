const Joi = require('joi');

const ExportNotesPayloadSchema = Joi.object({
  targetEmail: Joi.string().empty('').email({ tlds: true }).required(),
}).unknown(false);

module.exports = { ExportNotesPayloadSchema };
