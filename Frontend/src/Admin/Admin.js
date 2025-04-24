import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserPlus, FaUsers, FaClipboardList, FaListAlt, FaFileAlt } from "react-icons/fa";
import AdminNavbar from "./AdminNavbar";
import "./Styles.css";

function Admin({ children }) {
  const navigate = useNavigate();

    useEffect(() => {
      if (!sessionStorage.getItem("userName")) {
        navigate("/");
      } else if (sessionStorage.getItem("userRole") === "MEMBER") {
        navigate("/");
      } else if (sessionStorage.getItem("userRole") === "SARPANCH") {
        navigate("/admin");
      }
    }, [navigate]);
    
  return (
    <div>
      <AdminNavbar />
      <div className="layout-container">
        <div
          className="sidebar"
          style={{
            border: "2px solid white",
            display: "flex",
            backgroundColor: "#9a4e17",
          }}
        >
          <div className="sidebar-header" style={{color:"white"}}>
            <h3>Admin</h3>
          </div>
          <nav className="sidebar-nav">
            <NavLink
              to="/admin/addmember"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaUserPlus className="icon" /> Add Member
            </NavLink>
            <NavLink
              to="/admin/viewallmembers"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaUsers className="icon" /> View Members
            </NavLink>
            <NavLink
              to="/admin/createscheme"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaClipboardList className="icon" /> Create Scheme
            </NavLink>
            <NavLink
              to="/admin/viewallschemes"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaListAlt className="icon" /> View Schemes
            </NavLink>
            <NavLink
              to="/admin/viewapplications"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <FaFileAlt className="icon" /> View Applications
            </NavLink>
          </nav>
        </div>

        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}

export default Admin;
