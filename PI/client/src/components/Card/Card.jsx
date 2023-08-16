import React from "react";
import CardStyles from "./Card.module.css";
import { NavLink } from "react-router-dom";

// Componente DUMB -> solo se encarga de renderizar info

export const Card = ({ id, name, imageFlag, continent }) => {
  return (
    <NavLink to={`/detail/${id}`}>
      <div className={CardStyles.Card}>
        <div className={CardStyles.img}>
          <img className={CardStyles.imgCard} src={imageFlag} alt="Country" />
        </div>
        <div className={CardStyles.titles}>
          <h4 className={CardStyles.title}>{name}</h4>
          <h6 className={CardStyles.subtitle}>Continent: {continent}</h6>
        </div>
      </div>
    </NavLink>
  );
};
