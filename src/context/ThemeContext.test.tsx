import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeContextProvider, { useTheme } from './ThemeContext';

describe('ThemeContextProvider', () => {
  it('provides theme context correctly', () => {
    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>
    );

    const initialThemeElement = screen.getByText('Current Theme: light');
    expect(initialThemeElement).toBeInTheDocument();

    const toggleThemeButton = screen.getByText('Toggle Theme');
    fireEvent.click(toggleThemeButton);

    const updatedThemeElement = screen.getByText('Current Theme: dark');
    expect(updatedThemeElement).toBeInTheDocument();
  });
});

const TestComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
