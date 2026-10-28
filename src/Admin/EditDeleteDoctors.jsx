import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import styles from "./admin.module.css";

const EditDeleteDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [editDoctor, setEditDoctor] = useState(null);
  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    axios
      .get("http://localhost:3000/doctors")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  
  const handleEdit = (doctor) => {
    setEditDoctor(doctor);
    setErrors({});
  };

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditDoctor({
      ...editDoctor,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!editDoctor.name.trim()) {
      newErrors.name = "Doctor name is required";
    } else if (editDoctor.name.length < 3) {
      newErrors.name = "Doctor name must be at least 3 characters";
    }

    if (!editDoctor.specialization.trim()) {
      newErrors.specialization = "Specialization is required";
    }

    if (!editDoctor.experience) {
      newErrors.experience = "Experience is required";
    }

    if (!editDoctor.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(editDoctor.phone)) {
      newErrors.phone = "Phone number must contain 10 digits";
    }

    if (!editDoctor.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editDoctor.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    return newErrors;
  };

  // Update doctor
  const handleUpdate = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/doctors/${editDoctor.id}`,
        {
          name: editDoctor.name,
          specialization: editDoctor.specialization,
          experience: editDoctor.experience,
          phone: editDoctor.phone,
          email: editDoctor.email,
        }
      );

      setDoctors(
        doctors.map((doctor) =>
          doctor.id === editDoctor.id ? response.data : doctor
        )
      );

      alert("Doctor updated successfully!");

      setEditDoctor(null);
      setErrors({});
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert("Failed to update doctor");
    }
  };

  // Delete doctor
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/doctors/${id}`);

      setDoctors(
        doctors.filter((doctor) => doctor.id !== id)
      );

      alert("Doctor deleted successfully!");
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Failed to delete doctor");
    }
  };

  return (
    <div className={styles.dashboardPage}>
      <AdminSidebar />

      <main className={styles.dashboardContent}>

        <div className={styles.dashboardHeader}>
          <h1>Manage Doctors</h1>
          <p>Edit or delete doctor details.</p>
        </div>

        {editDoctor ? (

          

          <div className={styles.formCard}>

            <h2>Edit Doctor</h2>

            <form onSubmit={handleUpdate}>

              <div className={styles.inputGroup}>
                <label>Doctor Name</label>

                <input type="text" name="name" value={editDoctor.name} onChange={handleChange}  placeholder="Enter doctor name" />

                {errors.name && (
                  <p className={styles.error}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>Specialization</label>

                <input type="text" name="specialization" value={editDoctor.specialization} onChange={handleChange}  placeholder="Enter specialization" />

                {errors.specialization && (
                  <p className={styles.error}>
                    {errors.specialization}
                  </p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>Experience</label>

                <input  type="number"  name="experience"  value={editDoctor.experience}  onChange={handleChange}  placeholder="Enter experience"/>

                {errors.experience && (
                  <p className={styles.error}>
                    {errors.experience}
                  </p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>Phone</label>

                <input type="text" name="phone" value={editDoctor.phone} onChange={handleChange} placeholder="Enter phone number" />

                {errors.phone && (
                  <p className={styles.error}>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>Email</label>

                <input type="email" name="email" value={editDoctor.email} onChange={handleChange} placeholder="Enter email"/>

                {errors.email && (
                  <p className={styles.error}>
                    {errors.email}
                  </p>
                )}
              </div>

              <button type="submit"className={styles.editButton} >
                Update Doctor
              </button>

              <button type="button" className={styles.cancelButton} onClick={() => {   setEditDoctor(null);   setErrors({}); }} >
                Cancel
              </button>

            </form>

          </div>

        ) : (

          

          <div className={styles.treatmentList}>

            {doctors.length === 0 ? (

              <p>No doctors available.</p>

            ) : (

              doctors.map((doctor) => (

                <div className={styles.treatmentCard} key={doctor.id} >

                  <h3>{doctor.name}</h3>

                  <p>
                    <strong>Specialization:</strong>{" "}
                    {doctor.specialization}
                  </p>

                  <p>
                    <strong>Experience:</strong>{" "}
                    {doctor.experience} years
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {doctor.phone}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {doctor.email}
                  </p>

                  <div className={styles.actionButtons}>

                    <button  className={styles.editButton}  onClick={() => handleEdit(doctor)}>
                      Edit
                    </button>

                    <button className={styles.deleteButton} onClick={() =>   handleDelete(doctor.id) } >
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

export default EditDeleteDoctors;