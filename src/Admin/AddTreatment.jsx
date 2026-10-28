import React, { useState } from "react";
import axios from "axios";

import styles from "./admin.module.css";

const AddTreatment = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
      newErrors.name = "Treatment name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Treatment name must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description =
        "Description must be at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit  = async(e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try{
          const response= await axios.post("http://localhost:3000/treatments",{
            name:formData.name,
            description:formData.description,
          });
          console.log("saved treatment:",response.data);

    alert("Treatment added successfully!");


    setFormData({
      name: "",
      description: "",
    });
    setErrors({});
  }
  catch(error){
   console.error("FULL ERROR:", error);
  console.error("ERROR MESSAGE:", error.message);
  console.error("ERROR RESPONSE:", error.response);
  alert("Failed to add treatment: " + error.message);
  }
  };

  return (
    <div className={styles.dashboardPage}>
      <main className={styles.dashboardContent}>

        <div className={styles.dashboardHeader}>
          <h1>Add Treatment</h1>
          <p>Add a new treatment to SurgiNova Care.</p>
        </div>

        <div className={styles.formCard}>

          <form onSubmit={handleSubmit}>

            
            <div className={styles.inputGroup}>
              <label>Treatment Name</label>

              <input type="text"name="name"value={formData.name}onChange={handleChange}placeholder="Enter treatment name"/>{errors.name && (
                <p className={styles.error}>
                  {errors.name}
                </p>
              )}
            </div>

            
            <div className={styles.inputGroup}>
              <label>Description</label>

              <textarea name="description" value={formData.description} onChange={handleChange}placeholder="Enter treatment description"rows="5"></textarea>

              {errors.description && (
                <p className={styles.error}>
                  {errors.description}
                </p>
              )}
            </div>

            {/* Submit */}
            <button type="submit"className={styles.loginButton}>Add Treatment
            </button>

          </form>

        </div>

      </main>
    </div>
  );
};

export default AddTreatment;