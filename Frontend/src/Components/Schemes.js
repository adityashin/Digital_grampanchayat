import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Schemes.css";

function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        "Content-Type": "application/json",
      },
    };

    axios
      .get("http://localhost:8080/admin/getAllSchemes", config)
      .then((response) => {
        setSchemes(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("No schemes available.");
        setLoading(false);
      });
  }, []);

  const handleApplyScheme = async (schemeId) => {
    const userId = sessionStorage.getItem("userId"); 


    if (!userId) {
      toast.warn("To apply for a scheme, please log in first.", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        "Content-Type": "application/json",
      },
    };

    const requestBody = { userId, schemeId };

    try {
      const response = await axios.post(
        "http://localhost:8080/member/applyForScheme",
        requestBody,
        config
      );

      toast.success(response.data || "✅ Application submitted successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      });

      setTimeout(() => {
        navigate("/yourschemes", { state: { userId, schemeId } });
      }, 2500);
    } catch (error) {
      toast.error(
        error.response?.data || "❌ Failed to submit application. Try again!",
        {
          position: "top-center",
          autoClose: 2000,
        }
      );
    }
  };

  if (loading) return <p>Loading schemes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="scheme-container">
      {schemes.length > 0 ? (
        schemes.map((scheme) => (
          <div className="scheme-card" key={scheme.id}>
            <img
              src={`data:image/png;base64,${scheme.schemeImage}`}
              alt={scheme.schemeName}
              className="scheme-image"
            />

            <h3 className="scheme-name">{scheme.schemeName}</h3>
            <p className="scheme-description">{scheme.description}</p>

            <button
              className={`apply-btn ${scheme.schemeStatus === "INACTIVE" ? "disabled-btn" : ""}`}
              onClick={() => handleApplyScheme(scheme.id)}
              disabled={scheme.schemeStatus === "INACTIVE"}
            >
              {scheme.schemeStatus === "INACTIVE" ? "Inactive" : "Apply"}
            </button>
          </div>
        ))
      ) : (
        <p>No schemes found</p>
      )}

      <ToastContainer />
    </div>
  );
}

export default Schemes;
