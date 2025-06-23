import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from 'react'


import Login from './pages/LoginPage/Login.jsx'
import Register from './pages/RegisterPage/Register.jsx'
import Dashboard from './pages/DashboardPage/Dashboard.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
     <Router>
      <Routes>
        <Route path="/" element={<h1 className="text-center mt-10">Welcome to Task Manager</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  )
}

export default App
