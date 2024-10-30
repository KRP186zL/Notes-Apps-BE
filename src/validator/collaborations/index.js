const InvariantError = require('../../error/InvariantError');
const { CollaborationPayloadSchema } = require('./schema');

const ValidatorCollaborations = {
  validateCollaborationPayload: (payload) => {
    const validationResult = CollaborationPayloadSchema.validate(payload);

    const { error, value } = validationResult;

    if (error) {
      throw new InvariantError(error.message);
    }

    return value;
  },
};

module.exports = ValidatorCollaborations;
