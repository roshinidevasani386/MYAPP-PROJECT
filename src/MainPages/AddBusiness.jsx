import React, { useState } from "react";
import axios from "axios";

import styles from "./main.module.css";

const AddBusiness = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    category: "",
    address: "",
    city: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const categories = [
    "Hospital",
    "Clinic",
    "Pharmacy",
    "Diagnostic Center",
    "Medical Equipment",
    "Other",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10 digit phone number";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/businessRequests",
        {
          ...formData,
          status: "Pending",
        }
      );

      setMessage(
        "Business request submitted successfully. Our team will contact you."
      );

      setFormData({
        businessName: "",
        ownerName: "",
        email: "",
        phone: "",
        category: "",
        address: "",
        city: "",
        description: "",
      });

      setErrors({});
    } catch (error) {
      console.error(
        "Error submitting business request:",
        error
      );

      setMessage(
        "Unable to submit your request. Please try again."
      );
    }
  };

  return (
    <div className={styles.businessPage}>



      <div className={styles.businessHeader}>
        <h1>Add Your Business</h1>

        <p>
          Register your healthcare business with SurgiNova Care.
        </p>
      </div>

      

      <div className={styles.businessContainer}>

        <form className={styles.businessCard} onSubmit={handleSubmit} >

          <div className={styles.businessGrid}>

          

            <div className={styles.inputGroup}>
              <label htmlFor="businessName">
                Business Name
              </label>

              <input id="businessName" type="text" name="businessName" value={formData.businessName} onChange={handleChange}  placeholder="Enter business name" />

              {errors.businessName && (
                <span className={styles.error}>
                  {errors.businessName}
                </span>
              )}
            </div>


            

            <div className={styles.inputGroup}>
              <label htmlFor="ownerName">
                Owner Name
              </label>

              <input id="ownerName" type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} placeholder="Enter owner name"/>

              {errors.ownerName && (
                <span className={styles.error}>
                  {errors.ownerName}
                </span>
              )}
            </div>


            

            <div className={styles.inputGroup}>
              <label htmlFor="businessEmail">
                Email
              </label>

              <input id="businessEmail" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" />

              {errors.email && (
                <span className={styles.error}>
                  {errors.email}
                </span>
              )}
            </div>


            

            <div className={styles.inputGroup}>
              <label htmlFor="businessPhone">
                Phone Number
              </label>

              <input id="businessPhone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter 10 digit phone number"maxLength="10" />

              {errors.phone && (
                <span className={styles.error}>
                  {errors.phone}
                </span>
              )}
            </div>


        

            <div className={styles.inputGroup}>
              <label htmlFor="category">
                Business Category
              </label>

              <select id="category" name="category" value={formData.category} onChange={handleChange} >
                <option value="">
                  Select Category
                </option>

                {categories.map((category) => (
                  <option key={category} value={category} >
                    {category}
                  </option>
                ))}
              </select>

              {errors.category && (
                <span className={styles.error}>
                  {errors.category}
                </span>
              )}
            </div>


        

            <div className={styles.inputGroup}>
              <label htmlFor="city">
                City
              </label>

              <input id="city" type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter city"/>

              {errors.city && (
                <span className={styles.error}>
                  {errors.city}
                </span>
              )}
            </div>

          </div>


          

          <div className={styles.businessFullInput}>
            <div className={styles.inputGroup}>
              <label htmlFor="address">
                Business Address
              </label>

              <textarea id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Enter complete business address" rows="4" ></textarea>

              {errors.address && (
                <span className={styles.error}>
                  {errors.address}
                </span>
              )}
            </div>
          </div>


      

          <div className={styles.businessFullInput}>
            <div className={styles.inputGroup}>
              <label htmlFor="description">
                Business Description
              </label>

              <textarea id="description"  name="description"  value={formData.description}  onChange={handleChange}  placeholder="Describe your business"rows="5"></textarea>

              {errors.description && (
                <span className={styles.error}>
                  {errors.description}
                </span>
              )}
            </div>
          </div>


        

          {message && (
            <div className={styles.businessMessage}>
              {message}
            </div>
          )}


        

          <div className={styles.businessButtonContainer}>
            <button type="submit" className={styles.businessButton}>
              Submit Business
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};

export default AddBusiness;