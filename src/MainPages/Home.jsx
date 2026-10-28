import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import banner from "../assets/banner.png";
import banner1 from "../assets/banner1.png";

import styles from "./main.module.css";

const Home = () => {
  const slides = [
    {
      image: banner,
      title: "SurgiNova Care",
      text: "Advanced Surgical Care with Trusted Medical Professionals",
    },
    {
      image: banner1,
      title: "Quality Healthcare",
      text: "Experienced Doctors and Modern Healthcare Facilities",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  // Only 4 treatments for Home page
  const treatments = [
    {
      name: "General Surgery",
      description:
        "Surgical treatment for common medical conditions.",
      image: "/general-icon.jpg",
    },
    {
      name: "Cardiac Surgery",
      description:
        "Specialized surgical treatment for heart-related conditions.",
      image: "/cardiac-icon.jpg",
    },
    {
      name: "Orthopedic Surgery",
      description:
        "Treatment for bones, joints, muscles and related conditions.",
      image: "/orthopedic-icon.jpg",
    },
    {
      name: "Neurosurgery",
      description:
        "Specialized treatment for brain and nervous system conditions.",
      image: "/neurosurgery-icon.jpg",
    },
  ];

  return (
    <div className={styles.homePage}>

      {/* ================= CAROUSEL ================= */}
      <section className={styles.carousel}>
        <div className={styles.carouselContainer}>

          <img src={slides[currentSlide].image} alt="SurgiNova Care Hospital" className={styles.carouselImage} />

          

          <button type="button" className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`} onClick={previousSlide}>
            ❮
          </button>

          <button type="button" className={`${styles.carouselArrow} ${styles.carouselArrowRight}`} onClick={nextSlide} >
            ❯
          </button>

          <div className={styles.carouselDots}>
            {slides.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={
                  index === currentSlide
                    ? `${styles.carouselDot} ${styles.carouselDotActive}`
                    : styles.carouselDot
                }
              />
            ))}
          </div>

        </div>
      </section>


  
      <section className={styles.aboutSection}>

        <div className={styles.sectionTitle}>
          <h2>About Us</h2>

          <p>
            SurgiNova Care provides quality surgical and healthcare
            services with experienced doctors, modern facilities and
            patient-focused care.
          </p>
        </div>

      </section>


      {/* ================= OUR TREATMENTS ================= */}
      <section className={styles.homeTreatmentSection}>

        <div className={styles.sectionTitle}>
          <h2>Our Treatments</h2>

          <p>
            Explore our specialized treatments and surgical services.
          </p>
        </div>


        <div className={styles.homeTreatmentCards}>

          {treatments.map((treatment) => (

            <div
              key={treatment.name}
              className={styles.homeTreatmentCard}
            >

              
              <img src={treatment.image} alt={treatment.name} className={styles.homeTreatmentImage} />

              <div className={styles.homeTreatmentContent}>

                <h3>{treatment.name}</h3>

                <p>{treatment.description}</p>

                <NavLink to="/treatments"  className={styles.primaryButton} >
                  View Treatments
                </NavLink>

              </div>

            </div>

          ))}

        </div>


  
        <div className={styles.viewTreatment}>

          <NavLink to="/treatments" className={styles.primaryButton} >
            View All Treatments
          </NavLink>

        </div>

      </section>


    
      <section className={styles.homeAppointment}>

        <h2>Need a Consultation?</h2>

        <p>
          Book an appointment with our experienced doctors.
        </p>

        <NavLink to="/book-appointment" className={styles.primaryButton}>
          Book Appointment
        </NavLink>

      </section>

    </div>
  );
};

export default Home;