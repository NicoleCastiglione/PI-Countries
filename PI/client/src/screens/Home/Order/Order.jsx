import React from "react";
import style from "../Home.module.css";

export const Order = ({ orderCountries, orderedBy }) => {
  return (
    <div className={style.orderContainer}>
      <select
        className={style.select}
        onChange={orderCountries}
        value={orderedBy}
      >
        <option value="" disabled selected>
          Order by...
        </option>
        <option value="ascName">Names A - Z</option>
        <option value="descName">Names Z - A</option>
        <option value="ascPopulation">Population Low-High</option>
        <option value="descPopulation">Population High-Low</option>
      </select>
    </div>
  );
};
