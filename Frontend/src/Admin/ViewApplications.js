import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Admin from "./Admin";
import "./ViewApplications.css";

function ViewApplications() {
  const [applications, setApplications] = useState([]);
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

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };

        const response = await axios.get(
          "http://localhost:8080/admin/getAppliedApplications",
          config
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.put(
        `http://localhost:8080/admin/updateApplicationStatus/${id}`,
        { status: newStatus },
        config
      );

      if (response.status === 200) {
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === id ? { ...app, status: newStatus } : app
          )
        );
  
        toast.success(`Application ${newStatus} successfully!`, {
          position: "top-right",
          autoClose: 2000, // Auto close in 2 seconds
        });
  
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Reloads after 2 seconds
      }
    } catch (error) {
      console.error(`Error updating application status:`, error);
      toast.error("Something went wrong.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <Admin>
      <ToastContainer/>
      <div className="view-payments-container">
        <h3>Applications History</h3>
        <table className="payment-table">
          <thead>
            <tr>
              <th>Application Id</th>
              <th>Member Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Scheme Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((application) => (
                <tr key={application.id}>
                  <td>{application.id}</td>
                  <td>{application.memberName}</td>
                  <td>{application.gender}</td>
                  <td>{application.age}</td>
                  <td>{application.schemeName}</td>
                  <td>{application.applicationStatus}</td>
                  <td>
                    {application.applicationStatus === "ACCEPTED" ||
                    application.applicationStatus === "REJECTED" ? (
                      <span>-</span>
                    ) : (
                      <>
                        <button
                          className="accept-btn"
                          onClick={() => handleUpdateStatus(application.id, "ACCEPTED")}
                        >
                          Accept
                        </button>
                        <button
                          className="decline-btn"
                          onClick={() => handleUpdateStatus(application.id, "REJECTED")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Applications available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewApplications;
