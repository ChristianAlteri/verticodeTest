import React from "react";

interface DropdownProps {
  label?: string;
  id?: string;
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, id, options, value, onChange }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="
              block 
              text-sm 
              font-medium 
              leading-6 
              text-gray-700

            "
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          id={id}
          autoComplete={id}
          className='
                form-select
                block 
                w-full 
                rounded-md 
                border-0 

                p-2
                text-gray-900 
                shadow-sm 
                ring-1 
                ring-inset 
                ring-gray-300 
                placeholder:text-gray-400 
                focus:ring-2 
                focus:ring-inset 
                focus:ring-emerald-500 
                sm:text-sm 
                sm:leading-6
                '
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        >
          {options &&
            options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
