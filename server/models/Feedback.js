import mongoose from "mongoose";

// TODO: define schema properties

const feedbackSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  rating: {
    type: Number,
  },
  text: {
    type: String,
  },
});

export default mongoose.model("Feedback", feedbackSchema);
