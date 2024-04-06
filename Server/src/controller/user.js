import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { MongoServerError } from "mongodb";
import User from "../model/User.js";
import upload from "../middleware/multer.js";
const userRouter = express.Router();


userRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    let { fullName, email, password } = req.body;
    const image = req.file.filename;

    password = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password, image });
    await user.save();
    res.status(201).json({ message: "Successfully registered user" });
  } catch (err) {
    if (err.name === "ValidationError") {
      if (err.message.includes("required")) {
        const errorMessage = err.message.replace(
          /(.*)(Path `)(.*)(` is required)(.*)/,
          "$3 is required."
        );
        res.status(400).json({ error: errorMessage });
      }
    } else if (err instanceof MongoServerError && err.code === 11000) {
      let errorMessage = "";
      if (err.keyPattern.email) {
        errorMessage = "Email address is already registered.";
      } else {
        errorMessage = "Duplicate key error occurred.";
      }
      res.status(400).json({ error: errorMessage });
    } else {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (!existUser)
      return res.status(404).json({ error: "Didn't found the user" });

    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) return res.status(401).json({ error: "Wrong password" });

    const token = jwt.sign(
      {
        id: existUser._id,
        fullName: existUser.fullName,
        email: existUser.email,
      },
      "SKDFDLK09UU@@@SKDJDHF2233"
    );

    res.status(200).json({
      message: "Login success",
      token: token,
      fullName: existUser.fullName,
      image: existUser.image
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

userRouter.get("/verify", async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export { userRouter };
