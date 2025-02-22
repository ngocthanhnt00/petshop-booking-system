import { UserRoles, UserStatus } from '../enums/user.enum.js';

export interface IUser {
  _id: string;
  email: string;
  fullname: string;
  phoneNumber: string;
  password: string;
  phone_number: string;
  address: string;
  status: UserStatus;
  role: UserRoles;
  avatar_url: string;
  createdAt: Date;
  updatedAt: Date;
	reset_password_token?: string;
  reset_password_expires?: Date;
}
