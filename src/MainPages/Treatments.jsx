import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./main.module.css";

const Treatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [subTreatments, setSubTreatments] = useState([]);

  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [selectedSubTreatment, setSelectedSubTreatment] =
    useState(null);

  useEffect(() => {
    fetchTreatments();
    fetchSubTreatments();
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

  
  const fetchSubTreatments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/subTreatments"
      );

      setSubTreatments(response.data);
    } catch (error) {
      console.error(
        "Error fetching sub treatments:",
        error
      );
    }
  };

  const treatmentImages = {
    
  "General Surgery": "/general.jpg",
  "Cardiac Surgery": "/cardiac-surgery.jpg",
  "Orthopedic Surgery": "/orthopedic.jpg",
  "Neurosurgery": "/neurosurgery.jpg",
  "Vascular Surgery": "/vasculer.jpg",
  "Gynecology Surgery": "/gynecology.jpg",
  "Cancer Surgery": "/cancer.jpg",
  "Plastic & Reconstructive Surgery": "/plastic.jpg",
  "Pediatric Surgery": "/pediatric.jpg",
  "Laparoscopic Surgery": "/laproscopy.jpg",
};
  


  const handleTreatmentClick = (treatment) => {
    setSelectedTreatment(treatment);
    setSelectedSubTreatment(null);
  };

  
  const handleSubTreatmentClick = (subTreatment) => {
    setSelectedSubTreatment(subTreatment);
  };

  const handleBackToTreatments = () => {
    setSelectedTreatment(null);
    setSelectedSubTreatment(null);
  };

  
  const handleBackToSubTreatments = () => {
    setSelectedSubTreatment(null);
  };


  const relatedSubTreatments = selectedTreatment
    ? subTreatments.filter(
        (subTreatment) =>
          String(subTreatment.treatmentId) ===
          String(selectedTreatment.id)
      )
    : [];

  return (
    <div className={styles.treatmentsPage}>

      <div className={styles.treatmentsHeader}>
        <h1>
          {selectedSubTreatment ? selectedSubTreatment.name: selectedTreatment? selectedTreatment.name: "Our Treatments"}
        </h1>

        <p>
          {selectedSubTreatment ? "Treatment details and information"  : selectedTreatment  ? selectedTreatment.description ||    "Explore our available sub treatments."
            : "Explore our specialized treatments and surgical services."}
        </p>
      </div>

      {!selectedTreatment && !selectedSubTreatment && (
        <section className={styles.treatmentsContainer}>

          {treatments.length === 0 ? (
            <div className={styles.noTreatmentMessage}>
              <p>No treatments available.</p>
            </div>
          ) : (
            <div className={styles.treatmentsCards}>

              {treatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className={styles.treatmentsCard}
                  onClick={() =>
                    handleTreatmentClick(treatment)
                  }
                >

            
                  {treatmentImages[treatment.name] && (
                    <img src={treatmentImages[treatment.name]} alt={treatment.name} className={styles.treatmentImage}/>
                  )}

            
                  <div className={styles.treatmentCardContent}>

                    <h3>{treatment.name}</h3>

                    <p>
                      {treatment.description}
                    </p>

                    <button type="button" className={styles.primaryButton} onClick={(event) => {
                     event.stopPropagation();

                        handleTreatmentClick( treatment); }} >
                      View Sub Treatments
                    </button>

                  </div>
                </div>
              ))}

            </div>
          )}

        </section>
      )}



      {selectedTreatment &&
        !selectedSubTreatment && (
          <section className={styles.treatmentsContainer}>

            <button type="button"className={styles.backButton} onClick={handleBackToTreatments} >
              ← Back to Treatments
            </button>

            <div className={ styles.selectedTreatmentInfo } >

          
              {treatmentImages[ selectedTreatment.name ] && (
                <img src={treatmentImages[selectedSubTreatment.name]} alt={selectedTreatment.name} className={ styles.selectedTreatmentImage }/>
              )}

              <h2>
                {selectedTreatment.name}
              </h2>

              <p>
                {selectedTreatment.description}
              </p>

            </div>

            <h2 className={styles.subTreatmentHeading }>
              Sub Treatments
            </h2>

            {relatedSubTreatments.length === 0 ? (
              <div className={   styles.noTreatmentMessage } >
                <p>
                  No sub treatments available for
                  this treatment.
                </p>
              </div>
            ) : (
              <div className={  styles.subTreatmentCards} >

                {relatedSubTreatments.map(
                  (subTreatment) => (
                    <div key={subTreatment.id} className={   styles.subTreatmentCard } onClick={() =>   handleSubTreatmentClick(  subTreatment
                        )}>

                      <h3>
                        {subTreatment.name}
                      </h3>

                      <p>
                        {subTreatment.description}
                      </p>

                      <button type="button" className={styles.primaryButton }
                        onClick={(event) => {
                          event.stopPropagation();

                          handleSubTreatmentClick(
                            subTreatment
                          );
                        }} >
                        View Details
                      </button>

                    </div>
                  )
                )}

              </div>
            )}

          </section>
        )}

     
      {selectedSubTreatment && (
        <section className={styles.treatmentsContainer}>

          <button type="button" className={styles.backButton} onClick={   handleBackToSubTreatments } >
            ← Back to Sub Treatments
          </button>

          <div className={styles.descriptionCard} >

            <h2>
              {selectedSubTreatment.name}
            </h2>

            <div  className={ styles.descriptionContent  }>

              <h3>Description</h3>

              <p>
                {selectedSubTreatment.description || "Detailed information about this treatment will be available soon."}
              </p>

            </div>

          </div>

        </section>
      )}

    </div>
  );
};

export default Treatments;