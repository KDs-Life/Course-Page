import mongoose from "mongoose";

//TODO: define schema properties

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  accessToken: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bookings: [],
  phone: {},
});
export default mongoose.model("User", userSchema);
