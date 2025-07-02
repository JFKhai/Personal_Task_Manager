const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Đây là thư viện để mã hóa mật khẩu

// Tạo một schema cho người dùng
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Vui lòng nhập tên người dùng"],
      //unique: true, // Đảm bảo tên người dùng là duy nhất
      trim: true, // Loại bỏ khoảng trắng thừa
      minlength: [6, "Tên người dùng phải có ít nhất 6 ký tự"], // Đặt độ dài tối thiểu cho tên người dùng
    },
    email: {
      type: String,
      required: [true, "Vui lòng nhập email"],
      unique: true, // Đảm bảo email là duy nhất
      trim: true,
      lowercase: true, // Chuyển đổi email về chữ thường
      match: [/^\S+@\S+\.\S+$/, "Vui lòng nhập địa chỉ email hợp lệ"], // Kiểm tra định dạng email
    },
    password: {
      type: String,
      required: [true, "Vui lòng nhập mật khẩu"],
      minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"], // Đặt độ dài tối thiểu cho mật khẩu
    },
  },
  {
    timeseries: true, // Thêm trường thời gian để theo dõi thời gian tạo và cập nhật
  }
);

// Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Nếu mật khẩu không thay đổi, bỏ qua bước mã hóa

  const salt = await bcrypt.genSalt(10); // Tạo một salt với độ dài 10
  this.password = await bcrypt.hash(this.password, salt); // Mã hóa mật khẩu với salt
  next(); // Tiếp tục với bước tiếp theo
});

// Phương thức để so sánh mật khẩu khi đăng nhập
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // So sánh mật khẩu đã mã hóa với mật khẩu người dùng nhập vào
};

module.exports = mongoose.model("User", userSchema); // Xuất mô hình người dùng để sử dụng trong các phần khác của ứng dụng
