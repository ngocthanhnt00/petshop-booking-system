import mongoose, { Schema, model } from 'mongoose';
import category from './category.model.js';
import { ProductStatus } from '../enums/product.enum.js';
import { IProduct } from '../interfaces/product.interface.js';
import brand from './brand.model.js';
const productSchema: Schema<IProduct> = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: category,
      autoPopulate: true, // .populate allow to access data of Object references
      required: [true, 'category_id is required']
    },
    image_url: {
      type: String
    },
    brand_id: {
      type: Schema.Types.ObjectId,
      ref: brand,
      autoPopulate: true,
      required: [true, 'brand_id is required']
    },
    status: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.AVAILABLE
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    quantity_sold: {
      type: Number,
      min: 0,
      default: 0
    }
  },
  { timestamps: true }
);

const productModel = mongoose.models.product || model('product', productSchema);

export default productModel;
