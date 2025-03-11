const APIError = require("../util/APIError");

const errorhandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle Mongoose ValidationError
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((error) => error.message);
    return res.status(400).json({
      status: "failure",
      message: "Validation Error",
      errors, // Include detailed error messages
    });
  }

  // Handle Mongoose CastError (e.g., invalid ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      status: "failure",
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ status: "failure", message: "Unauthorized" });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ status: "failure", message: "Token expired" });
  }

  // Handle Mongoose DuplicateKeyError (e.g., duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      status: "failure",
      message: `Duplicate field value: ${field}. Please use another value.`,
    });
  }

  // Handle custom APIError
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      status: "failure",
      message: err.message,
    });
  }

  // Handle all other errors
  res.status(500).json({
    status: "failure",
    message: "Internal Server Error",
  });
};

module.exports = errorhandler;