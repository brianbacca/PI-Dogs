import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsName } from "../../actions/index.js";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
    dispatch(getDogsName(e.target.value));
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogsName(search));
    setSearch("");
  }

  return (
    <div className={styles.box}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.cont}>
          <input
            className={styles.input}
            type="text"
            placeholder="Search..."
            autoComplete="of"
            onChange={(e) => handleInputChange(e)}
            value={search}
          />
        </div>
        <div>
        </div>
      </form>
    </div>
  );
}
