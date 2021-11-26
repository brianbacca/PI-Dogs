import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={style.nav}>
      <div className={style.contenedor}>
        <NavLink to="/newDog" className={style.link}>
          <h2 className={style.create}>Create Dog</h2>
        </NavLink>
        <NavLink className={style.link} to="/dogs">
          <h1 className={style.name}>Pi Dogs </h1>
        </NavLink>
      </div>
    </div>
  );
}
