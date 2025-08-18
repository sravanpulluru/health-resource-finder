import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
