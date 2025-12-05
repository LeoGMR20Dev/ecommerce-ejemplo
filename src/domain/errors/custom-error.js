class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

class ValidationError extends CustomError {
  constructor(message = "Validation error") {
    super(message, 400);
  }
}

class NotFoundError extends CustomError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

class ConflictError extends CustomError {
  constructor(message = "Resource already exists") {
    super(message, 409);
  }
}

module.exports = { CustomError, ValidationError, NotFoundError, ConflictError };
