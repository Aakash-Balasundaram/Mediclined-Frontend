import React, { useState } from "react";

const dummyMedicines = [
  { id: 1, name: "Aspirin" },
  { id: 2, name: "Ibuprofen" },
  { id: 3, name: "Paracetamol" },
  { id: 4, name: "Amoxicillin" },
  { id: 5, name: "Metformin" },
  // Add more dummy medicines as needed
];

const MedicineSearch = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term) {
      const filtered = dummyMedicines.filter((med) =>
        med.name.toLowerCase().includes(term)
      );
      setFilteredMedicines(filtered);
    } else {
      setFilteredMedicines([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search medicines..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full border border-gray-300 p-2 rounded mb-2"
      />
      {filteredMedicines.length > 0 && (
        <ul className="bg-white border border-gray-300 rounded mt-2 max-h-40 overflow-y-auto">
          {filteredMedicines.map((medicine) => (
            <li
              key={medicine.id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                onSelect(medicine);
                setSearchTerm("");
                setFilteredMedicines([]);
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
