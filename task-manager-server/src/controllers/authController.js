const User = require("../models/User");
const jwt = require("jsonwebtoken"); // Thư viện để tạo và xác thực token JWT

// Hàm tạo token JWT
const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME, // Thời gian sống của token
  });
};

// [POST] /api/auth/register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Kiểm tra xem email đã tồn tại chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    // Tạo người dùng mới
    const user = await User.create({ username, email, password });

    // Tạo token cho người dùng
    const token = createToken(user._id);

    // Trả về thông tin người dùng và token
    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Lỗi đăng ký:", error.message);
    res.status(500).json({ message: "Đăng ký thất bại", error: error.message });
  }
};

// [POST] api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    // Tạo token cho người dùng
    const token = createToken(user._id);

    // Trả về thông tin người dùng và token
    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
    res
      .status(500)
      .json({ message: "Đăng nhập thất bại", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
