import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Menu from "./index";
import ThemeContextProvider from "../../context/ThemeContext";
import { BrowserRouter as Router } from "react-router-dom";

describe("Menu", () => {
  beforeEach(() => {
    const mockRemoveItem = jest.fn();
    Object.defineProperty(window, "localStorage", {
      value: {
        removeItem: mockRemoveItem,
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const { getByText } = render(
    <ThemeContextProvider>
      <Router>
        <Menu />
      </Router>
    </ThemeContextProvider>
  );

  it("toggles dark mode correctly", () => {
    const initialThemeElement = getByText("Dark");
    expect(initialThemeElement).toBeInTheDocument();

    const toggleThemeButton = getByText("Dark");
    fireEvent.click(toggleThemeButton);

    const updatedThemeElement = getByText("Light");
    expect(updatedThemeElement).toBeInTheDocument();
  });

  it("removes token from localStorage on logoff", () => {
    const removeItemMock = jest.spyOn(localStorage, "removeItem");

    render(
      <ThemeContextProvider>
        <Router>
          <Menu />
        </Router>
      </ThemeContextProvider>
    );

    const logoffLink = getByText("Logout");
    fireEvent.click(logoffLink);

    expect(removeItemMock).toHaveBeenCalledWith("tokenCayena");
  });
});
