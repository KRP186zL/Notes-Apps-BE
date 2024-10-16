class NotesHandler{
  #service;
  #validator;

  constructor(service, validator){
    this.#service = service;
    this.#validator = validator;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  postNoteHandler(request, h){
    try {
      this.#validator.validateNotePayload(request.payload);
      const { title = 'untitled', tags, body } = request.payload;

      const noteId = this.#service.addNote({ title, tags, body });

      const response = h.response({
        status: 'success',
        message:'Catatan berhasil ditambahkan',
        data : {
          noteId
        },
      });
      response.code(201);

      return response;
    }
    catch (err) {
      const response = h.response({
        status: 'fail',
        message: err.message
      });
      response.code(400);

      return response;
    }
  }

  getNotesHandler(){
    const notes = this.#service.getNotes();
    return {
      status:'success',
      data :
        {
          notes
        }
    };
  }

  getNoteByIdHandler(request, h)  {
    try {
      const { id } = request.params;
      const note = this.#service.getNoteById(id);

      return {
        status: 'success',
        message: 'Catatan berhasil ditemukan',
        data: {
          note,
        },
      };
    }
    catch (err) {
      const response = h.response({
        status: 'fail',
        message: err.message
      });
      response.code(404);

      return response;
    }
  }

  putNoteByIdHandler(request, h)  {
    try {
      this.#validator.validateNotePayload(request.payload);
      const { id } = request.params;

      this.#service.putNoteById(id, request.payload);

      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui'
      };
    }
    catch (err) {
      const response = h.response({
        status: 'fail',
        message: err.message
      });
      response.code(404);

      return response;
    }
  }

  deleteNoteByIdHandler(request, h)  {
    try {
      const { id } = request.params;
      this.#service.deleteNoteById(id);

      return {
        status: 'success',
        message: 'Catatan berhasil dihapus'
      };
    }
    catch (err){
      const response = h.response({
        status: 'fail',
        message: err.message
      });
      response.code(404);

      return response;
    }
  }
}

module.exports = NotesHandler;