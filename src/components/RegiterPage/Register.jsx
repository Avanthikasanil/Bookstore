import React, { useState } from "react";
import "../RegiterPage/Register.css";
import LoginModal from "../LoginModal/Login";
import image from "./images/category-removebg-preview.png";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../Utils/baseUrl";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      gender: Yup.string().required("Gender is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const endpoint =
          values.role === "buyer"
            ? "/buyers/registerBuyer"
            : "/sellers/registerSeller";

        const res = await api.post(endpoint, values);

        toast.success(res.data.message || "Registration successful!");
        resetForm();

        if (res.status === 201) {
          setShowLogin(true); // Show login modal
        }
      } catch (error) {
        console.error(error);
        toast.error("Registration failed. Please try again.");
      }
    },
  });

  const handleLoginSuccess = () => {
    setShowLogin(false);
    navigate("/product");
  };

  return (
    <div className={`reg-all ${showLogin ? "white-bg" : ""}`}>
      <img className="reg-img" src={image} alt="image" />
      <div className="head-reg">
        <h2>Create Account</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="User Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="error">{formik.errors.name}</p>
          )}

          {/* Email */}
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="User Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error">{formik.errors.email}</p>
          )}

          {/* Gender */}
          <label>Gender:</label>
          <div className="radio-options">
            {["male", "female", "other"].map((g) => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formik.values.gender === g}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} // important for validation
                />
                {g}
              </label>
            ))}
          </div>
          {formik.touched.gender && formik.errors.gender && (
            <p className="error">{formik.errors.gender}</p>
          )}

          {/* Password */}
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="error">{formik.errors.password}</p>
          )}

          {/* Role */}
          <label>Role:</label>
          <div className="radio-options">
            {["buyer", "seller"].map((r) => (
              <label key={r}>
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={formik.values.role === r}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} // important for validation
                />
                {r}
              </label>
            ))}
          </div>
          {formik.touched.role && formik.errors.role && (
            <p className="error">{formik.errors.role}</p>
          )}

          {/* Submit */}
          <button type="submit">Register</button>
        </form>

        <div className="log">
          <p>
            Already have an account?{" "}
            <button type="button" onClick={() => setShowLogin(true)}>
              Login
            </button>
          </p>
        </div>

        {/* Login Modal */}
        <LoginModal
          show={showLogin}
          onHide={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </div>
  );
}

export default Register;
