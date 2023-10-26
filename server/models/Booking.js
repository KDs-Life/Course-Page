import mongoose from "mongoose";
//TODO: add fields for calculating free slots and admin-dashboard-functions
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
  },
  bookedSlots: {
    type: Number,
  },
});

export default mongoose.model("Booking", bookingSchema);
