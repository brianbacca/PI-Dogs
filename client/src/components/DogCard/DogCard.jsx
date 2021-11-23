import React from "react";
import styles from "./DogCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../actions";
import { NavLink } from "react-router-dom";
export default function DogCard({
  name,
  temperament,
  image,
  weight_min,
  weight_max,
}) {
  const doggi = useSelector((state) => state.dogs);
  const iDs = doggi.map((el) => el.id);
  const dispatch = useDispatch();
  function handleReset(e) {
    dispatch(getDogs());
  }
  return (
    <div>
      <div className={weight_min || weight_max ? styles.card : styles.error}>
        <li>
          <h3 className={styles.name}>{name}</h3>

          <img className={styles.image} src={image} alt="" />

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
        {temperament || weight_min || weight_max ? (
          <br></br>
        ) : (
          <input type="reset" value="Try Again" onClick={() => handleReset()} />
        )}
      </div>
    </div>
  );
}

// {
//   datos.temperament || datos.weight_min || datos.weight_max ? (
//     <br></br>
//   ) : (
//     <input type="reset" value="Try Again" onClick={() => reset()} />
//   );
// }
