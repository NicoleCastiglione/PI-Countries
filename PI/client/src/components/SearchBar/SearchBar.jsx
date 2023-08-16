import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCountry } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import style from "./SearchBar.module.css";

// cambiar las props por un objeto que reciba las propiedades.
// averiguar como hacer para tipar ese objeto usando propTypes. no es obligatorio, hace esto a lo ultimo de todo. inclusive luego de terminar el CSS.
export const SearchBar = (props) => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.allCountries);

  useEffect(() => {
    console.log("countries: ", countries);
  }, [countries]);

  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchCountry(name));
    setName("");
    props.onPageChange(1);
  };

  return (
    <div className={style.barra}>
      <button className={style.countries}>Countries PI</button>

      <form onSubmit={handleSubmit} className={style.searchbar}>
        <input
          className={style.search}
          type="search"
          placeholder=" Search Country..."
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button
          className={style.buttonsearch}
          type="submit"
          disabled={name === ""}
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>

      <NavLink className={style.select} to="/activities">
        Activities
      </NavLink>
      <NavLink className={style.select} to="/">
        Exit
      </NavLink>
    </div>
  );
};
