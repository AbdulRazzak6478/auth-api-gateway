const { StatusCodes } = require("http-status-codes");

const { ErrorResponse} = require('../utils/common');
const AppError = require("../utils/errors/app-error");

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    ErrorResponse.message =  'Something went wrong while Authenticating  User';
    ErrorResponse.error = new AppError(['email not found in onComing request in correct format'],StatusCodes.BAD_REQUEST)
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message =  'Something went wrong while Authenticating  User';
    ErrorResponse.error = new AppError(['password not found in onComing request in correct format'],StatusCodes.BAD_REQUEST)
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
    validateAuthRequest,
}
