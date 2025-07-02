const mongoose = require("mongoose");

//
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Vui lòng nhập tiêu đề công việc"],
      trim: true, // Loại bỏ khoảng trắng thừa
      minlength: [6, "Tiêu đề công việc phải có ít nhất 3 ký tự"], // Đặt độ dài tối thiểu cho tiêu đề công việc
    },
    description: {
      type: String,
      required: [true, "Vui lòng nhập mô tả công việc"],
      trim: true, // Loại bỏ khoảng trắng thừa
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
      required: [true, "Vui lòng nhập ngày hết hạn công việc"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Sử dụng ObjectId để liên kết với người dùng
      ref: "User", // Liên kết với mô hình User
      required: true, // Bắt buộc phải có userId
    },
    createdAt: {
      type: Date,
      default: Date.now, // Tự động gán thời gian tạo
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Tự động gán thời gian cập nhật
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
