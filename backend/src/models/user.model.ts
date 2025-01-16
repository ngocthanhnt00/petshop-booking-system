import mongoose from 'mongoose';
import { UserRoles, UserStatus } from '~/enums/user.enum.js';

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    user_name: {
      type: String,
      required: true
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
    }
  },
  { timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
