import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true, unique: true },
    type: { type: String, enum: ['single', 'double', 'suite'], required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['available', 'occupied', 'cleaning', 'maintenance'], default: 'available' },
    amenities: { type: [String] }
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);
export default Room;
