import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewMembers.css";
import Admin from "./Admin";

function ViewMembers() {
  const [members, setMember] = useState([]);
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
    const fetchMembers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };

        const response = await axios.get(
          "http://localhost:8080/admin/getAllMembers",
          config
        );
        setMember(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleEdit = (id) => {
    if (id) {
      navigate(`/admin/editmember/${id}`);
    } else {
      console.error("Member ID is undefined");
    }
  };

  return (
    <Admin>
      <div className="view-agents-container">
        <h3>View Members</h3>
        <table className="agent-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>

            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.gender}</td>
                  <td>{member.age}</td>
                  <td>{member.email}</td>
                  <td>{member.mobile}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Members available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewMembers;
