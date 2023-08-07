import React from "react";
import "./Menu.scss";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Menu: React.FC = () => {
  const { toggleTheme, theme } = useTheme();

  const themeToChange = theme === "dark" ? "Light" : "Dark";

  const handleDarkModeToggle = () => {
    toggleTheme();
  };

  const handleLogoff = () => {
    localStorage.removeItem("tokenCayena");
  };

  return (
    <div className="menu">
      <div className="logo">Logo</div>
      <div className="menu__items">
        <div className="menu__items__link" onClick={handleDarkModeToggle}>
          {themeToChange}
        </div>
        <Link to="/" className="menu__items__link" onClick={handleLogoff}>
          Logoff
        </Link>
      </div>
    </div>
  );
};

export default Menu;
