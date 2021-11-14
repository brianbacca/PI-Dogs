import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsName } from "../../actions/index.js";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogsName(search));
    setSearch("");
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => handleInputChange(e)}
            value={search}
          />
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
