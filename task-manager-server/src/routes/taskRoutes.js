const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
} = require("../controllers/taskController");

const router = express.Router();

// router.post("/", createTask); // Create a new task
// router.get("/", getTasks); // Get all tasks
// router.get("/:id", getTaskById); // Get a task by ID
// router.put("/:id", updateTask); // Update a task by ID
// router.delete("/:id", deleteTask); // Delete a task by ID

router
  .route("/")
  .get(protect, getTasks) // Get all tasks
  .post(protect, createTask); // Create a new task

router.get("/stats", protect, getTaskStats); // Get task statistics

router
  .route("/:id")
  .get(protect, getTaskById) // Get a task by ID
  .put(protect, updateTask) // Update a task by ID
  .delete(protect, deleteTask); // Delete a task by ID

module.exports = router;
