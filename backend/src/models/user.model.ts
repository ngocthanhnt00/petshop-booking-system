import mongoose, { Schema, model } from 'mongoose';
import { UserRoles, UserStatus } from '../enums/user.enum.js';
import { IUser } from '../interfaces/user.interface.js';
import product from './product.model.js';
const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      default: ''
    },
    fullname: {
      type: String,
      required: false,
      default: ''
    },
    password: {
      type: String,
      required: true
    },
    phone_number: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: UserStatus.ACTIVE
    },
    role: {
      type: String,
      default: UserRoles.USER
    },
    avatar: {
      type: String
    },
    cart: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: product,
            required: true
          },
          quantity: { type: Number, default: 1 }
        }
      ],
      default: []
    },
    reset_password_token: {
      type: String,
      default: ''
    },
    reset_password_expires: {
      type: Date,
      default: null
    },
    refreshToken: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

const userModel = mongoose.models.user || model('user', userSchema);

export default userModel;
