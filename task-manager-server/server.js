const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app"); // Import ứng dụng Express từ app.js

// Load environment variables from .env file
dotenv.config(); // Load biến môi trường từ file .env

const PORT = process.env.PORT || 5000; // Lấy PORT từ biến môi trường hoặc mặc định là 5000

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    console.log("Connected to MongoDB");
    console.log("Đã kết nối thành công đến MongoDB");
    // Start server
    app.listen(PORT, () => {
      console.log(`Task Manager Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
