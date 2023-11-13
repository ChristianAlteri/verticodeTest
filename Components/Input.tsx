import React from "react";

interface InputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ id, label, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        id={id}
        className="
        form-input
        block 
        w-full 
        rounded-md 
        border-0 
        p-2
        text-gray-900 
        shadow-sm 
        ring-1 
        ring-inset 
        ring-gray-200 
        placeholder:text-gray-400 
        focus:ring-2
        focus:ring-emerald-400 
        sm:text-sm 
        sm:leading-6"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // tabIndex={0}
      />
    </div>
  );
};

export default Input;
