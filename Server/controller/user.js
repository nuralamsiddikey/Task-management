import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

import User from "../model/User.js";
const userRouter = express.Router();




userRouter.post("/", async (req, res) => {
  try {
    let { fullName, email, password } = req.body;

    password = await bcrypt.hash(password || "", 10);
    const user = new User({ fullName, email, password });
    await user.save();
    res.status(201).json({ message: "Successfully registered user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


userRouter.post("/login", async (req, res) => {
  try {
    const {email,password} = req.body
    const existUser = await User.findOne({email})
   
    if(!existUser) return res.status(404).json({error:"Didn't found the user"})

     const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) return res.status(401).json({error: "Wrong password"});

    const token = jwt.sign(
      {
        userName: existUser.userName,
        email: existUser.email,
      },
      "SKDFDLK09UU@@@SKDJDHF2233"
    );

    res.status(200).json({
      message: "Login success",
      token: token,
      userName: existUser.fullName
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



userRouter.get('/verify',async(req,res)=> {
  try {

  }catch(err){
    res.status(500).json({ error: err.message });
  }
})

export { userRouter };
