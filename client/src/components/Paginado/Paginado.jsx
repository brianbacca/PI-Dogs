/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "./Paginado.module.css";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumber = [];

  //itero saco el resto entre todos los perros y los que quiero tener por pagina(redondeo para arriba)
  for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i + 1);
  }
  return (
    <div>
      <nav>
        <ul className={styles.ul}>
          {pageNumber &&
            pageNumber.map((number) => (
              <li key={number} className={styles.list}>
                <a className={styles.num} onClick={() => paginado(number)}>
                  {number}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
