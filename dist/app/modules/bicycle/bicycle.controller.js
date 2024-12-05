"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const bicycle_validation_1 = require("./bicycle.validation");
const bicycle_service_1 = require("./bicycle.service");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product: productData } = req.body;
        const zodParsedData = bicycle_validation_1.ProductValidationSchema.parse(productData);
        const result = yield bicycle_service_1.ProductNOrderServices.createProductIntoDB(zodParsedData);
        res.status(200).json({
            message: "Bicycle created successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bicycle_service_1.ProductNOrderServices.getAllProductsFromDB();
        if (!result) {
            res.status(404).json({
                success: false,
                message: "No product found",
                data: {},
            });
        }
        res.status(200).json({
            message: "Bicycles retrieved successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield bicycle_service_1.ProductNOrderServices.getSingleProductFromDB(productId);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Product not found",
                data: {},
            });
        }
        res.status(200).json({
            message: "Bicycle retrieved successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        const zodParsedData = bicycle_validation_1.ProductValidationSchema.partial().parse(updateData);
        const result = yield bicycle_service_1.ProductNOrderServices.updateProductInDB(productId, zodParsedData);
        if (!result) {
            res.status(404).json({
                message: "Product not found",
                success: false,
                data: {},
            });
        }
        res.status(200).json({
            message: "Bicycle updated successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.studentId;
        yield bicycle_service_1.ProductNOrderServices.deleteProductFromDB(studentId);
        res.status(200).json({
            message: "Bicycle deleted successfully",
            status: true,
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
});
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield bicycle_service_1.ProductNOrderServices.createOrderIntoDB(req.body);
        res.status(201).json({
            message: "Order created successfully",
            status: true,
            data: order,
        });
    }
    catch (error) {
        next(error);
    }
});
const calculateRevenue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bicycle_service_1.ProductNOrderServices.calculateRevenueFromDB();
        res.status(200).json({
            message: "Revenue calculated successfully",
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createOrder,
    calculateRevenue,
};
