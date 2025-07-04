const Task = require("../models/Task");
const asyncHandler = require("express-async-handler"); // Thư viện để xử lý các lỗi bất đồng bộ

// [POST] /api/tasks
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  // Check if user is logged in
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Bạn cần đăng nhập để tạo công việc" });
  }
  if (!title || !description || !dueDate) {
    return res
      .status(400)
      .json({ message: "Vui lòng nhập đầy đủ thông tin công việc" });
  }
  try {
    // Create a new task
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      userId: req.user._id, // Save user ID from the logged-in user
    });

    res.status(201).json(task);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Tạo công việc thất bại", error: error.message });
  }
});

// [GET] /api/tasks
const getTasks = asyncHandler(async (req, res) => {
  // check if user is logged in
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Bạn cần đăng nhập để xem công việc" });
  }

  let tasks = await Task.find({ userId: req.user._id });

  const now = new Date();

  const updatePromises = tasks.map(async (task) => {
    if (
      task.dueDate &&
      new Date(task.dueDate) < now &&
      task.status !== "completed"
    ) {
      task.status = "overdue"; // Update status to overdue if due date has passed
      return task.save(); // Save the updated task
    }
    return task; // Return the task without changes
  });

  tasks = await Promise.all(updatePromises);

  res
    .status(200)
    .json(tasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)));
});

// [GET] /api/tasks/:id
const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if user is logged in
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Bạn cần đăng nhập để xem công việc" });
  }

  try {
    // Get task by ID
    const task = await Task.findOne({ _id: id, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ message: "Công việc không tồn tại" });
    }
    res.status(200).json(task);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Lấy công việc thất bại", error: error.message });
  }
});

// [PUT] /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority, dueDate } = req.body;

  // Check if user is logged in
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Bạn cần đăng nhập để cập nhật công việc" });
  }

  try {
    // Update task by ID
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { title, description, status, priority, dueDate },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Công việc không tồn tại" });
    }

    res.status(200).json(task);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Cập nhật công việc thất bại", error: error.message });
  }
});

// [DELETE] /api/tasks/:id
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if user is logged in
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Bạn cần đăng nhập để xóa công việc" });
  }

  try {
    // Delete task by ID
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ message: "Công việc không tồn tại" });
    }
    res.status(204).json();
  } catch (error) {
    res
      .status(400)
      .json({ message: "Xóa công việc thất bại", error: error.message });
  }
});

// [GET] /api/tasks/stats
const getTaskStats = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Check if user is logged in
  if (!userId) {
    return res
      .status(401)
      .json({ message: "Bạn cần đăng nhập để xem thống kê công việc" });
  }

  const total = await Task.countDocuments({ userId });
  const completed = await Task.countDocuments({
    userId,
    status: "completed",
  });
  const overdue = await Task.countDocuments({
    userId,
    status: "overdue",
  });
  const pending = await Task.countDocuments({
    userId,
    status: "pending",
  });

  res.status(200).json({
    total,
    completed,
    overdue,
    pending,
  });
});

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  getTaskStats,
  updateTask,
  deleteTask,
};
