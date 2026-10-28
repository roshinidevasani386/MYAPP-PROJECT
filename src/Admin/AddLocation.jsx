import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import styles from "./admin.module.css";

const AddLocation = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
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
      newErrors.name = "Location name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Location name must be at least 3 characters";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain 10 digits";
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
        "http://localhost:3000/locations",
        {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          phone: formData.phone,
        }
      );

      console.log("Location saved:", response.data);

      alert("Location added successfully!");

      setFormData({
        name: "",
        address: "",
        city: "",
        state: "",
        phone: "",
      });

      setErrors({});
    } catch (error) {
      console.error("Error adding location:", error);
      alert("Failed to add location");
    }
  };

  return (
    <div className={styles.dashboardPage}>
      <AdminSidebar />

      <main className={styles.dashboardContent}>

        <div className={styles.dashboardHeader}>
          <h1>Add Location</h1>
          <p>Add hospital location details.</p>
        </div>

        <div className={styles.formCard}>

          <form onSubmit={handleSubmit}>

            <div className={styles.inputGroup}>
              <label>Location Name</label>

              <input type="text"  name="name"  value={formData.name}  onChange={handleChange}  placeholder="Enter location name"/>

              {errors.name && (
                <p className={styles.error}>
                  {errors.name}
                </p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Address</label>

              <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Enter complete address" rows="4">

              </textarea>

              {errors.address && (
                <p className={styles.error}>
                  {errors.address}
                </p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>City</label>

              <input  type="text"  name="city"  value={formData.city}  onChange={handleChange}  placeholder="Enter city"/>

              {errors.city && (
                <p className={styles.error}>
                  {errors.city}
                </p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>State</label>

              <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Enter state"/>

              {errors.state && (
                <p className={styles.error}>
                  {errors.state}
                </p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>Phone</label>

              <input  type="text"  name="phone"  value={formData.phone}  onChange={handleChange}  placeholder="Enter 10 digit phone number"/>

              {errors.phone && (
                <p className={styles.error}>
                  {errors.phone}
                </p>
              )}
            </div>

            <button type="submit"  className={styles.loginButton}>
              Add Location
            </button>

          </form>

        </div>

      </main>
    </div>
  );
};

export default AddLocation;