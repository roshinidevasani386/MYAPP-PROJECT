import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./admin.module.css";

const AdminSidebar = () => {
  return (
    <aside className={styles.sidebar}>

      <div className={styles.sidebarLogo}>
        <h2>SurgiNova</h2>
        <p>Admin Panel</p>
      </div>

      <nav className={styles.sidebarNav}>

        <NavLink to="/admin-dashboard"> Dashboard</NavLink>

        <NavLink to="/add-treatment">Add Treatment</NavLink>

        <NavLink to="/edit-delete-treatment">Manage Treatments</NavLink>

        <NavLink to="/add-sub-treatment">Add Sub Treatment</NavLink>

        <NavLink to="/edit-delete-sub-treatment"> Manage Sub Treatments</NavLink>

        <NavLink to="/add-doctors"> Add Doctors</NavLink>

        <NavLink to="/edit-delete-doctors">Manage Doctors</NavLink>

        <NavLink to="/add-location">Add Location</NavLink>

        <NavLink to="/edit-delete-location">Manage Locations</NavLink>

        <NavLink to="/appointment-data"> Appointments </NavLink>

        <NavLink to="/admin-login">Logout</NavLink>

      </nav>

    </aside>
  );
};

export default AdminSidebar;