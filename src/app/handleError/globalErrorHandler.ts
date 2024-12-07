import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { Error } from "mongoose";
import ApiError from "./ApiError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages: { path: string; message: string }[] = [];

  if (error instanceof ZodError) {
    message = "Validation failed";
    statusCode = 400;
    errorMessages = error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = [{ path: "", message: error.message }];
  } else if (error instanceof Error.CastError) {
    statusCode = 400;
    message = "Invalid ID";
    errorMessages = [{ path: error.path, message: "Invalid ID" }];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = [{ path: "", message: error.message }];
  }

  res.status(statusCode).json({
    message,
    success: false,
    errorMessages,
    stack: process.env.NODE_ENV !== "production" ? error?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
