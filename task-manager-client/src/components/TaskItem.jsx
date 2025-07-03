import { useState } from "react";
import axios from "axios";

function TaskItem({ task, onChange }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate
      ? (0, new Date(task.dueDate).toISOString().split("T")[0])
      : "",
  });

  // Function to handle task completion
  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc muốn xoá?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      onChange();
    } catch (err) {
      alert("Không thể xoá task");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/tasks/${task._id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEditing(false);
      onChange();
    } catch (err) {
      alert("Không thể cập nhật task");
    }
  };

  return (
    <li className="bg-black p-4 border rounded space-y-2">
      {editing ? (
        <form onSubmit={handleUpdate} className="space-y-2">
          <input
            className="w-full p-2 border"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            className="w-full p-2 border"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type="date"
            className="w-full p-2 border"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />

          <select
            className="bg-black w-full p-2 border"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}>
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-3 py-1 rounded">
              Lưu
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="bg-gray-300 px-3 py-1 rounded">
              Huỷ
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-medium text-white ${
                task.status === "completed"
                  ? "line-through text-gray-400"
                  : task.status === "overdue"
                  ? "text-blue-500" // overdue
                  : "text-yellow-600" // pending
              }`}>
              {task.title}
            </span>

            <span
              className={`text-xs px-2 py-0.5 rounded bg-opacity-20 ${
                task.priority === "high"
                  ? "bg-red-500 text-white"
                  : task.priority === "medium"
                  ? "bg-yellow-500 text-white"
                  : "bg-green-500 text-white"
              }`}>
              {task.priority}
            </span>
          </div>

          <p className="text-sm text-white">{task.description}</p>
          <p className="text-sm text-white">
            Hạn: {new Date(task.dueDate).toLocaleDateString()}
          </p>

          {/* Action buttons */}
          <div className="space-x-2">
            <button
              onClick={() => setEditing(true)}
              className="text-blue-500 hover:underline">
              Sửa
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:underline">
              Xoá
            </button>

            <button
              onClick={async () => {
                const nextStatus =
                  task.status === "pending"
                    ? "in_progress"
                    : task.status === "in_progress"
                    ? "completed"
                    : "pending";

                try {
                  await axios.put(
                    `http://localhost:5000/api/tasks/${task._id}`,
                    { status: nextStatus },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );
                  onChange();
                } catch (err) {
                  alert("Không thể cập nhật trạng thái");
                }
              }}
              className="text-xs text-blue-500 hover:underline">
              Chuyển
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
