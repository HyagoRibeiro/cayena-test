import React from 'react';

interface GenericInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
  }

const GenericInput: React.FC<GenericInputProps> = ({
    id,
    type,
    value,
    onChange,
    placeholder,
    label,
    ...rest
}) => {
  return (
    <>
    {label && <label>{label}</label>}
    <input
        id={id}
        className={`generic-input`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
    />
    </>
  );
};

export default GenericInput;