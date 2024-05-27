import express from "express";
import followingModel from "../models/following.js";

const followingRouter = express.Router();

followingRouter.post("/", async (req, res) => {
  try {
    const { email, channel } = req.body;
    if (!email || !channel) {
      return res
        .status(400)
        .json({ message: "Email and channel are required" });
    }

    let user = await followingModel.findOne({ email });
    if (user) {
      if (!user.channels.includes(channel)) {
        user.channels.push(channel);
        await user.save();
        res
          .status(200)
          .json({ message: "Channel added to following list", user });
      } else {
        res
          .status(200)
          .json({ message: "Channel is already in the following list", user });
      }
    } else {
      user = new followingModel({ email, channels: [channel] });
      await user.save();
      res.status(201).json({ message: "Channel added", user });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

followingRouter.delete("/", async (req, res) => {
  try {
    const { email, channel } = req.body;
    if (!email || !channel) {
      return res
        .status(400)
        .json({ message: "Email and channel are required" });
    }

    let user = await followingModel.findOne({ email });
    if (user) {
      if (user.channels.includes(channel)) {
        user.channels = user.channels.filter((ch) => ch !== channel);
        await user.save();
        res
          .status(200)
          .json({ message: "Channel removed from following list", user });
      } else {
        res
          .status(200)
          .json({ message: "Channel not found in the following list", user });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

followingRouter.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    let user = await followingModel.findOne({ email });
    if (user) {
      res
        .status(200)
        .json({ channels: user.channels});
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default followingRouter;
