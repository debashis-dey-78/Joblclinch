import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";

const ManageUsers = () => {
  const { isAuthorized, user } = useContext(Context);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          "https://jobclinch-job-portal-backend.onrender.com/api/v1/admin/users",
          { withCredentials: true }
        );
        setUsers(data.users);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch users");
      }
    };
    if (user && user.role === "Admin") {
      fetchUsers();
    }
  }, [user]);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jobclinch-job-portal-backend.onrender.com/api/v1/admin/user/${id}`, {
        withCredentials: true,
      });
      toast.success("User deleted successfully!");
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting user");
    }
  };

  if (!isAuthorized || (user && user.role !== "Admin")) {
    return <Navigate to="/" />;
  }

  return (
    <section className="manage-users page">
      <div className="container">
        <h3>Manage Users</h3>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => deleteUser(u._id)} className="delete-btn">
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

export default ManageUsers;
