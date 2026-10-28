import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./main.module.css";

const ReachUs = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/locations"
      );

      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  return (
    <div className={styles.reachUsPage}>

    

      <div className={styles.reachUsHeader}>
        <h1>Reach Us</h1>

        <p>
          Visit our hospitals or contact us for more information
          and assistance.
        </p>
      </div>




      <section className={styles.contactSection}>

        <div className={styles.contactCard}>

          <h2>Contact Us</h2>

          <div className={styles.contactItem}>
            <strong>Phone</strong>
            <p>+91 98765 43210</p>
          </div>

          <div className={styles.contactItem}>
            <strong>Email</strong>
            <p>info@surginovacare.com</p>
          </div>

          <div className={styles.contactItem}>
            <strong>Working Hours</strong>
            <p>24/7</p>
          </div>

        </div>

      </section>


      

      <section className={styles.locationSection}>

        <div className={styles.sectionTitle}>

          <h2>Our Hospital Locations</h2>

          <p>
            Find a SurgiNova Care hospital near you.
          </p>

        </div>


        <div className={styles.locationGrid}>

          {locations.length === 0 ? (

            <div className={styles.noLocations}>
              <p>
                No hospital locations available.
              </p>
            </div>

          ) : (

            locations.map((location) => (

              <div
                key={location.id}
                className={styles.locationCard}
              >

                <h3>{location.name}</h3>

                <div className={styles.locationDetail}>
                  <strong>Address</strong>
                  <p>{location.address}</p>
                </div>

                <div className={styles.locationDetail}>
                  <strong>City</strong>
                  <p>{location.city}</p>
                </div>

                <div className={styles.locationDetail}>
                  <strong>State</strong>
                  <p>{location.state}</p>
                </div>

                <div className={styles.locationDetail}>
                  <strong>Phone</strong>
                  <p>{location.phone}</p>
                </div>

              </div>

            ))

          )}

        </div>

      </section>

      <section className={styles.reachUsBottom}>

        <h2>Need More Information?</h2>

        <p>
          Contact our team for appointments, treatments and
          other healthcare information.
        </p>

        <a href="tel:+919876543210" className={styles.primaryButton} >
          Call Us
        </a>

      </section>

    </div>
  );
};

export default ReachUs;