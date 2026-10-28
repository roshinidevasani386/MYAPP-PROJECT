import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import styles from "./admin.module.css";

const AddDoctors = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Doctor name is required";
    } else if (formData.name.length < 3) {
      newErrors.name ="Doctor name must be at least 3 characters";
    }

    if (!formData.specialization.trim()) {
      newErrors.specialization ="Specialization is required";
    }

    if (!formData.experience) {
      newErrors.experience = "Experience is required";
    } else if (Number(formData.experience) < 0) {
      newErrors.experience = "Experience cannot be negative";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone ="Phone number must contain 10 digits";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/doctors",
        {
          name: formData.name,
          specialization: formData.specialization,
          experience: formData.experience,
          phone: formData.phone,
          email: formData.email,
        }
      );

      console.log("Doctor saved:", response.data);

      alert("Doctor added successfully!");

      setFormData({
        name: "",
        specialization: "",
        experience: "",
        phone: "",
        email: "",
      });

      setErrors({});
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Failed to add doctor");
    }
  };

  return (
    <div className={styles.dashboardPage}>
      <AdminSidebar />

      <main className={styles.dashboardContent}>
        <div className={styles.dashboardHeader}>
          <h1>Add Doctor</h1>
          <p>Add doctor details to the system.</p>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>

            
            <div className={styles.inputGroup}>
              <label>Doctor Name</label>

              <input type="text" name="name"value={formData.name}onChange={handleChange}placeholder="Enter doctor name"/>

              {errors.name && (
                <p className={styles.error}>
                  {errors.name}
                </p>
              )}
            </div>

        
            <div className={styles.inputGroup}>
              <label>Specialization</label>

              <input
                type="text" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Enter specialization"/>

              {errors.specialization && (
                <p className={styles.error}>
                  {errors.specialization}
                </p>
              )}
            </div>

        
            <div className={styles.inputGroup}>
              <label>Experience</label>

              <input type="number" name="experience" value={formData.experience} onChange={handleChange} placeholder="Enter experience in years"/>

              {errors.experience && (
                <p className={styles.error}>
                  {errors.experience}
                </p>
              )}
            </div>

            
            <div className={styles.inputGroup}>
              <label>Phone</label>

              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter 10 digit phone number" />

              {errors.phone && (
                <p className={styles.error}>
                  {errors.phone}
                </p>
              )}
            </div>

            
            <div className={styles.inputGroup}>
              <label>Email</label>

              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />

              {errors.email && (
                <p className={styles.error}> {errors.email}</p>
              )}
            </div>

            <button
              type="submit"className={styles.loginButton}>
              Add Doctor
            </button>

          </form>
        </div>
      </main>
    </div>
  );
};

export default AddDoctors;