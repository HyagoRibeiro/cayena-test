import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Menu from './index';
import ThemeContextProvider from '../../context/ThemeContext';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Menu', () => {
    beforeEach(() => {
        const mockRemoveItem = jest.fn();
        Object.defineProperty(window, 'localStorage', {
          value: {
            removeItem: mockRemoveItem,
          },
        });
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

  it('toggles dark mode correctly', () => {
    render(
      <ThemeContextProvider>
        <Router>
          <Menu />
        </Router>
      </ThemeContextProvider>
    );

    const initialThemeElement = screen.getByText('Dark');
    expect(initialThemeElement).toBeInTheDocument();

    const toggleThemeButton = screen.getByText('Dark');
    fireEvent.click(toggleThemeButton);

    const updatedThemeElement = screen.getByText('Light');
    expect(updatedThemeElement).toBeInTheDocument();
  });

  it('removes token from localStorage on logoff', () => {
    const removeItemMock = jest.spyOn(localStorage, 'removeItem');

    render(
      <ThemeContextProvider>
        <Router>
          <Menu />
        </Router>
      </ThemeContextProvider>
    );

    const logoffLink = screen.getByText('Logoff');
    fireEvent.click(logoffLink);

    expect(removeItemMock).toHaveBeenCalledWith('tokenCayena');
  });
});
