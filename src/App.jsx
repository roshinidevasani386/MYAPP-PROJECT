import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

// Public pages
import Home from "./MainPages/Home";
import Treatments from "./MainPages/Treatments";
import BookAppointment from "./MainPages/BookAppointment";
import AddBusiness from "./MainPages/AddBusiness";
import ReachUs from "./MainPages/ReachUs";

// Admin pages
import AdminLogin from "./Admin/AdminLogin";
import Register from "./Admin/Register";
import ForgotPassword from "./Admin/ForgotPassword";
import Dashboard from "./Admin/Dashboard";
import AddTreatment from "./Admin/AddTreatment";
import EditDeleteTreatment from "./Admin/EditDeleteTreatment";
import AddSubTreatment from "./Admin/AddSubTreatment";
import EditDeleteSubTreatment from "./Admin/EditDeleteSubTreatment";
import AddDoctors from "./Admin/AddDoctors";
import EditDeleteDoctors from "./Admin/EditDeleteDoctors";
import AddLocation from "./Admin/AddLocation";
import EditDeleteLocation from "./Admin/EditDeleteLocation";
import AppointmentData from "./Admin/AppointmentData";

function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>

      
        <Route path="/" element={<Home />} />

        <Route path="/treatments" element={<Treatments />}/>

        <Route
          path="/book-appointment"
          element={<BookAppointment />}
        />

        <Route
          path="/add-business"
          element={<AddBusiness />}
        />

        <Route
          path="/reach-us"
          element={<ReachUs />}
        />

        
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/admin-dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/add-treatment"
          element={<AddTreatment />}
        />

        <Route
          path="/edit-delete-treatment"
          element={<EditDeleteTreatment />}
        />

        <Route
          path="/add-sub-treatment"
          element={<AddSubTreatment />}
        />

        <Route
          path="/edit-delete-sub-treatment"
          element={<EditDeleteSubTreatment />}
        />

        <Route
          path="/add-doctors"
          element={<AddDoctors />}
        />

        <Route
          path="/edit-delete-doctors"
          element={<EditDeleteDoctors />}
        />

        <Route
          path="/add-location"
          element={<AddLocation />}
        />

        <Route
          path="/edit-delete-location"
          element={<EditDeleteLocation />}
        />

        <Route
          path="/appointment-data"
          element={<AppointmentData />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;