import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./YourSchemes.css";
import CustomerNavbar from "../Components/CustomerNavbar";

function YourSchemes() {
  const [scheme, setScheme] = useState([]);
  const customerId = sessionStorage.getItem("userId");
  const navigate = useNavigate();


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
        `http://localhost:8080/member/getUserAppliedSchemes/${customerId}`,
        config
      );

      setScheme(response.data || []);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };

  return (
    <div>
      <CustomerNavbar />
      <div className="policies-container">
        <h2 className="policies-heading">My Schemes</h2>
        {scheme.length > 0 ? (
          <table className="policy-table">
            <thead>
              <tr>
                <th>Scheme Id</th>
                <th>Scheme Name</th>
                <th>Applied Date</th>
                <th>Scheme Status</th>
              </tr>
            </thead>
            <tbody>
              {scheme.map((scheme, index) => (
                <tr key={index}>
                  <td>{scheme.schemeId}</td>
                  <td>{scheme.schemeName}</td>
                  <td>
                    {new Date(scheme.appliedDate).toLocaleDateString()}
                  </td>{" "}
                  {/* Format date */}
                  <td>{scheme.applicationStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="empty-policies-message">
            You haven't applied for any schemes yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default YourSchemes;
