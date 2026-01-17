import mongoose from "mongoose";
import { APIError } from "../utils/APIError.js";

const errorHanlder = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof APIError)) {
    const statusCode = error.statusCode || error instanceof mongoose.Error ? 400 : 500;
    const message = error.message || "Internal Server Error";
    error = new APIError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    ...error,
    message: error.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };
  return res.status(error.statusCode).json(response);
};

export { errorHanlder };
