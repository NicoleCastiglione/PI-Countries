import style from "./Start.module.css";
import { NavLink } from "react-router-dom";

export const Start = () => {
  return (
    <>
      <div className={style.text}>
        <h1>Countries App</h1>
      </div>

      <NavLink to="/home">
        <button className="button">Start</button>
      </NavLink>
    </>
  );
};
