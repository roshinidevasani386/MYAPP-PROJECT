import React from "react";
import { NavLink } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import styles from "./admin.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboardPage}>

      <AdminSidebar />

      <main className={styles.dashboardContent}>

        <div className={styles.dashboardHeader}>
          <h1>Admin Dashboard</h1>
          <p>Welcome to SurgiNova Care Admin Panel</p>
        </div>

        <div className={styles.dashboardCards}>

          <div className={styles.dashboardCard}>
            <h3>Treatments</h3>
            <p>Manage Treatments</p>
            <NavLink to="/edit-delete-treatment">View Treatments</NavLink>
          </div>

          <div className={styles.dashboardCard}>
            <h3>Doctors</h3>
            <p>Manage Doctors</p>
            <NavLink to="/edit-delete-doctors"> View Doctors</NavLink>
          </div>

          <div className={styles.dashboardCard}>
            <h3>Locations</h3>
            <p>Manage Hospital Locations</p>
            <NavLink to="/edit-delete-location"> View Locations</NavLink>
          </div>

          <div className={styles.dashboardCard}>
            <h3>Appointments</h3>
            <p>View Patient Appointments</p>
            <NavLink to="/appointment-data">View Appointments </NavLink>
          </div>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;