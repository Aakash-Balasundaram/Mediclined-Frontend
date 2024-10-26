"use client";
import React, { useState } from "react";
import MedicineSearch from "./components/MedicineSearch";
import PrescriptionItem from "./components/PrescriptionItem";
import Tests from "./components/TestComponent";
import PatientData from "./components/PatientData";

function App() {
  const [diagnosis, setDiagnosis] = useState("");
  const [tests, setTests] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const dummyMedicines = [
    { id: 1, name: "Aspirin" },
    { id: 2, name: "Ibuprofen" },
    { id: 3, name: "Paracetamol" },
    { id: 4, name: "Amoxicillin" },
    { id: 5, name: "Metformin" },
    { id: 6, name: "Lisinopril" },
    { id: 7, name: "Simvastatin" },
    { id: 8, name: "Atorvastatin" },
    { id: 9, name: "Gabapentin" },
    { id: 10, name: "Omeprazole" },
    { id: 11, name: "Sertraline" },
    { id: 12, name: "Losartan" },
    { id: 13, name: "Montelukast" },
    { id: 14, name: "Levothyroxine" },
    { id: 15, name: "Citalopram" },
    { id: 16, name: "Albuterol" },
    { id: 17, name: "Hydrochlorothiazide" },
    { id: 18, name: "Metoprolol" },
    { id: 19, name: "Tamsulosin" },
    { id: 20, name: "Clopidogrel" },
  ];

  const availableTests = [
    "Blood Test",
    "Urine Test",
    "X-Ray",
    "MRI",
    "CT Scan",
    "Blood Sugar Test",
    "Cholesterol Test",
  ];

  const patientData = {
    details: {
      name: "Jeevika",
      age: 20,
      gender: "Male",
    },
    info: [
      { title: "Blood Pressure", value: "120/80 mmHg", color: "#FFDDC1" },
      { title: "Temperature", value: "98.6 °F", color: "#CFE2F3" },
      { title: "Heart Rate", value: "75 bpm", color: "#D9EAD3" },
      { title: "Oxygen Saturation", value: "98%", color: "#F9CB9C" },
    ],
    tests: [
      {
        testName: "Blood Test",
        result: "Normal",
      },
      {
        testName: "X-Ray",
        result: "Clear",
      },
      {
        testName: "MRI",
        result: "No abnormalities detected",
      },
    ],
    history: [
      "Hypertension diagnosed in 2018",
      "Allergic to Penicillin",
      "Previous surgeries: Appendectomy in 2015",
    ],
  };

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

  const handleMedicineSelect = (medicine) => {
    const existingMedicine = medicines.find((m) => m.id === medicine.id);
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
          <Tests
            availableTests={availableTests}
            onAddTest={(test) => setTests((prev) => [...prev, test])}
          />
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
          <MedicineSearch
            medicines={dummyMedicines}
            onSelect={handleMedicineSelect}
          />
          <ul className="mt-4 overflow-auto">
            {medicines.map((m, index) => (
              <PrescriptionItem
                key={m.id}
                medicine={m}
                onDelete={() =>
                  setMedicines((prev) => prev.filter((_, i) => i !== index))
                }
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
          <PatientData
            patientDetails={patientData.details}
            patientInfo={patientData.info}
            previousTests={patientData.tests}
            medicalHistory={patientData.history}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
