import express from "express";
import configs from "../config/config.js";
import generalModel from "../models/general.js";

const newsListRouter = express.Router();

newsListRouter.get("/", async (req, res) => {
  try {
    const generalDocument = await generalModel.find();
    const sourceSet = new Set();
    generalDocument.forEach((entry) => {
      if (entry.source) {
        sourceSet.add(entry.source);
      }
    });
    const values = Array.from(sourceSet);
    if (values.length > 0) {
      res.status(200).json({"newsList" :values});
    } else {
      res.status(404).json({ message: "No News List found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default newsListRouter;
