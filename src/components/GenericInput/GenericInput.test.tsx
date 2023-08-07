import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GenericInput from './index';

describe('GenericInput', () => {
  const labelText = 'Username';
  const inputPlaceholder = 'Enter your username';
  const inputValue = 'José';

  const { getByText, getByPlaceholderText } = render(
    <GenericInput
      label={labelText}
      type="text"
      value={inputValue}
      onChange={() => {}}
      placeholder={inputPlaceholder}
    />
  );

  it('renders input correctly with given props', () => {


    const labelElement = getByText(labelText);
    const inputElement = getByPlaceholderText(inputPlaceholder);
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

    const inputElement = getByPlaceholderText('Enter your username');
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

    const inputElement = getByPlaceholderText('Enter your username');
    expect(inputElement).toHaveClass(customClassName);
    expect(inputElement).toHaveAttribute('data-testid', dataTestId);
  });
});
