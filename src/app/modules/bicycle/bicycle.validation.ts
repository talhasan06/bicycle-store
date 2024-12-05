import { z } from "zod";

// Enum for Bicycle Types
export const BicycleType = z.enum([
  "Mountain",
  "Road",
  "Hybrid",
  "BMX",
  "Electric",
]);

// Product Validation Schema
export const ProductValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.number().positive("Price must be greater than 0"),
  type: BicycleType,
  description: z.string(),
  quantity: z.number().int().nonnegative("Quantity must be 0 or more"),
  inStock: z.boolean(),
  isDeleted: z.boolean(),
});

// Order Validation Schema
export const OrderValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
  product: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
  quantity: z.number().int().positive("Quantity must be greater than 0"),
  totalPrice: z.number().positive("Total price must be greater than 0"),
});
