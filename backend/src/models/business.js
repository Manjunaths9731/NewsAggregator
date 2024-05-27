import mongoose from "mongoose";

const businessSchema = mongoose.Schema(
  {
    source: { type: String, required: true },
    author: { type: String, default: "" },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    url: { type: String, required: true },
    urlToImage: { type: String, default: "" },
    publishedAt: { type: Date, required: true },
    content: { type: String, default: "" },
  },
  {
    collection: "business",
  }
);

const businessModel = mongoose.model('Business', businessSchema);

export default businessModel;