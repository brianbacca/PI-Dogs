import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandigPage.module.css";

export default function LandingPage() {
  return (
    <div>
      <div className={styles.fondo}>
        <h1 className={styles.title}>Welcome</h1>
        <Link to="/dogs">
          <button className={styles.enter}>go into</button>
        </Link>
      </div>
    </div>
  );
}
