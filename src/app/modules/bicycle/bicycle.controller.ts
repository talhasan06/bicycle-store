import { RequestHandler } from "express";
import { ProductValidationSchema } from "./bicycle.validation";
import { ProductNOrderServices } from "./bicycle.service";

const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const { product: productData } = req.body;

    const zodParsedData = ProductValidationSchema.parse(productData);

    const result =
      await ProductNOrderServices.createProductIntoDB(zodParsedData);

    res.status(200).json({
      message: "Bicycle created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProducts: RequestHandler = async (req, res, next) => {
  try {
    const result = await ProductNOrderServices.getAllProductsFromDB();
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
  } catch (error) {
    next(error);
  }
};

const getSingleProduct: RequestHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const result =
      await ProductNOrderServices.getSingleProductFromDB(productId);

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
  } catch (error) {
    next(error);
  }
};

const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const zodParsedData = ProductValidationSchema.partial().parse(updateData);

    const result = await ProductNOrderServices.updateProductInDB(
      productId,
      zodParsedData
    );

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
  } catch (error) {
    next(error);
  }
};

const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;

    await ProductNOrderServices.deleteProductFromDB(studentId);

    res.status(200).json({
      message: "Bicycle deleted successfully",
      status: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const createOrder: RequestHandler = async (req, res, next) => {
  try {
    const order = await ProductNOrderServices.createOrderIntoDB(req.body);

    res.status(201).json({
      message: "Order created successfully",
      status: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const calculateRevenue: RequestHandler = async (req, res, next) => {
  try {
    const result = await ProductNOrderServices.calculateRevenueFromDB();

    res.status(200).json({
      message: "Revenue calculated successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createOrder,
  calculateRevenue,
};
