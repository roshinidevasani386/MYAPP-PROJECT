import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import styles from "./admin.module.css";

const EditDeleteSubTreatment = () => {
  const [subTreatments, setSubTreatments] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [editSubTreatment, setEditSubTreatment] = useState(null);
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

    axios
      .get("http://localhost:3000/subTreatments")
      .then((response) => {
        setSubTreatments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sub treatments:", error);
      });
  }, []);

  
  const handleEdit = (subTreatment) => {
    setEditSubTreatment(subTreatment);
    setErrors({});
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditSubTreatment({
      ...editSubTreatment,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  
  const validate = () => {
    let newErrors = {};

    if (!editSubTreatment.treatmentId) {
      newErrors.treatmentId = "Please select a treatment";
    }

    if (!editSubTreatment.name.trim()) {
      newErrors.name = "Sub treatment name is required";
    } else if (editSubTreatment.name.length < 3) {
      newErrors.name =
        "Sub treatment name must be at least 3 characters";
    }

    if (!editSubTreatment.description.trim()) {
      newErrors.description = "Description is required";
    } else if (editSubTreatment.description.length < 10) {
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
      const selectedTreatment = treatments.find(
        (treatment) =>
          String(treatment.id) ===
          String(editSubTreatment.treatmentId)
      );

      const response = await axios.put(
        `http://localhost:3000/subTreatments/${editSubTreatment.id}`,
        {
          treatmentId: editSubTreatment.treatmentId,
          treatmentName: selectedTreatment
            ? selectedTreatment.name
            : "",
          name: editSubTreatment.name,
          description: editSubTreatment.description,
        }
      );

      setSubTreatments(
        subTreatments.map((subTreatment) =>
          subTreatment.id === editSubTreatment.id
            ? response.data
            : subTreatment
        )
      );

      alert("Sub Treatment updated successfully!");

      setEditSubTreatment(null);
      setErrors({});
    } catch (error) {
      console.error("Error updating sub treatment:", error);
      alert("Failed to update sub treatment");
    }
  };

  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sub treatment?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/subTreatments/${id}`
      );

      setSubTreatments(
        subTreatments.filter(
          (subTreatment) => subTreatment.id !== id
        )
      );

      alert("Sub Treatment deleted successfully!");
    } catch (error) {
      console.error("Error deleting sub treatment:", error);
      alert("Failed to delete sub treatment");
    }
  };

  return (
    <div className={styles.dashboardPage}>
      <AdminSidebar />

      <main className={styles.dashboardContent}>
        <div className={styles.dashboardHeader}>
          <h1>Manage Sub Treatments</h1>
          <p>Edit or delete sub treatment details.</p>
        </div>

        
        {editSubTreatment ? (
          <div className={styles.formCard}>
            <h2>Edit Sub Treatment</h2>

            <form onSubmit={handleUpdate}>

              
              <div className={styles.inputGroup}>
                <label>Select Treatment</label>

                <select name="treatmentId" value={editSubTreatment.treatmentId} onChange={handleChange} >
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

                <input type="text" name="name" value={editSubTreatment.name} onChange={handleChange} placeholder="Enter sub treatment name"/>

                {errors.name && (
                  <p className={styles.error}>
                    {errors.name}
                  </p>
                )}
              </div>

              
              <div className={styles.inputGroup}>
                <label>Description</label>

                <textarea name="description" value={editSubTreatment.description} onChange={handleChange} placeholder="Enter description" rows="5" ></textarea>

                {errors.description && (
                  <p className={styles.error}>
                    {errors.description}
                  </p>
                )}
              </div>

              
              <button  type="submit"  className={styles.editButton} >
                Update Sub Treatment
              </button>

              <button type="button" className={styles.cancelButton} onClick={() => { setEditSubTreatment(null); setErrors({});  }} >
                Cancel
              </button>

            </form>
          </div>
        ) : (
          
          <div className={styles.treatmentList}>

            {subTreatments.length === 0 ? (
              <p>No sub treatments available.</p>
            ) : (
              subTreatments.map((subTreatment) => (
                <div
                  className={styles.treatmentCard}
                  key={subTreatment.id}
                >
                  <h3>{subTreatment.name}</h3>

                  <p>
                    <strong>Treatment:</strong>{" "}
                    {subTreatment.treatmentName}
                  </p>

                  <p>{subTreatment.description}</p>

                  <div className={styles.actionButtons}>

                    <button className={styles.editButton} onClick={() => handleEdit(subTreatment) } >
                      Edit
                    </button>

                    <button  className={styles.deleteButton}  onClick={() => handleDelete(subTreatment.id) } >
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

export default EditDeleteSubTreatment;