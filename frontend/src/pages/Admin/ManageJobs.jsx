import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";

const ManageJobs = () => {
  const { isAuthorized, user } = useContext(Context);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "https://jobclinch-job-portal-backend.onrender.com/api/v1/admin/jobs",
          { withCredentials: true }
        );
        setJobs(data.jobs);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch jobs");
      }
    };
    if (user && user.role === "Admin") {
      fetchJobs();
    }
  }, [user]);

  const deleteJob = async (id) => {
    try {
      await axios.delete(`https://jobclinch-job-portal-backend.onrender.com/api/v1/admin/job/${id}`, {
        withCredentials: true,
      });
      toast.success("Job deleted successfully!");
      setJobs(jobs.filter((j) => j._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting job");
    }
  };

  if (!isAuthorized || (user && user.role !== "Admin")) {
    return <Navigate to="/" />;
  }

  return (
    <section className="manage-jobs page">
      <div className="container">
        <h3>Manage Jobs</h3>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Company/Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j._id}>
                  <td>{j.title}</td>
                  <td>{j.category}</td>
                  <td>{j.location}</td>
                  <td>
                    <button onClick={() => deleteJob(j._id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageJobs;
