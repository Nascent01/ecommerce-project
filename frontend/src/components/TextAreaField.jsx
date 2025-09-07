import React from "react";

function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  icon,
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {icon && <span className="inline mr-2">{icon}</span>}
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={4}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextAreaField;
