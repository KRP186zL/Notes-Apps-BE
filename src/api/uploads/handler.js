const autoBind = require('auto-bind');

class UploadsHandler{
  constructor(service, validator){
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postUploadImageHandler(request, h){
    const { data } = request.payload;
    const { hapi : meta } = data;
    const { headers } = meta;

    this._validator.validateImageHeader(headers);

    const filename = await this._service.writeFile(data, meta);

    const response = h.response({
      status:'success',
      data:{
        fileLocation: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`
      }
    });
    response.code(201);

    return response;
  }
}

module.exports = UploadsHandler;