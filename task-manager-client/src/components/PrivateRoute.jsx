// This file is used to protect private routes, allowing access only to logged-in users.
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000; // Current time in seconds

      if (decoded.exp < now) {
        localStorage.removeItem("token"); // Remove expired token
        return <Navigate to="/login" />;
      }

      return children;
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token"); // Remove invalid token
      return <Navigate to="/login" />;
    }
  }
  return <Navigate to="/login" />; // if no token or token is invalid, redirect to login
}

export default PrivateRoute;
