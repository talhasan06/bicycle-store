"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("./ApiError"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorMessages = [];
    if (error instanceof zod_1.ZodError) {
        message = "Validation failed";
        statusCode = 400;
        errorMessages = error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
        }));
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = [{ path: "", message: error.message }];
    }
    else if (error instanceof mongoose_1.Error.CastError) {
        statusCode = 400;
        message = "Invalid ID";
        errorMessages = [{ path: error.path, message: "Invalid ID" }];
    }
    else if (error instanceof mongoose_1.Error) {
        message = error.message;
        errorMessages = [{ path: "", message: error.message }];
    }
    res.status(statusCode).json({
        message,
        success: false,
        errorMessages,
        stack: process.env.NODE_ENV !== "production" ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
