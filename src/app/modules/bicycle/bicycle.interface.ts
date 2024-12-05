import { Types } from "mongoose";

export type cycleType = "Mountain" | "Road" | "Hybrid" | "BMX" | "Electric";

export type TProduct = {
  name: string;
  brand: string;
  price: number;
  type: cycleType;
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
};

export type TOrder = {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
};
