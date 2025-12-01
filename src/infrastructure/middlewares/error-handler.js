const { CustomError } = require("../../domain/errors/custom-error");

function errorHandler(error, req, res, next) {
  console.error(error);

  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }

  res.status(500).json({
    message: "An error ocurred. Check the logs for more information",
  });
}

module.exports = errorHandler;
