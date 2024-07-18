import mongoose from "mongoose";
const JobScheme = mongoose.Schema(
  {
    company: { type: String, required: true },
    title: { type: String, required: true },
    companyIcon: { type: String, default: "" },
    companyIconPublicId: { type: String, default: "" },
    companyIconBg: { type: String, default: "#383E56" },
    date: { type: String, required: true },
    points: { type: [String], required: true },
  },
  { timestamps: true }
);
export default mongoose.model("Job", JobScheme);
