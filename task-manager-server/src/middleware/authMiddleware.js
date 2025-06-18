const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware để bảo vệ các route yêu cầu xác thực
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Lấy token từ header Authorization
      token = req.headers.authorization.split(" ")[1];

      // Giải mã token và lấy thông tin người dùng
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Kiểm tra người dùng trong cơ sở dữ liệu
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error("Token không hợp lệ:", error);
      res.status(401).json({ message: "Không được phép, token không hợp lệ" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Không được phép, không có token" });
  }
};

module.exports = { protect };
