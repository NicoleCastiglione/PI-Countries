import { NavLink, useLocation } from "react-router-dom";
import { SearchBar } from "../SearchBar/SearchBar";
import svgIcon from "../../assets/icon.svg";
import style from "./Navbar.module.css";

export const Navbar = ({ handlePage }) => {
  const location = useLocation();
  const showSearchBar = location.pathname === "/home";
  return (
    <div className={style.navContainer}>
      <NavLink to="/home">
        <img src={svgIcon} alt="icon" width={35} />
      </NavLink>

      {showSearchBar && (
        <div className={style.searchAndActivities}>
          <NavLink className={style.navButton} to="/activities">
            Activities
          </NavLink>

          <SearchBar handlePage={handlePage} />
        </div>
      )}

      <NavLink className={style.navButton} to="/">
        Exit
      </NavLink>
    </div>
  );
};
