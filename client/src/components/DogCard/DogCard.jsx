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
      <li className={styles.format}>
        <h3>{name}</h3>
        <img mg className={styles.image} src={image} alt="img not found" />
        <div>
          <h4>Temperament:</h4>
          <span>{temperament}</span>
        </div>
        <h4>Weight:</h4>
        <span>{weight_min} kg</span>
        <br></br>
        <span>{weight_max} kg</span>
      </li>
    </div>
  );
}
