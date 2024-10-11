const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NotesService = require('./services/inMemory/NotesService');
(async () => {

  const notesService = new NotesService();
  const server = Hapi.server({
    port: 5000,
    host : process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: true
    }
  });

  try {
    await server.register([
      {
        plugin: notes,
        options : {
          service: notesService
        }
      }
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  }
  catch (err) {

  }
})();