import React from 'react';

interface ButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
