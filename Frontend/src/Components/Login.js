import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "./CustomerNavbar";


function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        // Perform login API call
        const response = await axios.post("http://localhost:8080/login", values);
        if (response.status === 200) {
          alert("Login Successful!", {
            position: "top-center",
            autoClose: 1000,
          });
        }

        const user1 = response.data;
        sessionStorage.setItem("userName", user1.authenticatedDetails.principal.name);
        sessionStorage.setItem("userId", user1.authenticatedDetails.principal.id);
        sessionStorage.setItem("userRole", user1.authenticatedDetails.principal.role);
        sessionStorage.setItem("jwtToken", user1.jwt);

        if (user1.authenticatedDetails.principal.role === "ROLE_MEMBERS") navigate("/");
        else if (user1.authenticatedDetails.principal.role === "ROLE_SARPANCH") navigate("/admin");
      } catch (error) {
        toast.error("Invalid email or password!", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    },
  });

  return (
    <div
      style={{ backgroundColor: "white", color: "white", minHeight: "100vh"}}
    >
      <CustomerNavbar/>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="shadow-lg p-4"
          style={{
            width: "30rem",
            backgroundColor: "white",
            border: "3px solid #9a4e17",
            color: "black",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Email Input */}
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className="form-control"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                {...formik.getFieldProps("password")}
                className="form-control"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>

            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100 mt-3"
                style={{ backgroundColor: "#9a4e17" }}
              >
                Login
              </button>
            </div>
          </form>

          {/* Link to Register Page */}
          <div className="mt-3 text-center">
            <p>Don't have an account?</p>
            <Link to="/register" style={{ textDecoration: "none", color: "green" }}>
              <strong>Register here</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
