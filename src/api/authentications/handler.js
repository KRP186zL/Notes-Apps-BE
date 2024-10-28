const autoBind = require('auto-bind');

class AuthenticationsHandler {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    autoBind(this);
  }

  // Login dan membuat Access Token, Refresh Token
  async postAuthenticationHandler(request, h) {
    const validatedPostAuthenticationPayload = this._validator.validatePostAuthenticationPayload(
      request.payload
    );

    const { username, password } = validatedPostAuthenticationPayload;

    // Login, cek username dan password di db
    const id = await this._usersService.verifyUsersCredential(username, password);

    // membuat access token dan refresh token
    const accessToken = this._tokenManager.generateAccessToken({ id });
    const refreshToken = this._tokenManager.generateRefreshToken({ id });

    // menyimpan access token kedalam db
    await this._authenticationsService.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);

    return response;
  }

  async putAuthenticationHandler(request, h) {
    const validatedPutAuthenticationPayload = this._validator.validatePutAuthenticationPayload(
      request.payload
    );

    const { refreshToken } = validatedPutAuthenticationPayload;

    await this._authenticationsService.verifyRefreshToken(refreshToken);
    const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this._tokenManager.generateAccessToken({ id, exp: 15 });

    const response = h.response({
      status: 'success',
      message: 'Access Token berhasil diperbarui',
      data: {
        accessToken,
      },
    });
    response.code(200);

    return response;
  }

  async deleteAuthenticationHandler(request, h) {
    const validatedDeleteAuthenticationPayload =
      this._validator.validateDeleteAuthenticationPayload(request.payload);

    const { refreshToken } = validatedDeleteAuthenticationPayload;

    await this._authenticationsService.verifyRefreshToken(refreshToken);
    await this._authenticationsService.deleteRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    });
    response.code(200);

    return response;
  }
}

module.exports = AuthenticationsHandler;
