import mongoose from "mongoose";
/**
Order number (objectid from mongoose)
Order Date
Activityid
Quantity
PriceSingle
Payment methods

 */

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
  },
  orderdate: { type: Date, default: Date.now },
  quantity: { type: Number, default: -1 },
  price: { type: Number },
});

export default mongoose.model("Booking", bookingSchema);
