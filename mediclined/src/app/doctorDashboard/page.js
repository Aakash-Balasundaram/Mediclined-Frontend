"use client";
import React, { useState } from "react";
import MedicineSearch from "./components/MedicineSearch";
import PrescriptionItem from "./components/PrescriptionItem";
import Tests from "./components/TestComponent";
import PatientData from "./components/PatientData"; // Import the PatientData component

function App() {
  const [diagnosis, setDiagnosis] = useState("");
  const [tests, setTests] = useState([]); // Keep this state for test management
  const [medicines, setMedicines] = useState([]);

  const handleCheckout = () => {
    const checkoutData = {
      diagnosis,
      tests,
      medicines: medicines.map((m) => ({
        name: m.name,
        dosage: m.dosage,
        timing: m.timing,
      })),
    };
    console.log(JSON.stringify(checkoutData, null, 2));
    alert("Checkout data logged to console.");
  };

  const deleteMedicine = (index) => {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMedicine = (updatedMedicine) => {
    setMedicines((prev) =>
      prev.map((m, index) =>
        m.name === updatedMedicine.name ? updatedMedicine : m
      )
    );
  };

  const handleMedicineSelect = (medicine) => {
    const existingMedicine = medicines.find((m) => m.name === medicine.name);
    if (!existingMedicine) {
      setMedicines((prev) => [
        ...prev,
        { ...medicine, dosage: "", timing: { MN: "", AF: "", NT: "" } },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="grid grid-cols-12 gap-4 flex-1 overflow-hidden">
        <div className="col-span-3 bg-white shadow-md p-4 rounded-lg overflow-auto">
          <h4 className="font-bold mb-4">Diagnosis</h4>
          <input
            type="text"
            placeholder="Diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-4"
          />
          <h4 className="font-bold mb-4">Tests</h4>
          <Tests onAddTest={(test) => setTests((prev) => [...prev, test])} />
          <ul className="mt-4 overflow-auto">
            {tests.map((t, index) => (
              <li key={index} className="border-b py-1">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-6 bg-green-50 shadow-md p-4 rounded-lg overflow-auto">
          <h4 className="font-bold mb-4">PRESCRIPTION</h4>
          <MedicineSearch onSelect={handleMedicineSelect} />
          <ul className="mt-4 overflow-auto">
            {medicines.map((m, index) => (
              <PrescriptionItem
                key={index}
                medicine={m}
                onDelete={() => deleteMedicine(index)}
                onUpdate={updateMedicine}
              />
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 text-sm mt-4"
          >
            Checkout
          </button>
        </div>

        <div className="col-span-3 bg-white shadow-md p-4 rounded-lg overflow-auto">
          <h4 className="font-bold mb-4">PATIENT INFORMATION</h4>
          <PatientData /> {/* Include the PatientData component */}
        </div>
      </div>
    </div>
  );
}

export default App;
