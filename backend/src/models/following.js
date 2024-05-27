import mongoose from "mongoose";

const followingSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    channels: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const followingModel = mongoose.model('Following', followingSchema);

export default followingModel;
