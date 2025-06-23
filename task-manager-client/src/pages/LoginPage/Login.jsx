import React from 'react';
import './Login.css'; // Assuming you have some styles for the Login page
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; // Library for data validation
import * as yup from 'yup';
import axios from 'axios'; // For making HTTP requests
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Please enter your email'),
  password: yup.string().required('Please enter your password'),
});

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input className="w-full p-2 border" placeholder="Email" {...register("email")} />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input type="password" className="w-full p-2 border" placeholder="Password" {...register("password")} />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Đăng nhập</button>
      </form>
    </div>
  );
}
export default Login;