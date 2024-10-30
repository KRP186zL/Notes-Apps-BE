const autoBind = require('auto-bind');

class CollaborationsHandler {
  constructor(collaborationsService, notesService, validator) {
    this._collaborationsService = collaborationsService;
    this._notesService = notesService;
    this._validator = validator;

    autoBind(this);
  }

  async postCollaborationHandler(request, h) {
    const validatedCollaborationPayload = this._validator.validateCollaborationPayload(
      request.payload
    );

    const { noteId, userId } = validatedCollaborationPayload;
    const { id: credentialId } = request.auth.credentials;

    await this._notesService.verifyNoteOwner(noteId, credentialId);

    const collaborationId = await this._collaborationsService.addCollaboration(noteId, userId);

    const response = h.response({
      status: 'success',
      message: 'Kolaborasi berhasil ditambahkan',
      data: {
        collaborationId,
      },
    });
    response.code(201);

    return response;
  }

  async deleteCollaborationHandler(request, h) {
    const validatedCollaborationPayload = this._validator.validateCollaborationPayload(
      request.payload
    );

    const { noteId, userId } = validatedCollaborationPayload;
    const { id: credentialId } = request.auth.credentials;

    await this._notesService.verifyNoteOwner(noteId, credentialId);

    await this._collaborationsService.deleteCollaboration(noteId, userId);

    const response = h.response({
      status: 'success',
      message: 'Kolaborasi berhasil dihapus',
    });
    response.code(200);

    return response;
  }
}

module.exports = CollaborationsHandler;
