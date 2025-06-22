const express = require("express"); // Để tạo ứng dụng Express
const cors = require("cors"); // Để cho phép frontend truy cập API
const morgan = require("morgan"); // Để ghi log HTTP requests (tuỳ chọn)
const authRoutes = require("./src/routes/authRoutes"); // Import các route liên quan đến xác thực
const protectedRoutes = require("./src/routes/protectRoutes"); // Import các route được bảo vệ

const testRoutes = require("./src/routes/testRoutes"); // Import test routes

const app = express(); // Tạo ứng dụng Express

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/protected", protectedRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
});

// 404 Nếu không tìm thấy route
app.use((req, res) => {
  res.status(404).json({ message: "Route not Found" });
});

module.exports = app; // Export ứng dụng Express để sử dụng trong các file khác
