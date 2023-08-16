import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <div className={style.barra}>
      <NavLink className={style.countries} to="/home">
        Countries PI
      </NavLink>
      <NavLink className={style.select} to="/">
        Exit
      </NavLink>
    </div>
  );
};
