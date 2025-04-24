import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ViewSchemes.css";
import Admin from "./Admin";

function ViewSchemes() {
  const [schemes, setSchemes] = useState([]);
  const navigate = useNavigate();
  const id = sessionStorage.getItem("userId");

    useEffect(() => {
      if (!sessionStorage.getItem("userName")) {
        navigate("/");
      } else if (sessionStorage.getItem("userRole") === "MEMBER") {
        navigate("/");
      } else if (sessionStorage.getItem("userRole") === "SARPANCH") {
        navigate("/admin");
      }
    }, [navigate]);


  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      const response = await axios.get(
        `http://localhost:8080/admin/getAllSchemes`,
        config
      );
      setSchemes(response.data);
    } catch (error) {
      console.error("Error fetching schemes:", error);
    }
  };

  const handleEdit = (schemeId) => {
    if (schemeId) {
      navigate(`/agent/editscheme/${schemeId}`);
    } else {
      console.error("Scheme ID is undefined");
    }
  };

  const handleChangeStatus = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      await axios.patch(
        `http://localhost:8080/admin/deactivateScheme/${id}`,
        {},
        config
      );

      toast.success("Status updated successfully!", {
        position: "top-center",
        autoClose: 1500,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <Admin>
      <div className="view-schemes-container">
        <h3>View Schemes</h3>
        <table className="scheme-table">
          <thead>
            <tr>
              <th>Scheme Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {schemes.length > 0 ? (
              schemes.map((scheme) => (
                <tr key={scheme.id}>
                  <td>{scheme.name}</td>
                  <td>{scheme.description}</td>
                  <td>{scheme.schemeStatus}</td>
                  <td>
                    <div className="button-group">
                      <button
                        onClick={() => handleChangeStatus(scheme.id)}
                        className="status-btn"
                        disabled={scheme.schemeStatus === "INACTIVE"}
                      >
                        Change Status
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No schemes available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </Admin>
  );
}

export default ViewSchemes;
