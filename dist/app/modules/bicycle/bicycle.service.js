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
exports.ProductNOrderServices = void 0;
const bicycle_model_1 = require("./bicycle.model");
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bicycle_model_1.Product.create(productData);
    return result;
});
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bicycle_model_1.Product.find();
    return result;
});
const getSingleProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bicycle_model_1.Product.findById(productId);
    return result;
});
const updateProductInDB = (productId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bicycle_model_1.Product.findByIdAndUpdate(productId, {
        $set: payload,
    }, { new: true, runValidators: true });
    return result;
});
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bicycle_model_1.Product.updateOne({ productId }, { isDeleted: true });
    return result;
});
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bicycle_model_1.Product.findById(orderData.product);
    if (!result) {
        throw new Error("Product not found");
    }
    if (!result.inStock) {
        throw new Error("Product is out of stock");
    }
    if (result.quantity < orderData.quantity) {
        throw new Error(`Insufficient stock. Only ${result.quantity} units left`);
    }
    // const totalPrice = result.price * orderData.quantity;
    //create order
    const order = yield bicycle_model_1.Order.create(orderData);
    //update product inventory
    yield bicycle_model_1.Product.findByIdAndUpdate(orderData.product, {
        $inc: { quantity: -orderData.quantity },
        $set: {
            inStock: result.quantity - orderData.quantity > 0,
        },
    }, { new: true, runValidators: true });
    return order;
});
const calculateRevenueFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bicycle_model_1.Order.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "product",
                foreignField: "_id",
                as: "productDetails",
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: { $multiply: ["$totalPrice", "$quantity"] } },
            },
        },
        {
            $project: {
                _id: 0,
                totalRevenue: 1,
            },
        },
    ]);
    return result[0] || { totalRevenue: 0 };
});
exports.ProductNOrderServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductInDB,
    deleteProductFromDB,
    createOrderIntoDB,
    calculateRevenueFromDB,
};
