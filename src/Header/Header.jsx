import React from "react";
import { NavLink } from "react-router-dom";

import Logo from "../assets/logo.png";

import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>

      
      <div className={styles.logoSection}>
        <NavLink to="/" className={styles.logoLink}>
          <img src={Logo} alt="SurgiNova Care" className={styles.logo} />
        </NavLink>
      </div>

      
      <nav className={styles.navbar}>

        <NavLink  to="/"className={({ isActive }) =>  isActive  ? `${styles.navLink} ${styles.active}`  : styles.navLink }>
          Home
        </NavLink>

        <NavLink to="/treatments"  className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink }>
          Treatments
        </NavLink>

        <NavLink to="/book-appointment" className={({ isActive }) => isActive  ? `${styles.navLink} ${styles.active}` : styles.navLink } >
          Book Appointment
        </NavLink>

        <NavLink to="/add-business" className={({ isActive }) =>isActive ? `${styles.navLink} ${styles.active}` : styles.navLink } >
          Add Your Business
        </NavLink>

        <NavLink  to="/reach-us"  className={({ isActive }) =>isActive ? `${styles.navLink} ${styles.active}` : styles.navLink }  >
          Reach Us
        </NavLink>

      </nav>

    </header>
  );
};

export default Header;