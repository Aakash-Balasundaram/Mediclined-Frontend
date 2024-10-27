import React from 'react';

const PrescriptionItem = ({ medicineObject, onUpdate, onDelete }) => {
  // Time of day options configuration
  const timeOptions = [
    { label: "Morning", codes: ["MB", "MA"] }, 
    { label: "Afternoon", codes: ["AB", "AA"] },
    { label: "Night", codes: ["NB", "NA"] },
  ];

  // Handler for timing updates
  const handleTimingToggle = (code) => {
    const newTiming = {
      ...medicineObject.timing,
      [code]: medicineObject.timing[code] ? "" : code,
    };
    onUpdate(medicineObject.id, "timing", newTiming);
  };

  // Handler for selected strength and form change
  const handleStrengthAndFormChange = (selectedOption) => {
    onUpdate(medicineObject.id, "selectedStrength", selectedOption);
  };

  return (
    <li className="border-b py-2 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition duration-200">
      <div className="flex-grow">
        <strong>{medicineObject.name}</strong>
      </div>

      <div className="flex items-center space-x-2">
        <label className="mr-2 text-sm">Dosage (days):</label>
        <input
          type="number"
          value={medicineObject.dosage}
          onChange={(e) => onUpdate(medicineObject.id, "dosage", e.target.value)}
          placeholder="Days"
          className="border border-gray-300 p-1 rounded w-20 mx-2"
          min="1"
          aria-label="Dosage in days"
        />
      </div>

      <div className="flex items-center space-x-2">
        <label className="mr-2 text-sm">Strength:</label>
        <select
          value={medicineObject.selectedStrength}
          onChange={(e) => handleStrengthAndFormChange(e.target.value)}
          className="border border-gray-300 p-1 rounded mx-2"
          aria-label="Select medicine strength"
        >
          <option value="">Select Strength</option>
          {medicineObject.strengthAndForm.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <div className="flex space-x-4">
          {timeOptions.map(({ label, codes }) => (
            <div
              key={label}
              className="flex flex-col items-center border-dotted border border-gray-400 p-2 rounded-md"
            >
              <span className="text-sm">{label}</span>
              <div className="flex space-x-1 mt-1">
                {codes.map((code) => (
                  <button
                    key={code}
                    className={`text-xs px-2 py-1 border rounded-md transition duration-200 ${
                      medicineObject.timing[code] 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleTimingToggle(code)}
                    aria-label={`Select ${code}`}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2 ml-2">
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 transition duration-200 text-xs"
          aria-label="Delete prescription item"
        >
          X
        </button>
      </div>
    </li>
  );
};

export default PrescriptionItem;
