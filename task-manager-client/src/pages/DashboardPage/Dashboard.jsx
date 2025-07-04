import { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "../../components/TaskForm";
import TaskItem from "../../components/TaskItem";
import TaskStats from "../../components/TaskStats";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      let data = res.data;

      if (statusFilter !== "all") {
        data = data.filter((task) => task.status === statusFilter);
      }

      if (priorityFilter !== "all") {
        data = data.filter((task) => task.priority === priorityFilter);
      }

      setTasks(data);
    } catch (err) {
      alert("Lỗi khi tải danh sách task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, priorityFilter]);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Quản lý công việc</h1>

      <div className="flex gap-4 mb-4 items-start justify-between">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-black p-2 border">
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Đang chờ</option>
          <option value="overdue">Quá hạn</option>
          <option value="completed">Hoàn thành</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="bg-black p-2 border">
          <option value="all">Tất cả mức độ</option>
          <option value="low">Thấp</option>
          <option value="medium">Trung bình</option>
          <option value="high">Cao</option>
        </select>

        <input
          type="text"
          placeholder="Tìm kiếm công việc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-black p-2 border pr-2"
        />
      </div>

      {loading ? (
        <p>Đang tải...</p>
      ) : tasks.length === 0 ? (
        <p>Không có công việc nào phù hợp.</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {tasks
            .filter(
              (task) =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            )
            .map((task) => (
              <TaskItem key={task._id} task={task} onChange={fetchTasks} />
            ))}
        </ul>
      )}
      <TaskStats />
      <TaskForm onTaskCreated={fetchTasks} />
    </div>
  );
}

export default Dashboard;
