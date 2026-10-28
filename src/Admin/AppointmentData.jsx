import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import styles from "./admin.module.css";

const AppointmentData = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/appointments")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  
  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/appointments/${id}`,
        {
          status: status,
        }
      );

      setAppointments(
        appointments.map((appointment) =>
          appointment.id === id
            ? response.data
            : appointment
        )
      );

      alert("Appointment status updated!");
    } catch (error) {
      console.error(
        "Error updating appointment status:",
        error
      );

      alert("Failed to update appointment status");
    }
  };

  // Delete appointment
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3000/appointments/${id}`
      );

      setAppointments(
        appointments.filter(
          (appointment) => appointment.id !== id
        )
      );

      alert("Appointment deleted successfully!");
    } catch (error) {
      console.error(
        "Error deleting appointment:",
        error
      );

      alert("Failed to delete appointment");
    }
  };

  return (
    <div className={styles.dashboardPage}>
      <AdminSidebar />

      <main className={styles.dashboardContent}>

        <div className={styles.dashboardHeader}>
          <h1>Appointment Data</h1>
          <p>View and manage patient appointments.</p>
        </div>

        {appointments.length === 0 ? (

          <p>No appointments available.</p>

        ) : (

          <div className={styles.treatmentList}>

            {appointments.map((appointment) => (

              <div className={styles.treatmentCard} key={appointment.id}>

                <h3>
                  {appointment.patientName}
                </h3>

                <p>
                  <strong>Email:</strong>{" "}
                  {appointment.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {appointment.phone}
                </p>

                <p>
                  <strong>Treatment:</strong>{" "}
                  {appointment.treatment}
                </p>

                <p>
                  <strong>Doctor:</strong>{" "}
                  {appointment.doctor}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {appointment.date}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {appointment.time}
                </p>

                <div className={styles.inputGroup}>
                  <label>
                    Appointment Status
                  </label>

                  <select value={appointment.status} onChange={(e) =>   handleStatusChange( appointment.id, e.target.value ) } >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Confirmed">
                      Confirmed
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>

                <div className={styles.actionButtons}>

                  <button  className={styles.deleteButton}  onClick={() =>    handleDelete(appointment.id) }>
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>
    </div>
  );
};

export default AppointmentData;