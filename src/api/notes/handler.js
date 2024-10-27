class NotesHandler {
  #service;
  #validator;

  constructor(service, validator) {
    this.#service = service;
    this.#validator = validator;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  async postNoteHandler(request, h) {
    const { id: credentialID } = request.auth.credentials;

    this.#validator.validateNotePayload(request.payload);
    const { title = 'untitled', tags, body } = request.payload;

    const noteId = await this.#service.addNote({ title, tags, body, owner: credentialID });

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId,
      },
    });
    response.code(201);

    return response;
  }

  async getNotesHandler(request) {
    const { id: credentialID } = request.auth.credentials;
    const notes = await this.#service.getNotes(credentialID);

    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  async getNoteByIdHandler(request, _h) {
    const { id } = request.params;
    const { id: crendentialId } = request.auth.credentials;
    console.log(crendentialId);

    await this.#service.verifyNoteOwner(id, crendentialId);
    const note = await this.#service.getNoteById(id);

    return {
      status: 'success',
      message: 'Catatan berhasil ditemukan',
      data: {
        note,
      },
    };
  }

  async putNoteByIdHandler(request, _h) {
    this.#validator.validateNotePayload(request.payload);
    const { id } = request.params;
    const { id: credentialID } = request.auth.credentials;
    await this.#service.verifyNoteOwner(id, credentialID);
    await this.#service.putNoteById(id, request.payload);

    return {
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    };
  }

  async deleteNoteByIdHandler(request, _h) {
    const { id } = request.params;
    const { id: credentialID } = request.auth.credentials;
    await this.#service.verifyNoteOwner(id, credentialID);
    await this.#service.deleteNoteById(id);

    return {
      status: 'success',
      message: 'Catatan berhasil dihapus',
    };
  }
}
module.exports = NotesHandler;
