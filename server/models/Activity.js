import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  active: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: Date,
  },
  minSlots: {
    type: Number,
  },
  maxSlots: {
    type: Number,
  },
  requirements: [
    {
      type: String,
    },
  ],
  address: {
    Street: { type: String },
    Housenumber: { type: Number },
    ZIP: { type: Number },
    City: { type: String },
    Country: { type: String },
  },
  images: [
    {
      url: { type: String },
      alt: { type: String },
    },
  ],
  price: {
    type: Number,
    default: 0,
  },
  category: [
    {
      type: String,
    },
  ],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Activity", activitySchema);
