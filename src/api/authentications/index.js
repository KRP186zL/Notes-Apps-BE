const routes = require('./routes');
const AuthenticationsHandler = require('./handler');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (
    server,
    { authenticationsService, AuthenticationsValidator, usersService, TokenManager }
  ) => {
    const authenticationsHandler = new AuthenticationsHandler(
      authenticationsService,
      usersService,
      TokenManager,
      AuthenticationsValidator
    );
    server.route(routes(authenticationsHandler));
  },
};
