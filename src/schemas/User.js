import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'manager', 'receptionist', 'housekeeping', 'guest'], required: true },
    contact: { type: String },
    preferences: { type: Object }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
