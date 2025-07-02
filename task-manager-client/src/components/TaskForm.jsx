import { useForm } from "react-hook-form";
import axios from "axios";

function TaskForm({ onTaskCreated }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/tasks", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      reset();
      onTaskCreated();
    } catch (err) {
      alert("Không thể tạo task");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
      <h2 className="text-3xl font-bold mb-6">Thêm công việc</h2>
      <input
        {...register("title")}
        className="bg-black w-full p-2 border"
        placeholder="Tên công việc"
        required
      />

      <textarea
        {...register("description")}
        className="bg-black w-full p-2 border"
        placeholder="Mô tả"
      />

      <input
        type="date"
        {...register("dueDate")}
        className="bg-black w-full p-2 border"
      />

      <select {...register("priority")} className="bg-black w-full p-2 border">
        <option value="low">Thấp</option>
        <option value="medium">Trung bình</option>
        <option value="high">Cao</option>
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded">
        Thêm công việc
      </button>
    </form>
  );
}

export default TaskForm;
