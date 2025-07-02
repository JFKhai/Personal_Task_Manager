
# Tổng quan dự án
- Tên dự án: Personal Task Manager
- Tech Stack: React.js (Frontend) + Node.js/Express (Backend) + MongoDB/PostgreSQL
- Mục tiêu: Tạo ứng dụng quản lý công việc cá nhân với đầy đủ tính năng authentication và CRUD

# Kiến trúc hệ thống
## Frontend (React.js)
  - Framework:          React 18+ với hooks 
  - Styling:            Tailwind CSS hoặc Material-UI
  - State Management:   Context API hoặc Redux Toolkit
  - Routing:            React Router DOM
  - HTTP Client:        Axios
  - Form Handling:      React Hook Form + Yup validation

## Backend (Node.js)
  - Framework:          Express.js
  - Database:           MongoDB với Mongoose
  - Authentication:     JWT (JSON Web Token)
  - Security:           bcrypt, helmet, cors, express-rate-limit
  - Environment:        dotenv
  - API Documentation:  Swagger (tùy chọn)

# Cấu trúc thư mục

# Roadmap phát triển

## Phase 1: Setup và Authentication (2-3 ngày)
### Backend:
 - Setup Express server với middleware cơ bản
 - Kết nối database (MongoDB/PostgreSQL)
 - Tạo User model với schema validation
 - Implement registration/login endpoints
 - JWT token generation và middleware protection
 - Password hashing với bcrypt
### Frontend:
 - Setup React app với routing
 - Tạo trang Login/Register với form validation
 - Implement authentication context
 - Protected routes cho authenticated users
 - Token storage và auto-logout

## Phase 2: Core CRUD Features (3-4 ngày)
### Backend:
 - Tạo Task model với relationship tới User
 - CRUD API endpoints cho tasks
 - Filtering và sorting tasks by status
 - Input validation và error handling

### Frontend:
 - Dashboard hiển thị danh sách tasks
 - Form thêm/sửa task với date picker
 - Task item component với actions (edit, delete, toggle)
 - Modal/popup cho task details
 - Loading states và error handling