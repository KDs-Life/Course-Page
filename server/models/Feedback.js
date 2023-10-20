import mongoose from "mongoose";

// TODO: define schema properties

const feedbackSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  rating: {},
  text: {},
});

export default mongoose.model("Feedback", feedbackSchema);
