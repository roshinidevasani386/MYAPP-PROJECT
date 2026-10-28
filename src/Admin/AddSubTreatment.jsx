import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import styles from "./admin.module.css";

const AddSubTreatment = () => {
  const [treatments, setTreatments] = useState([]);

  const [formData, setFormData] = useState({
    treatmentId: "",
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    axios
      .get("http://localhost:3000/treatments")
      .then((response) => {
        setTreatments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching treatments:", error);
      });
  }, []);

  
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

    if (!formData.treatmentId) {
      newErrors.treatmentId = "Please select a treatment";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Sub treatment name is required";
    } else if (formData.name.length < 3) {
      newErrors.name =
        "Sub treatment name must be at least 3 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description =
        "Description must be at least 10 characters";
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
      const selectedTreatment = treatments.find(
        (treatment) =>
          String(treatment.id) === String(formData.treatmentId)
      );

      const response = await axios.post(
        "http://localhost:3000/subTreatments",
        {
          treatmentId: formData.treatmentId,
          treatmentName: selectedTreatment
            ? selectedTreatment.name
            : "",
          name: formData.name,
          description: formData.description,
        }
      );

      console.log("Sub Treatment Saved:", response.data);

      alert("Sub Treatment added successfully!");

      setFormData({
        treatmentId: "",
        name: "",
        description: "",
      });

      setErrors({});
    } catch (error) {
      console.error("Error adding sub treatment:", error);
      alert("Failed to add sub treatment");
    }
  };

  return (
    <div className={styles.dashboardPage}>
      <AdminSidebar />

      <main className={styles.dashboardContent}>
        <div className={styles.dashboardHeader}>
          <h1>Add Sub Treatment</h1>
          <p>Add a sub treatment under an existing treatment.</p>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>

      
            <div className={styles.inputGroup}>
              <label>Select Treatment</label>

              <select name="treatmentId" value={formData.treatmentId} onChange={handleChange}>
                <option value="">
                  Select Treatment
                </option>

                {treatments.map((treatment) => (
                  <option key={treatment.id} value={treatment.id} >
                    {treatment.name}
                  </option>
                ))}
              </select>

              {errors.treatmentId && (
                <p className={styles.error}>
                  {errors.treatmentId}
                </p>
              )}
            </div>

          
            <div className={styles.inputGroup}>
              <label>Sub Treatment Name</label>

              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter sub treatment name" />

              {errors.name && (
                <p className={styles.error}>
                  {errors.name}
                </p>
              )}
            </div>

            
            <div className={styles.inputGroup}>
              <label>Description</label>

              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter description" rows="5" ></textarea>

              {errors.description && (
                <p className={styles.error}>
                  {errors.description}
                </p>
              )}
            </div>

            
            <button  type="submit"  className={styles.loginButton} >
              Add Sub Treatment
            </button>

          </form>
        </div>
      </main>
    </div>
  );
};

export default AddSubTreatment;