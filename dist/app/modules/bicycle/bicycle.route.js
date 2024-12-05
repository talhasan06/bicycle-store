"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BicycleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bicycle_controller_1 = require("./bicycle.controller");
const router = express_1.default.Router();
//will call controller function
router.get("/products", bicycle_controller_1.ProductController.getAllProducts);
router.get("/products/:productId", bicycle_controller_1.ProductController.getSingleProduct);
router.get("/orders/revenue", bicycle_controller_1.ProductController.calculateRevenue);
router.post("/orders", bicycle_controller_1.ProductController.createOrder);
router.post("/products", bicycle_controller_1.ProductController.createProduct);
router.put("/products/:productId", bicycle_controller_1.ProductController.updateProduct);
router.delete("/products/:productId", bicycle_controller_1.ProductController.deleteProduct);
exports.BicycleRoutes = router;
