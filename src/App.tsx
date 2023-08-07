import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ThemeContextProvider, { useTheme } from "./context/ThemeContext";
import LoginPage from "./views/LoginPage";
import ListSuppliersPage from "./views/ListSuppliersPage";
import SupplierDetailPage from "./views/SupplierDetailPage";

import "./styles/styles.scss";

export const App = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={LoginPage} />
          <Route path="/list-suppliers" Component={ListSuppliersPage} />
          <Route path="/supplier-detail/:id" Component={SupplierDetailPage} />
        </Routes>
      </Router>
    </div>
  );
};

export default () => <ThemeContextProvider>{<App />}</ThemeContextProvider>;
