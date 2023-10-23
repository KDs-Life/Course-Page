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
  bookings: [],
  phone: {
    type: Number,
  },
  firstname: {
    type: String,
  },
  lastname: {type: String},
  address: {
    Street: {type: String},
    Housenumber: {type: Number},
    ZIP: {type: Number},
    City: {type: String},
    Country: {type: String},
  },
  role: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("User", userSchema);
