import mongoose, { Schema, model } from 'mongoose';
import { UserRoles, UserStatus } from '../enums/user.enum.js';
import { IUser } from '../interfaces/user.interface.js';

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    fullname: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true
    },
    phone_number: {
      type: String
    },
    address: {
      type: String
    },
    status: {
      type: String,
      default: UserStatus.ACTIVE
    },
    role: {
      type: String,
      default: UserRoles.USER
    },
    avatar_url: {
      type: String
    },
	reset_password_token:{
		type: String
	},
	reset_password_expires:{
		type: Date
	}
  },
  { timestamps: true }
);

const userModel = mongoose.models.user || model('user', userSchema);

export default userModel;
