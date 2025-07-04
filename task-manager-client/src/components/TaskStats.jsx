import { useEffect, useState } from "react";
import axios from "axios";

function TaskStats() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks/stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStats(res.data);
    } catch (err) {
      alert("Không thể tải thống kê");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return <p>Đang tải thống kê...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <StatCard
        label="Tổng công việc"
        value={stats.total}
        color="bg-blue-500"
      />
      <StatCard
        label="Hoàn thành"
        value={stats.completed}
        color="bg-green-500"
      />
      <StatCard label="Đang chờ" value={stats.pending} color="bg-yellow-500" />
      <StatCard label="Quá hạn" value={stats.overdue} color="bg-red-500" />
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className={`p-4 rounded-xl text-white shadow-md ${color}`}>
      <h4 className="text-md">{label}</h4>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

export default TaskStats;
