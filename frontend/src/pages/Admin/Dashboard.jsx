import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isAuthorized, user } = useContext(Context);
  const [stats, setStats] = useState({ totalUsers: 0, totalJobs: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          "https://jobclinch-job-portal-backend.onrender.com/api/v1/admin/stats",
          { withCredentials: true }
        );
        setStats(data.stats);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    if (user && user.role === "Admin") {
      fetchStats();
    }
  }, [user]);

  if (!isAuthorized || (user && user.role !== "Admin")) {
    return <Navigate to="/" />;
  }

  return (
    <section className="dashboard page">
      <div className="container">
        <h3>Admin Dashboard</h3>
        <div className="banner">
          <div className="card">
            <h4>Total Users</h4>
            <p>{stats.totalUsers}</p>
          </div>
          <div className="card">
            <h4>Total Jobs</h4>
            <p>{stats.totalJobs}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
