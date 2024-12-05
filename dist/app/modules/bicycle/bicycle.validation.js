"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidationSchema = exports.ProductValidationSchema = exports.BicycleType = void 0;
const zod_1 = require("zod");
// Enum for Bicycle Types
exports.BicycleType = zod_1.z.enum([
    "Mountain",
    "Road",
    "Hybrid",
    "BMX",
    "Electric",
]);
// Product Validation Schema
exports.ProductValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    brand: zod_1.z.string().min(1, "Brand is required"),
    price: zod_1.z.number().positive("Price must be greater than 0"),
    type: exports.BicycleType,
    description: zod_1.z.string(),
    quantity: zod_1.z.number().int().nonnegative("Quantity must be 0 or more"),
    inStock: zod_1.z.boolean(),
    isDeleted: zod_1.z.boolean(),
});
// Order Validation Schema
exports.OrderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    product: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
    quantity: zod_1.z.number().int().positive("Quantity must be greater than 0"),
    totalPrice: zod_1.z.number().positive("Total price must be greater than 0"),
});
