import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

export default function MultiSelect({ label, options, selectedValues, onChange, icon, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    if (selectedValues.includes(option.value)) {
      onChange(selectedValues.filter(id => id !== option.value));
    } else {
      onChange([...selectedValues, option.value]);
    }
  };

  const removeSelection = (optionValue) => {
    onChange(selectedValues.filter(id => id !== optionValue));
  };

  const getSelectedOptions = () => {
    return options.filter(option => selectedValues.includes(option.value));
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {icon && <span className="inline mr-2">{icon}</span>}
        {label}
      </label>
      
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {getSelectedOptions().map((option) => (
            <span
              key={option.value}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
            >
              {option.label}
              <button
                type="button"
                onClick={() => removeSelection(option.value)}
                className="ml-2 hover:text-indigo-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white text-left flex items-center justify-between"
        >
          <span className={selectedValues.length === 0 ? "text-gray-500" : "text-gray-900"}>
            {selectedValues.length === 0 
              ? placeholder 
              : `${selectedValues.length} selected`
            }
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {options.length === 0 ? (
              <div className="px-4 py-3 text-gray-500">No categories available</div>
            ) : (
              options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    onChange={() => handleSelect(option)}
                    className="mr-3 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-900">{option.label}</span>
                </label>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}