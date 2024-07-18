/*
200 OK OK
201 CREATED Created
400 BAD_REQUEST Bad Request
401 UNAUTHORIZED Unauthorized
403 FORBIDDEN Forbidden
404 NOT_FOUND Not Found
500 INTERNAL_SERVER_ERROR Internal Server Error
*/

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}
export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthenticatedError";
    this.statusCode = 401;
  }
}
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 403;
  }
}
