import mongoose from "mongoose";

//TODO: define schema properties

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  accessToken: [String],
  bookings: [],
  phone: {},
  firstname: {},
  lastname: {},
  address: {},
  role: {},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("User", userSchema);
