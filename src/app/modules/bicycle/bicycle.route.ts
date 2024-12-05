import express from "express";
import { ProductController } from "./bicycle.controller";

const router = express.Router();

//will call controller function

router.get("/products", ProductController.getAllProducts);
router.get("/products/:productId", ProductController.getSingleProduct);
router.get("/orders/revenue", ProductController.calculateRevenue);
router.post("/orders", ProductController.createOrder);
router.post("/products", ProductController.createProduct);
router.put("/products/:productId", ProductController.updateProduct);
router.delete("/products/:productId", ProductController.deleteProduct);

export const BicycleRoutes = router;
