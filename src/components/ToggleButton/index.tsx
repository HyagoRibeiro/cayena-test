import React, { useState } from 'react';

interface SwitchProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
}

const Switch: React.FC<SwitchProps> = ({ onChange, checked }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <label className="switch">
      <input data-testid="switch" type="checkbox" checked={isChecked} onChange={handleChange} />
      <span className="switch__slider" />
    </label>
  );
};

export default Switch;
