import mongoose from "mongoose";
const {Schema} = mongoose

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: String,
  status: {
    type: String,
    enum: ["In Progress", "Todo", "In Review", "Completed"],
    default: "Todo",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
});
const Task = mongoose.model("Task", taskSchema);

export default Task;
