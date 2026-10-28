import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./main.module.css";

const BookAppointment = () => {
  const [treatments, setTreatments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    patientName: "",
    email: "",
    phone: "",
    treatment: "",
    doctor: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTreatments();
    fetchDoctors();
  }, []);

  const fetchTreatments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/treatments"
      );

      setTreatments(response.data);
    } catch (error) {
      console.error("Error fetching treatments:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/doctors"
      );

      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

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

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required";
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

    if (!formData.treatment) {
      newErrors.treatment = "Please select a treatment";
    }

    if (!formData.doctor) {
      newErrors.doctor = "Please select a doctor";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    if (!formData.time) {
      newErrors.time = "Please select a time";
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
        "http://localhost:3000/appointments",
        {
          ...formData,
          status: "Pending",
        }
      );

      setMessage(
        "Appointment booked successfully. Our team will contact you."
      );

      setFormData({
        patientName: "",
        email: "",
        phone: "",
        treatment: "",
        doctor: "",
        date: "",
        time: "",
      });

      setErrors({});
    } catch (error) {
      console.error("Error booking appointment:", error);

      setMessage(
        "Unable to book appointment. Please try again."
      );
    }
  };

  return (
    <div className={styles.appointmentPage}>

      

      <div className={styles.appointmentHeader}>
        <h1>Book Appointment</h1>

        <p>
          Schedule an appointment with our experienced doctors.
        </p>
      </div>

      

      <div className={styles.appointmentContainer}>

        <form className={styles.appointmentCard} onSubmit={handleSubmit}>

          <div className={styles.appointmentGrid}>

            

            <div className={styles.inputGroup}>
              <label htmlFor="patientName">
                Patient Name
              </label>

              <input  id="patientName"  type="text"  name="patientName"  value={formData.patientName}  onChange={handleChange} placeholder="Enter patient name"  />

              {errors.patientName && (
                <span className={styles.error}>
                  {errors.patientName}
                </span>
              )}
            </div>


    

            <div className={styles.inputGroup}>
              <label htmlFor="email">
                Email
              </label>

              <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" />

              {errors.email && (
                <span className={styles.error}>
                  {errors.email}
                </span>
              )}
            </div>


            

            <div className={styles.inputGroup}>
              <label htmlFor="phone">
                Phone Number
              </label>

              <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter 10 digit phone number" maxLength="10" />

              {errors.phone && (
                <span className={styles.error}>
                  {errors.phone}
                </span>
              )}
            </div>


      

            <div className={styles.inputGroup}>
              <label htmlFor="treatment">
                Treatment
              </label>

              <select id="treatment" name="treatment" value={formData.treatment} onChange={handleChange}>
                <option value="">
                  Select Treatment
                </option>

                {treatments.map((treatment) => (
                  <option key={treatment.id} value={treatment.name}>
                    {treatment.name}
                  </option>
                ))}
              </select>

              {errors.treatment && (
                <span className={styles.error}>
                  {errors.treatment}
                </span>
              )}
            </div>


            

            <div className={styles.inputGroup}>
              <label htmlFor="doctor">
                Doctor
              </label>

              <select  id="doctor"  name="doctor"  value={formData.doctor}  onChange={handleChange} >
                <option value="">
                  Select Doctor
                </option>

                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.name} >
                    {doctor.name}
                  </option>
                ))}
              </select>

              {errors.doctor && (
                <span className={styles.error}>
                  {errors.doctor}
                </span>
              )}
            </div>


            

            <div className={styles.inputGroup}>
              <label htmlFor="date">
                Appointment Date
              </label>

              <input id="date" type="date" name="date" value={formData.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} />

              {errors.date && (
                <span className={styles.error}>
                  {errors.date}
                </span>
              )}
            </div>


            

            <div className={styles.inputGroup}>
              <label htmlFor="time">
                Appointment Time
              </label>

              <input id="time" type="time" name="time" value={formData.time} onChange={handleChange}/>

              {errors.time && (
                <span className={styles.error}>
                  {errors.time}
                </span>
              )}
            </div>

          </div>


          

          {message && (
            <div className={styles.appointmentMessage}>
              {message}
            </div>
          )}


  

          <div className={styles.appointmentButtonContainer}>
            <button type="submit" className={styles.appointmentButton} >
              Book Appointment
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};

export default BookAppointment;