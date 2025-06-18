const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Chào mừng bạn đến với trang Dashboard!",
    user: req.user, // Trả về thông tin người dùng đã xác thực
  });
});

module.exports = router;
