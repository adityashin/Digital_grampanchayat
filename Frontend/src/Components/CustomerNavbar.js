import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";
import { FaUserAlt } from "react-icons/fa"; // New Sign In icon
import { FaClipboardList } from "react-icons/fa"; // New Your Schemes icon

function CustomerNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);

  const handleLoginClick = () => navigate("/login");
  const handleRegisterClick = () => navigate("/register");
  const handleLogoutClick = () => {
    sessionStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-3"
      style={{ maxHeight: "12vh", backgroundColor: "#9c4a17" }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand text-white d-flex align-items-center" to="/">
          Digital Grampanchayat
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button
                className="btn btn-white"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  border: "2px solid white",
                  marginTop: "8%",
                }}
              >
                <FaUserAlt size={25} style={{ marginRight: "8px" }} />
                {userId ? "Profile" : "Sign In"}
              </button>

              {userId && isDropdownOpen && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    backgroundColor: "#fff",
                    border: "1px solid white",
                    borderRadius: "5px",
                    zIndex: 1000,
                  }}
                >
                  <button className="dropdown-item" onClick={() => navigate(`/editprofile/${userId}`)}>
                    Profile
                  </button>
                  <button className="dropdown-item" onClick={handleLogoutClick}>
                    Logout
                  </button>
                </div>
              )}

              {!userId && isDropdownOpen && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    backgroundColor: "#fff",
                    border: "1px solid white",
                    borderRadius: "5px",
                    zIndex: 1000,
                  }}
                >
                  <button className="dropdown-item" onClick={handleLoginClick}>
                    Login
                  </button>
                  <button className="dropdown-item" onClick={handleRegisterClick}>
                    Register
                  </button>
                </div>
              )}
            </li>

            <li className="nav-item">
              <NavLink className="nav-link fs-4 fw-semibold" to={`/yourschemes`}>
                <button
                  type="button"
                  className="btn btn-white"
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    border: "2px solid white",
                  }}
                >
                  <FaClipboardList size={25} style={{ marginRight: "8px" }} />
                  Your Schemes
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
