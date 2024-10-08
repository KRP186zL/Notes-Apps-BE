const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h)=>{
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNotes = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt
  };

  notes.push(newNotes);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess){
    const response = h.response({
      status: 'success',
      message : 'Catatan berhasil ditambahkan',
      data: {
        noteId : id,
      }
    });
    response.code(201);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan'
  });
  response.code(500);

  return response;
};

const getAllNotesHandler = (_request, h) => {
  const response = h.response({
    status: 'success',
    data: {
      notes
    }
  });
  response.code(200);

  return response;
};

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((data) => data.id === id)[0];
  if (note){
    const response = h.response({
      status:'success',
      data:{
        note
      }
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message:'Notes tidak ditemukan'
  });
  response.code(500);

  return response;
};

const updateNoteHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1){
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status : 'success',
      message: 'Note berhasil diubah'
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message:'Id note tidak ditemukan'
  });
  response.code(404);
  return response;
};

const deleteNoteHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1){
    notes.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Note berhasil dihapus'
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Id note tidak ditemukan'
  });
  response.code(404);

  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  updateNoteHandler,
  deleteNoteHandler
};