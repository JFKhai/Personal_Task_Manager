
import { useForm } from 'react-hook-form'; // Thư viện react-hook-form để quản lý form
import { yupResolver } from '@hookform/resolvers/yup'; // Thư viên yup để xác thực dữ liệu
import * as yup from "yup";
import axios from "axios"; // 
import { useNavigate } from "react-router-dom"; 

// Tạo schema xác thực với yup
const schema = yup.object().shape({
  username: yup.string().required("Vui lòng nhập tên"),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  password: yup.string().min(6, "Ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu")
});

function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  // Hàm xử lý khi người dùng gửi form đăng ký
  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input className="w-full p-2 border" placeholder="Username" {...register("username")} />
        <p className="text-red-500 text-sm">{errors.username?.message}</p>

        <input className="w-full p-2 border" placeholder="Email" {...register("email")} />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input type="password" className="w-full p-2 border" placeholder="Password" {...register("password")} />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Đăng ký</button>
      </form>
    </div>
  );
}
export default Register;