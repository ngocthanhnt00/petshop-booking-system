import mongoose from 'mongoose';
import category from './category.model.js';
import { ProductStatus } from '../enums/product.enum.js';
const schema = mongoose.Schema;
const productSchema = new schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    prire: {
      type: String,
      required: true
    },
    category_id: {
      type: schema.Types.ObjectId,
      ref: category,
      autopopulate: true, // .populate allow to access data of Object references
      required: [true, 'category_id is required']
    },
    image_url: {
      type: String
    },
    brand_id: {
      type: String,
      required: [true, 'brand_id is required']
    },
    status: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.AVAILABLE
    }
  },
  { timestamps: true }
);

const productModel = mongoose.models.product || mongoose.model('product', productSchema);

export default productModel;
