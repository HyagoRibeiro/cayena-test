import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  it('renders button correctly with given text', () => {
    const buttonText = 'Click';

    render(<Button text={buttonText} />);

    const buttonElement = screen.getByText(buttonText);
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick handler when button is clicked', () => {
    const onClickMock = jest.fn();

    render(<Button text="Click" onClick={onClickMock} />);

    const buttonElement = screen.getByText('Click');
    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalled();
  });
});
