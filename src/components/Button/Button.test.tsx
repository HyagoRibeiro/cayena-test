import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  const { getByText } = render(<Button>Click</Button>);

  it('renders button correctly with given text', () => {

    const buttonElement = getByText('Click');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick handler when button is clicked', () => {
    const onClickMock = jest.fn();

    render(<Button onClick={onClickMock}>Click</Button>);

    const buttonElement = getByText('Click');
    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalled();
  });
});
