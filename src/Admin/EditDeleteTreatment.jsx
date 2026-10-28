import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import styles from "./admin.module.css";

const EditDeleteTreatment = () => {
  const [treatments, setTreatments] = useState([]);
  const [editTreatment, setEditTreatment] = useState(null);
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

  
  const handleEdit = (treatment) => {
    setEditTreatment(treatment);
    setErrors({});
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditTreatment({
      ...editTreatment,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  
  const validate = () => {
    let newErrors = {};

    if (!editTreatment.name.trim()) {
      newErrors.name = "Treatment name is required";
    } else if (editTreatment.name.length < 3) {
      newErrors.name =
        "Treatment name must be at least 3 characters";
    }

    if (!editTreatment.description.trim()) {
      newErrors.description = "Description is required";
    } else if (editTreatment.description.length < 10) {
      newErrors.description =
        "Description must be at least 10 characters";
    }

    return newErrors;
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/treatments/${editTreatment.id}`,
        {
          name: editTreatment.name,
          description: editTreatment.description,
        }
      );

      setTreatments(
        treatments.map((treatment) =>
          treatment.id === editTreatment.id
            ? response.data
            : treatment
        )
      );

      alert("Treatment updated successfully!");

      setEditTreatment(null);
      setErrors({});
    } catch (error) {
      console.error("Error updating treatment:", error);
      alert("Failed to update treatment");
    }
  };

  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this treatment?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/treatments/${id}`
      );

      setTreatments(
        treatments.filter((treatment) => treatment.id !== id)
      );

      alert("Treatment deleted successfully!");
    } catch (error) {
      console.error("Error deleting treatment:", error);
      alert("Failed to delete treatment");
    }
  };

  return (
    <div className={styles.dashboardPage}>
      <AdminSidebar />

      <main className={styles.dashboardContent}>
        <div className={styles.dashboardHeader}>
          <h1>Manage Treatments</h1>
          <p>Edit or delete treatment details.</p>
        </div>

        
        {editTreatment ? (
          <div className={styles.formCard}>
            <h2>Edit Treatment</h2>

            <form onSubmit={handleUpdate}>

              
              <div className={styles.inputGroup}>
                <label>Treatment Name</label>

                <input type="text" name="name" value={editTreatment.name} onChange={handleChange} placeholder="Enter treatment name" />

                {errors.name && (
                  <p className={styles.error}>
                    {errors.name}
                  </p>
                )}
              </div>

              
              <div className={styles.inputGroup}>
                <label>Description</label>

                <textarea name="description"  value={editTreatment.description}  onChange={handleChange}  placeholder="Enter treatment description" rows="5" ></textarea>

                {errors.description && (
                  <p className={styles.error}>
                    {errors.description}
                  </p>
                )}
              </div>

              
              <button type="submit" className={styles.editButton} >
                Update Treatment
              </button>

              <button  type="button"  className={styles.cancelButton}  onClick={() => {    setEditTreatment(null);  setErrors({});  }}>
                Cancel
              </button>

            </form>
          </div>
        ) : (
          
          <div className={styles.treatmentList}>

            {treatments.length === 0 ? (
              <p>No treatments available.</p>
            ) : (
              treatments.map((treatment) => (
                <div className={styles.treatmentCard}   key={treatment.id} >
                  <h3>{treatment.name}</h3>

                  <p>{treatment.description}</p>

                  <div className={styles.actionButtons}>

                    <button className={styles.editButton} onClick={() => handleEdit(treatment)} >
                      Edit
                    </button>

                    <button className={styles.deleteButton} onClick={() =>   handleDelete(treatment.id)} >
                      Delete
                    </button>

                  </div>
                </div>
              ))
            )}

          </div>
        )}
      </main>
    </div>
  );
};

export default EditDeleteTreatment;