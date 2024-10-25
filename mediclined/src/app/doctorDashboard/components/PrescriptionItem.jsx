import React, { useState } from "react";

const PrescriptionItem = ({ medicine, onDelete }) => {
  const [dosage, setDosage] = useState(medicine.dosage);
  const [timing, setTiming] = useState(medicine.timing);

  const toggleTiming = (option) => {
    setTiming((prev) => ({
      ...prev,
      [option]: prev[option] ? "" : option,
    }));
  };

  // Define time of day options
  const timeOptions = [
    { label: "Morning", codes: ["MB", "MA"] }, // BF and AF
    { label: "Afternoon", codes: ["AB", "AA"] },
    { label: "Night", codes: ["NB", "NA"] },
  ];

  return (
    <li className="border-b py-2 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition duration-200">
      <div className="flex-grow">
        <strong>{medicine.name}</strong>
      </div>

      <div className="flex items-center">
        <label className="mr-2 text-sm">Dosage (days):</label>
        <input
          type="number"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          placeholder="Days"
          className="border border-gray-300 p-1 rounded w-20 mx-2"
          min="1"
          aria-label="Dosage in days"
        />
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
                      timing[code] ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => toggleTiming(code)}
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
