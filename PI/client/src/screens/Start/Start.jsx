import style from "./Start.module.css";
import { NavLink } from "react-router-dom";

export const Start = () => {
  return (
    <div className={style.landing}>
      <div className={style.text}></div>
      <div className={style.textBig}>
        <h1>Countries App Proyect</h1>
      </div>

      <NavLink to="/home">
        <button className={style.button}>START</button>
      </NavLink>
    </div>
  );
};
