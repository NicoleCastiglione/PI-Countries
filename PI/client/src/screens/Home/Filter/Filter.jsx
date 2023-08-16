import React from "react";
import style from "../Home.module.css";

export const Filter = ({
  continentFilter,
  activityFilter,
  activities,
  applyAction,
}) => {
  return (
    <div className={style.filterContainer}>
      <div>
        <h3 className={style.subtitle}>Continent</h3>
        <select className={style.select} onChange={continentFilter}>
          <option value="All">All Continents</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antartica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
        </select>
      </div>

      <div>
        <h3 className={style.subtitle}>Activity</h3>
        <select className={style.select} onChange={activityFilter}>
          <option value="All">All Activities</option>
          {activities &&
            activities.map((activity) => {
              return <option value={activity.name}>{activity.name}</option>;
            })}
        </select>
      </div>

      <button className={style.reload} type="submit" onClick={applyAction}>
        Apply
      </button>
    </div>
  );
};
