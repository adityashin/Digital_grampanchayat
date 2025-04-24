import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AddMember.css";
import Admin from "./Admin";

const AddMember = () => {
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

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    age: "",
    gender: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Member Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    mobile: Yup.string()
      .matches(/\d{10}/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    age: Yup.number()
      .min(18, "Age must be at least 18")
      .max(100, "Age cannot be more than 100")
      .required("Age is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = {
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        password: values.password,
        age: values.age,
        gender: values.gender,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:8080/admin/register",
        data,
        config
      );

      if (response.status === 201) {
        alert("Member added successfully!");
        resetForm();
        window.location.reload();
      } else {
        alert("Failed to add member.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <Admin>
      <div className="add-product-container">
        <h3>Add New Member</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="product-form">
              <div className="form-group">
                <label htmlFor="name">Member Name</label>
                <Field type="text" name="name" placeholder="Enter member name" />
                <ErrorMessage name="name" component="p" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="age">Age</label>
                <Field type="number" name="age" placeholder="Enter age" />
                <ErrorMessage name="age" component="p" className="error-message" />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <div className="d-flex">
                  <label>
                    <Field type="radio" name="gender" value="Male" /> Male
                  </label>
                  <label className="ms-3">
                    <Field type="radio" name="gender" value="Female" /> Female
                  </label>
                </div>
                <ErrorMessage name="gender" component="p" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" placeholder="Enter email" />
                <ErrorMessage name="email" component="p" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Phone Number</label>
                <Field type="text" name="mobile" placeholder="Enter phone number" />
                <ErrorMessage name="mobile" component="p" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" placeholder="Enter password" />
                <ErrorMessage name="password" component="p" className="error-message" />
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting} style={{ backgroundcolor:"#9a4e17"}}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Admin>
  );
};

export default AddMember;
