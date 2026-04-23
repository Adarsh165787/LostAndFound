import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    description: { type: String, default: "" },
    type: { type: String, required: true },
    location: { type: String, required: true },
    contactInfo: { type: String, default: "" },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);