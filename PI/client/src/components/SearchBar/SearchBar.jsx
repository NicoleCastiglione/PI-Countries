import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCountry } from "../../redux/actions";
import style from "./SearchBar.module.css";

export const SearchBar = ({ handlePage }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchCountry(name));
    setName("");
    handlePage(1);
  };

  return (
    <form onSubmit={handleSubmit} className={style.searchbar}>
      <input
        className={style.search}
        type="search"
        placeholder=" Search Country..."
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button className={style.buttonSearch} type="submit" disabled={!name}>
        Search
      </button>
    </form>
  );
};
