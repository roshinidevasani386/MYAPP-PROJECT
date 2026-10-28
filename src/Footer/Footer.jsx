import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>

      <div className={styles.footerContainer}>

        
        <div className={styles.footerSection}>
          <h3>About Us</h3>
          <p>
            SurgiNova Care provides trusted surgical care with
            experienced doctors, modern technology and
            compassionate treatment.
          </p>
        </div>

        
        <div className={styles.footerSection}>
          <h3>Treatments</h3>

          <NavLink to="/treatments">General Surgery</NavLink>
          <NavLink to="/treatments">Orthopedic Surgery</NavLink>
          <NavLink to="/treatments">Cardiac Surgery</NavLink>
          <NavLink to="/treatments">Neurosurgery</NavLink>
          <NavLink to="/treatments">Laparoscopic Surgery</NavLink>
          <NavLink to="/treatments">Plastic Surgery</NavLink>
        </div>

        
        <div className={styles.footerSection}>
          <h3>Reach Us</h3>

          <NavLink to="/reach-us">Our Location</NavLink>
          <NavLink to="/reach-us">Find a Doctor</NavLink>
          <NavLink to="/reach-us">Book Appointment</NavLink>
          <NavLink to="/reach-us">Emergency Care</NavLink>
        </div>

        
        <div className={styles.footerSection}>
          <h3>Contact Us</h3>

          <p>📍 Hyderabad, Telangana</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ info@surginovacare.com</p>
          <p>🕒 24/7 Emergency Support</p>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>© 2026 SurgiNova Care. All Rights Reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;