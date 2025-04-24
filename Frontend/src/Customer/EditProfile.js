import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "../Components/CustomerNavbar";

function EditProfile() {
  const navigate = useNavigate();
  const { userId } = useParams(); // Get user ID from the URL
  const id = userId;

      useEffect(() => {
        if (!sessionStorage.getItem("userName")) {
          navigate("/");
        } else if (sessionStorage.getItem("userRole") === "MEMBER") {
          navigate("/");
        } else if (sessionStorage.getItem("userRole") === "SARPANCH") {
          navigate("/admin");
        }
      }, [navigate]);

  // State variables
  const [name, setName] = useState("");
  const [gender, setGender] = useState(""); // New gender state
  const [age, setAge] = useState(""); // New age state
  const [email, setEmail] = useState("");
  const [mobile, setPhone] = useState("");
  const [password, setPassword] = useState(""); 

  const editUrl = `http://localhost:8080/member/getUserById/${id}`;
  const updateUrl = `http://localhost:8080/member/updateUser/${id}`;

  // Fetch user details when the component mounts
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    axios
      .get(editUrl, config)
      .then((response) => {
        const { name, gender, age, email, mobile, password } = response.data;
        setName(name || "");
        setGender(gender || ""); // Set gender
        setAge(age || ""); // Set age
        setEmail(email || "");
        setPhone(mobile || "");
        setPassword(password || "");
      })
      .catch((error) => {
        console.error("Error occurred getting user details:", error);
        toast.error("Failed to fetch user details");
      });
  }, [editUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    // Prepare updated user details
    const userDetails = {
      name,
      gender,  // Include gender
      age,     // Include age
      email,
      mobile,
      password, 
    };

    axios
      .put(updateUrl, userDetails, config)
      .then(() => {
        toast.success("Profile updated successfully!");
        setTimeout(() => {
          navigate("/"); // Redirect after success
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        toast.error("Failed to update profile.");
      });
  };

  return (
    <div className="container1">
      <CustomerNavbar />
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "-20%" }}>
        <div
          className="shadow-lg p-4"
          style={{
            width: "35rem",
            marginTop: "25rem",
            border: "2px solid #9c4a17",
            backgroundColor: "#f4f4f9",
            color: "black",
          }}
        >
          <h2 className="text-center mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            {/* User Name */}
            <div className="mb-3">
              <label>User Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Gender */}
            <div className="mb-3">
              <label>Gender:</label>
              <select
                className="form-control"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{ height: "30px" }}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                
              </select>
            </div>

            {/* Age */}
            <div className="mb-3">
              <label>Age:</label>
              <input
                type="number"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1"
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                readOnly
                style={{ height: "30px", backgroundColor: "#e9ecef" }}
              />
            </div>

            {/* Contact */}
            <div className="mb-3">
              <label>Contact:</label>
              <input
                type="text"
                className="form-control"
                value={mobile}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={10}
                pattern="\d{10}"
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ height: "30px" }}
              />
            </div>

            {/* Submit Button */}
            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100"
                style={{ backgroundColor: "#9c4a17" }}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
