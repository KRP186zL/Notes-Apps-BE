const { ExportNotesPayloadSchema } = require('./schema');
const InvariantError = require('../../error/InvariantError');

const ExportsValidator = {
  validateExportNotesPayload: (payload) => {
    const validationResult = ExportNotesPayloadSchema.validate(payload);

    const { error, value } = validationResult;

    if (error) {
      throw new InvariantError(error.message);
    }
    return value;
  },
};

module.exports = ExportsValidator;
