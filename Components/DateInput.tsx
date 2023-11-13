import React from "react";

interface DateInputProps {
  id: string;
  label: string;
  value: Date | string;
  onChange: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ id, label, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const formattedDate =
    value instanceof Date
      ? `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`
      : value;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="date"
        id={id}
        className="mt-1 p-2 border rounded-md w-full"
        value={formattedDate}
        onChange={handleChange}
      />
    </div>
  );
};

export default DateInput;
