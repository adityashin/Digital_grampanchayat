import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AddScheme.css";
import Admin from "./Admin";

const AddScheme = () => {
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
    description: "",
    schemeImage: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Scheme name is required"),
    description: Yup.string().required("Description is required"),
    schemeImage: Yup.mixed()
      .nullable()
      .test("fileType", "Only JPG, JPEG, and PNG files are allowed", (value) => {
        if (!value) return true; // Image is optional
        return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      }),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log("🚀 handleSubmit called!", values); // Debugging

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("schemeStatus", "Active")
      if (values.schemeImage) {
        formData.append("schemeImage", values.schemeImage);
      }

      console.log("📤 Sending data to API...", formData);

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        "http://localhost:8080/admin/createScheme",
        formData,
        config
      );

      console.log("✅ API Response:", response);

      if (response.status === 201) {
        alert("Scheme added successfully!");
        resetForm();
        window.location.reload();
      } else {
        alert("Failed to add scheme.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <Admin>
      <div className="add-product-container">
        <h3>Add New Scheme</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form className="product-form">

              <div className="form-group">
                <label htmlFor="name">Scheme Name</label>
                <Field type="text" name="name" placeholder="Enter scheme name" />
                <ErrorMessage name="name" component="p" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field as="textarea" name="description" placeholder="Enter description" />
                <ErrorMessage name="description" component="p" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="schemeImage">Upload Scheme Image</label>
                <input
                  type="file"
                  name="schemeImage"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={(event) => {
                    setFieldValue("schemeImage", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage name="schemeImage" component="p" className="error-message" />
              </div>

              <button type="submit" className="submit-btn">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Admin>
  );
};

export default AddScheme;
