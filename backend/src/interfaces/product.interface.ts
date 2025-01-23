import { ObjectId } from 'mongoose';
import { ProductStatus } from '../enums/product.enum.js';
import { ICategory } from './category.interface.js';
import { IBrand } from './brand.interface.js';

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: string;
  category_id: ICategory;
  image_url: string;
  brand_id: IBrand;
  createdAt: Date;
  updatedAt: Date;
  status: ProductStatus;
}
