import { model, Schema } from "mongoose";
import { TOrder, TProduct } from "./bicycle.interface";

const ProductSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    type: {
      type: String,
      enum: ["Mountain", "Road", "Hybrid", "BMX", "Electric"],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.isDeleted;
        return ret;
      },
    },
  }
);

const OrderSchema = new Schema<TOrder>(
  {
    email: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

ProductSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ProductSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ProductSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

ProductSchema.pre(
  ["updateOne", "updateMany", "findOneAndUpdate"],
  function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
  }
);

export const Product = model<TProduct>("Product", ProductSchema);
export const Order = model<TOrder>("Order", OrderSchema);
