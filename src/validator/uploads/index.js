const { ImageHeadersSchema } = require('./schema');
const InvariantError = require('../../error/InvariantError');

const UploadsValidator = {
  validateImageHeader: (header) => {
    const validationResult = ImageHeadersSchema.validate(header);

    const { value, error } = validationResult;

    if (error){
      throw new InvariantError(error.message);
    }

    return value;
  }
};

module.exports = UploadsValidator;