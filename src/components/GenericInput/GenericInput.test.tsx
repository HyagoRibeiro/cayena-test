import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GenericInput from './index';

describe('GenericInput', () => {
  it('renders input correctly with given props', () => {
    const labelText = 'Username';
    const inputPlaceholder = 'Enter your username';
    const inputValue = 'José';

    render(
      <GenericInput
        label={labelText}
        type="text"
        value={inputValue}
        onChange={() => {}}
        placeholder={inputPlaceholder}
      />
    );

    const labelElement = screen.getByText(labelText);
    const inputElement = screen.getByPlaceholderText(inputPlaceholder);
    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(inputValue);
  });

  it('calls onChange handler when input value changes', () => {
    const onChangeMock = jest.fn();

    render(
      <GenericInput
        label="Username"
        type="text"
        value=""
        onChange={onChangeMock}
        placeholder="Enter your username"
      />
    );

    const inputElement = screen.getByPlaceholderText('Enter your username');
    fireEvent.change(inputElement, { target: { value: 'José' } });

    expect(onChangeMock).toHaveBeenCalled();
  });

  it('passes additional props to input element', () => {
    const customClassName = 'custom-input-class';
    const dataTestId = 'custom-input-test-id';

    render(
      <GenericInput
        label="Username"
        type="text"
        value=""
        onChange={() => {}}
        placeholder="Enter your username"
        className={customClassName}
        data-testid={dataTestId}
      />
    );

    const inputElement = screen.getByPlaceholderText('Enter your username');
    expect(inputElement).toHaveClass(customClassName);
    expect(inputElement).toHaveAttribute('data-testid', dataTestId);
  });
});
