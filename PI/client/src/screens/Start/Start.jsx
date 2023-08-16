import style from "./Start.module.css";
import { NavLink } from "react-router-dom";

export const Start = () => {
  return (
    <div className={style.landing}>
      <div className={style.textBig}>
        <h1>Countries App Proyect</h1>
      </div>

      <NavLink to="/home">
        <button className="button">Start</button>
      </NavLink>
    </div>
  );
};
