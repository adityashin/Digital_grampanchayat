import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "./CustomerNavbar";

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      gender: "",
      age: "",
      mobile: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      gender: Yup.string().required("Gender is required"),
      age: Yup.number()
        .typeError("Age must be a number")
        .min(18, "You must be at least 18 years old")
        .max(100, "Age must be less than or equal to 100")
        .required("Age is required"),
        mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:8080/member/register", values)
        .then(() => {
          toast.success("Registration successful!");
          navigate("/login");
        })
        .catch(() => {
          toast.error("Error registering user. Please try again.");
        });
    },
  });

  return (
    <div style={{ backgroundColor: "white", color: "black", minHeight: "80vh" }}>
      <CustomerNavbar />
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center vh-50 mt-5">
        <div
          className="shadow-lg p-4"
          style={{ width: "35rem", backgroundColor: "white", color: "black" }}
        >
          <h2 className="text-center mb-2">Register Here</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label>Name:</label>
              <input
                type="text"
                {...formik.getFieldProps("name")}
                className="form-control"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
            </div>

            <div className="mb-3">
              <label>Gender:</label>
              <div className="d-flex">
                <div className="form-check me-3">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                    checked={formik.values.gender === "Male"}
                    onChange={formik.handleChange}
                    className="form-check-input"
                  />
                  <label htmlFor="male" className="form-check-label">Male</label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                    checked={formik.values.gender === "Female"}
                    onChange={formik.handleChange}
                    className="form-check-input"
                  />
                  <label htmlFor="female" className="form-check-label">Female</label>
                </div>
              </div>
              {formik.touched.gender && formik.errors.gender && (
                <div className="text-danger">{formik.errors.gender}</div>
              )}
            </div>

            <div className="mb-3">
              <label>Age:</label>
              <input
                type="text"
                {...formik.getFieldProps("age")}
                className="form-control"
              />
              {formik.touched.age && formik.errors.age && (
                <div className="text-danger">{formik.errors.age}</div>
              )}
            </div>

            <div className="mb-3">
              <label>Mobile:</label>
              <input
                type="text"
                {...formik.getFieldProps("mobile")}
                className="form-control"
              />
              {formik.touched.mobile && formik.errors.mobile && (
                <div className="text-danger">{formik.errors.mobile}</div>
              )}
            </div>

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

            <div className="mb-2 w-100">
              <button type="submit" className="btn btn-light w-100" style={{ backgroundColor: "#9a4e17" }}>
                Register
              </button>
            </div>
          </form>

          <div className="mt-2 text-center">
            <p>Already have an account?</p>
            <Link to="/login" style={{ textDecoration: "none", color: "green" }}>
              <strong>Login here</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
