"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bicycle_route_1 = require("./app/modules/bicycle/bicycle.route");
const globalErrorHandler_1 = __importDefault(require("./app/handleError/globalErrorHandler"));
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", bicycle_route_1.BicycleRoutes);
app.get("/", (req, res) => {
    res.send("Hello, Welcome to Bicycle Store!");
});
// 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API Not Found",
            },
        ],
    });
    next();
});
app.use(globalErrorHandler_1.default);
exports.default = app;
