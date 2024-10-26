"use client"
import React, { useState, useEffect, useRef } from "react";

const MedicineSearch = ({ medicines, onSelect, callAPI, resetMedicines }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const previousSearchTerm = useRef(""); // Reference to store last search term

  useEffect(() => {
    if (!searchTerm) {
      resetMedicines(); 
      previousSearchTerm.current = "";
    } else if (searchTerm !== previousSearchTerm.current) {
      const debounceTimeout = setTimeout(() => {
        callAPI(searchTerm);
        previousSearchTerm.current = searchTerm; // Update previous search term
      }, 200);
  
      return () => clearTimeout(debounceTimeout);
    }
  }, [searchTerm, callAPI, resetMedicines]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search medicines..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 p-2 rounded mb-2"
      />
      {medicines.length > 0 && (
        <ul className="bg-white border border-gray-300 rounded mt-2 max-h-40 overflow-y-auto">
          {medicines.map((medicine, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                onSelect(medicine.name, medicine.strengthsAndForms);
                setSearchTerm(""); // Clear search after selection
              }}
            >
              {medicine.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicineSearch;
