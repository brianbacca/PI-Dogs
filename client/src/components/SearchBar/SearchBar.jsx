import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsName } from "../../actions/index.js";

export function SearchBar() {
  const dispatch = useDispatch();
  const [searchBar, getSearchBar] = useState("");

  return (
    <div>
      <input type="text" placeholder="search" />
      <button type="submit">Search</button>
    </div>
  );
}
