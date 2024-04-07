import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";

import path from "path";
import cors from "cors";
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/techzu");
}

main()
  .then(() => console.log("DBConnection success"))
  .catch((error) => console.log("DBConnection failed!!", error));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "./uploads")));

import { taskRouter } from "./src/controller/task.js";
import { userRouter } from "./src/controller/user.js";
import { IsAuthenticate } from "./src/middleware/authenticate.js";

app.use("/task", IsAuthenticate, taskRouter);
app.use("/user", userRouter);

app.listen(port, () => console.log(`Server is listeing at port ${port}`));
