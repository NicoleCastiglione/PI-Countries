import { NavLink } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import style from "./Navbar.module.css";

export const Navbar = ({ handlePage }) => {
  return (
    <div className={style.navContainer}>
      <NavLink className={style.homeButton} to="/home">
        Icono mundo
      </NavLink>

      <div className={style.searchAndActivities}>
        <NavLink className={style.navButton} to="/activities">
          Activities
        </NavLink>

        <SearchBar handlePage={handlePage} />
      </div>

      <NavLink className={style.navButton} to="/">
        Exit
      </NavLink>
    </div>
  );
};
