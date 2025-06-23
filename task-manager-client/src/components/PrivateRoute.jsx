// file này dùng để bảo vệ các route riêng tư, chỉ cho phép người dùng đã đăng nhập truy cập

import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
