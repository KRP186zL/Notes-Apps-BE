const ClientError = require('./ClientError');

class authenticationsError extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = 'authenticationsError';
  }
}

module.exports = authenticationsError;
