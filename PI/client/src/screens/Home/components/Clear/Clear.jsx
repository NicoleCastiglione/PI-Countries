import React from "react";
import style from "../../Home.module.css";

export const Clear = ({ clear }) => {
  return (
    <div className={style.filterButton}>
      <button className="button" onClick={clear}>
        Clear
      </button>
    </div>
  );
};
