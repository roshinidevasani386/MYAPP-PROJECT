import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.png";

import styles from "./admin.module.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    
    localStorage.setItem(
      "adminUser",
      JSON.stringify(formData)
    );

    alert("Registration successful!");

  
    navigate("/admin-login");
  };

  return (
    <div className={styles.loginPage}>

      <div className={styles.loginImage}>
        <img src={banner}alt="SurgiNova Care"/>
      </div>

      <div className={styles.loginForm}>

        <h2>Admin Registration</h2>

        <form onSubmit={handleSubmit}>

          <div className={styles.inputGroup}>
            <label>Username</label>

            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter username" />

            {errors.username && (
              <p className={styles.error}>
                {errors.username}
              </p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Email ID</label>

            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email ID"/>

            {errors.email && (
              <p className={styles.error}>
                {errors.email}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={styles.loginButton}
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
};

export default Register;