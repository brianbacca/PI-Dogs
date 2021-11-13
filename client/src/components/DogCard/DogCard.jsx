import React from "react";
import styles from "./DogCard.module.css";

export default function DogCard({ name, temperament, image, weight }) {
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
        <span>{weight}</span>
      </li>
    </div>
  );
}
