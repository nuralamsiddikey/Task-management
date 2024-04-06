import express from "express";
import Task from "../model/Task.js";
const taskRouter = express.Router();

taskRouter.post("/", async (req, res) => {
  try {
    const { title, body, status } = req.body;
    if (!title) return res.status(422).json({ error: "Title is required" });
    const task = new Task({
      title,
      body,
      status,
      user: "660ee6d0b06f7c9faab05550",
    });
    await task.save();
    res.status(201).json({ message: "Successfully created task" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

taskRouter.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sortby = req.query.sort || "Descending";
  const status = req.query.status || "All";
  let sort = -1;

  try {
    const totalPosts = await Task.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    if (sortby === "Ascending") sort = 1;

    let query = {};
    if (status !== "All") {
      query.status = status;
    }

    const tasks = await Task.find(query)
      .populate("user", "-password")
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: sort })
      .exec();

    res.json({
      totalPosts,
      totalPages,
      currentPage: page,
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

taskRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(422).json({ error: "Required id" });
    await Task.deleteOne({ _id: id });
    res.json({ message: "Successfully deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

taskRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, status } = req.body;
    await Task.findByIdAndUpdate({ _id: id }, { title, body, status });

    res.json({ message: "Successfully updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export { taskRouter };
