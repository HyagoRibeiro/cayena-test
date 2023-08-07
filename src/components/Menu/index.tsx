import React from "react";
import "./Menu.scss";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Switch from "../ToggleButton";

const Menu: React.FC = () => {
  const { toggleTheme, theme } = useTheme();

  const isDark = theme === 'dark'
  const handleLogoff = () => {
    localStorage.removeItem("tokenCayena");
  };

  return (
    <div className="menu">
      <div className="logo">Logo</div>
      <div className="menu__items">
        <div className="menu__items__link">
          <span>Light</span>
          <Switch onChange={toggleTheme} checked={isDark} />
          <span>Dark</span>
        </div>
        <Link to="/" className="menu__items__link" onClick={handleLogoff}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Menu;
