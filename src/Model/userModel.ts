import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: String,
    password: String,
    nickname: String,
    date: String,
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

const User = mongoose.model('User', userSchema);

export default User;
