import mongoose from "mongoose";

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
  date: {
    type: Date,
    default: Date.now,
  },
  bookings: [],
});
export default mongoose.model("User", userSchema);
