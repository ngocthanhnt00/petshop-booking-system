import mongoose, { Schema, model } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';

const categorySchema: Schema<ICategory> = new Schema<ICategory>({
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  is_hidden: {
    type: Boolean,
    default: false
  }
});

const categoryModel = mongoose.models.category || model('category', categorySchema);

export default categoryModel;
