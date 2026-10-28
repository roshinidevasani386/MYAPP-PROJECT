import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import styles from "./admin.module.css";

const EditDeleteLocation = () => {
  const [locations, setLocations] = useState([]);
  const [editLocation, setEditLocation] = useState(null);
  const [errors, setErrors] = useState({});

  
  useEffect(() => {
    axios
      .get("http://localhost:3000/locations")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  
  const handleEdit = (location) => {
    setEditLocation(location);
    setErrors({});
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditLocation({
      ...editLocation,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  
  const validate = () => {
    let newErrors = {};

    if (!editLocation.name.trim()) {
      newErrors.name = "Location name is required";
    } else if (editLocation.name.length < 3) {
      newErrors.name = "Location name must be at least 3 characters";
    }

    if (!editLocation.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!editLocation.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!editLocation.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!editLocation.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(editLocation.phone)) {
      newErrors.phone = "Phone number must contain 10 digits";
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
      const response = await axios.put(
        `http://localhost:3000/locations/${editLocation.id}`,
        {
          name: editLocation.name,
          address: editLocation.address,
          city: editLocation.city,
          state: editLocation.state,
          phone: editLocation.phone,
        }
      );

      setLocations(
        locations.map((location) =>
          location.id === editLocation.id
            ? response.data
            : location
        )
      );

      alert("Location updated successfully!");

      setEditLocation(null);
      setErrors({});
    } catch (error) {
      console.error("Error updating location:", error);
      alert("Failed to update location");
    }
  };

  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this location?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3000/locations/${id}`
      );

      setLocations(
        locations.filter((location) => location.id !== id)
      );

      alert("Location deleted successfully!");
    } catch (error) {
      console.error("Error deleting location:", error);
      alert("Failed to delete location");
    }
  };

  return (
    <div className={styles.dashboardPage}>
      <AdminSidebar />

      <main className={styles.dashboardContent}>

        <div className={styles.dashboardHeader}>
          <h1>Manage Locations</h1>
          <p>Edit or delete hospital location details.</p>
        </div>

        {editLocation ? (

          

          <div className={styles.formCard}>

            <h2>Edit Location</h2>

            <form onSubmit={handleUpdate}>

              <div className={styles.inputGroup}>
                <label>Location Name</label>

                <input  type="text"  name="name"  value={editLocation.name}  onChange={handleChange}  placeholder="Enter location name"/>

                {errors.name && (
                  <p className={styles.error}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>Address</label>

                <textarea  name="address"  value={editLocation.address}  onChange={handleChange}  placeholder="Enter complete address"  rows="4"></textarea>

                {errors.address && (
                  <p className={styles.error}>
                    {errors.address}
                  </p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>City</label>

                <input  type="text"  name="city"  value={editLocation.city}  onChange={handleChange}  placeholder="Enter city"  />

                {errors.city && (
                  <p className={styles.error}>
                    {errors.city}
                  </p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>State</label>

                <input  type="text" name="state" value={editLocation.state} onChange={handleChange} placeholder="Enter state"/>

                {errors.state && (
                  <p className={styles.error}>
                    {errors.state}
                  </p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>Phone</label>

                <input type="text" name="phone" value={editLocation.phone} onChange={handleChange} placeholder="Enter 10 digit phone number" />

                {errors.phone && (
                  <p className={styles.error}>
                    {errors.phone}
                  </p>
                )}
              </div>

              <button type="submit" className={styles.editButton} >
                Update Location
              </button>

              <button  type="button"  className={styles.cancelButton}  onClick={() => {setEditLocation(null); setErrors({});}} >
                Cancel
              </button>

            </form>

          </div>

        ) : (

          

          <div className={styles.treatmentList}>

            {locations.length === 0 ? (

              <p>No locations available.</p>

            ) : (

              locations.map((location) => (

                <div className={styles.treatmentCard} key={location.id} >

                  <h3>{location.name}</h3>

                  <p>
                    <strong>Address:</strong>{" "}
                    {location.address}
                  </p>

                  <p>
                    <strong>City:</strong>{" "}
                    {location.city}
                  </p>

                  <p>
                    <strong>State:</strong>{" "}
                    {location.state}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {location.phone}
                  </p>

                  <div className={styles.actionButtons}>

                    <button className={styles.editButton}onClick={() => handleEdit(location)} >
                      Edit
                    </button>

                    <button className={styles.deleteButton} onClick={() =>   handleDelete(location.id) } >
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

export default EditDeleteLocation;