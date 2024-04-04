import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

async function main() {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/techzu"
  );
}

main()
  .then(() => console.log("DBConnection success"))
  .catch((error) => console.log("DBConnection failed!!", error));



import { taskRouter } from "./controller/task.js";
import { userRouter } from "./controller/user.js";
app.use("/task",taskRouter)
app.use("/user",userRouter)



app.listen(port, () => console.log(`Server is listeing at port ${port}`));
