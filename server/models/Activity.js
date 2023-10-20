import mongoose from "mongoose";

// TODO: define schema properties

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  startDate: {},
  minSlots: {},
  maxSlots: {},
  requirements: {},
  address: {},
  images: [{}],
  price: {},
  category: [{}],
  publishedDate: {},
});
export default mongoose.model("Activity", activitySchema);
