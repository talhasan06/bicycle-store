import ApiError from "../../handleError/ApiError";
import { TOrder, TProduct } from "./bicycle.interface";
import { Order, Product } from "./bicycle.model";

const createProductIntoDB = async (productData: TProduct) => {
  // Check if product with same name exists (case insensitive)
  const existingProduct = await Product.findOne({
    name: { $regex: new RegExp(`^${productData.name}$`, "i") },
  });

  if (existingProduct) {
    throw new ApiError(409, "Product with this name already exists");
  }

  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
  if (searchTerm) {
    const searchRegex = new RegExp(searchTerm, "i");
    const result = await Product.find({
      $or: [
        { name: searchRegex },
        { brand: searchRegex },
        { type: searchRegex },
      ],
    });
    return result;
  }
  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

const updateProductInDB = async (
  productId: string,
  payload: Partial<TProduct>
) => {
  const result = await Product.findByIdAndUpdate(
    productId,
    {
      $set: payload,
    },
    { new: true, runValidators: true }
  );
  return result;
};

const deleteProductFromDB = async (productId: string) => {
  const result = await Product.updateOne({ productId }, { isDeleted: true });
  return result;
};

const createOrderIntoDB = async (orderData: TOrder) => {
  const result = await Product.findById(orderData.product);

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
  const order = await Order.create(orderData);

  //update product inventory
  await Product.findByIdAndUpdate(
    orderData.product,
    {
      $inc: { quantity: -orderData.quantity },
      $set: {
        inStock: result.quantity - orderData.quantity > 0,
      },
    },
    { new: true, runValidators: true }
  );
  return order;
};

const calculateRevenueFromDB = async () => {
  const result = await Order.aggregate([
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
};

export const ProductNOrderServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
  createOrderIntoDB,
  calculateRevenueFromDB,
};
