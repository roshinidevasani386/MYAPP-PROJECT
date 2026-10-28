import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./admin.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    setError("");
    alert("OTP sent to your email!");
  };

  return (
    <div className={styles.loginPage}>

      <div className={styles.loginImage}>
        <img src="/hospital.png" alt="SurgiNova Care" />
      </div>

      
      <div className={styles.loginForm}>
        <h2>Forgot Password</h2>

        <p>
          Enter your registered email ID to receive an OTP.
        </p>

        <form onSubmit={handleSubmit}>

          <div className={styles.inputGroup}>
            <label>Email ID</label>

            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="Enter email ID" />

            {error && (
              <p className={styles.error}>
                {error}
              </p>
            )}
          </div>

          <button  type="submit"  className={styles.loginButton} >
            Send OTP
          </button>

        </form>

        <p className={styles.registerText}>
          Remember your password?{" "}
          <NavLink to="/admin-login">
            Login
          </NavLink>
        </p>
      </div>

    </div>
  );
};

export default ForgotPassword;