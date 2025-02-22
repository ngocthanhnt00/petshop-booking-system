import mongoose, { Schema, model } from 'mongoose';
import { ICategory } from '../interfaces/category.interface';
import { CategoryStatus } from '../enums/category.enum';

const categorySchema: Schema<ICategory> = new Schema<ICategory>({
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: CategoryStatus,
    default: CategoryStatus.ACTIVE
  }
});

const categoryModel = mongoose.models.category || model('category', categorySchema);

export default categoryModel;
