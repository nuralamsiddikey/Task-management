import express from "express";
import User from "../model/User.js";
const userRouter = express.Router();


userRouter.post("/", async (req, res) => {
  try {
    const { fullName,email,password } = req.body;

    const user = new User({ fullName,email,password});
    await user.save();
    res.status(201).json({ message: "Successfully registered user" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


export{userRouter}