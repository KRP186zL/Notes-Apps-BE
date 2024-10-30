const routes = require('./routes');
const CollaborationsHandler = require('./handler');

module.exports = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (server, { collaborationsService, notesService, CollaborationsValidator }) => {
    const collaborationsHandler = new CollaborationsHandler(
      collaborationsService,
      notesService,
      CollaborationsValidator
    );

    server.route(routes(collaborationsHandler));
  },
};
