import { CategoryStatus } from '../enums/category.enum';

export interface ICategory {
  _id: string;
  name: string;
  description: string;
  status: CategoryStatus;
}
