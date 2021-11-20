import React from "react";
import styles from "./DogCard.module.css";

export default function DogCard({
  name,
  temperament,
  image,
  weight_min,
  weight_max,
}) {
  return (
    <div>
      <div className={styles.card}>
        <li>
          <h3 className={styles.name}>{name}</h3>
          <img mg className={styles.image} src={image} alt="img not found" />
          <div className={styles.otros}>
            <h4>Temperament:</h4>
            <span>{temperament}</span>
          </div>
          <div className={styles.otros}>
            <h4>Weight:</h4>
            <span>
              {weight_min}-{weight_max} Kg
            </span>
          </div>
        </li>
      </div>
    </div>
  );
}
