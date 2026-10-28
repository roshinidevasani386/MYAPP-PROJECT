import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import styles from "./admin.module.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    const savedAdmin = localStorage.getItem("adminUser");

    if (!savedAdmin) {
      setError("Please register first.");
      return;
    }

    const admin = JSON.parse(savedAdmin);

    if (
      username.trim() === admin.username &&
      email.trim().toLowerCase() === admin.email.toLowerCase()
    ) {
      
      localStorage.setItem("adminLoggedIn", "true");

      alert("Login successful!");

      navigate("/admin-dashboard");
    } else {
      setError("Invalid username or email ID.");
    }
  };

  return (
    <div className={styles.loginPage}>

      <div className={styles.loginImage}>
        <img src="/banner.png"  alt="SurgiNova Care" />
      </div>

      <div className={styles.loginForm}>

        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>

          <div className={styles.inputGroup}>
            <label>Username</label>

            <input  type="text" value={username} onChange={(e) =>setUsername(e.target.value)}
              placeholder="Enter username" />
          </div>

          <div className={styles.inputGroup}>
            <label>Email ID</label>

            <input type="email"  value={email}  onChange={(e) =>    setEmail(e.target.value) }
              placeholder="Enter email ID"/>
          </div>

          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}

          <button type="submit" className={styles.loginButton} >
            Login
          </button>

          <div className={styles.loginLinks}>

            <NavLink to="/forgot-password">
              Forgot Password?
            </NavLink>

            <p> New User?{" "} 
              <NavLink to="/register">
              Register
              </NavLink>
            </p>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;