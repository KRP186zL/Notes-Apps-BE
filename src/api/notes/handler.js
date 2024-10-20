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

  getNoteByIdHandler(request, _h)  {
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


  putNoteByIdHandler(request, _h)  {
    this.#validator.validateNotePayload(request.payload);
    const { id } = request.params;

    this.#service.putNoteById(id, request.payload);

    return {
      status: 'success',
      message: 'Catatan berhasil diperbarui'
    };
  }

  deleteNoteByIdHandler(request, _h)  {
    const { id } = request.params;
    this.#service.deleteNoteById(id);

    return {
      status: 'success',
      message: 'Catatan berhasil dihapus'
    };
  }
}
module.exports = NotesHandler;