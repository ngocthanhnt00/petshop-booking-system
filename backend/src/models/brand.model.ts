import mongoose, { Schema, model } from 'mongoose';
import { IBrand } from '../interfaces/brand.interface';

const brandSchema: Schema<IBrand> = new Schema<IBrand>({
  brand_name: {
    type: String,
    default: ''
  }
});

const brandModel = mongoose.models.brand || model('brand', brandSchema);

export default brandModel;
