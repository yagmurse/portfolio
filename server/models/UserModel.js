import mongoose from "mongoose";
const UserScheme = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

export default mongoose.model("User", UserScheme);
