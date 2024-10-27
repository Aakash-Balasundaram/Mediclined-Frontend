"use client";
import React, { useEffect, useState } from "react";
import MedicineSearch from "./components/MedicineSearch";
import PrescriptionItem from "./components/PrescriptionItem";
import Tests from "./components/TestComponent";
import PatientData from "./components/PatientData";
import WaitingQueue from "./components/WaitingQueue";

import {
  MEDICINE_API_URL,
  MONGO_URL,
  PHARMACY_URL,
  STUDENT_URL,
} from "../constants";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";

function App() {
  const router = useRouter();
  const [diagnosis, setDiagnosis] = useState("");
  const [tests, setTests] = useState([]);
  const [medicines, setMedicines] = useState([]);

  // Patient queue state
  const [patientQueue, setPatientQueue] = useState([]);

  const [patientInfo, setPatientInfo] = useState({
    Name: "",
    Email: "",
    Age: "",
    Gender: "",
    Blood_Group: "",
    Roll_number: "",
  });

  useEffect(() => {
    const role = secureLocalStorage.getItem("role");
    if (role != "D") {
      router.push("/403");
    }
    fetchQueue();
  }, []);

  //function to fetch queue
  const fetchQueue = async () => {
    const token = secureLocalStorage.getItem("token");
    const ClinicID = secureLocalStorage.getItem("ClinicID");
    const res = await axios.get(PHARMACY_URL + `/queue?clinicID=${ClinicID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status == 200) {
      console.log(res.data.MSG);
      setPatientQueue(res.data.MSG);
    } else {
      console.log(res.body);
    }
  };

  const handleReject = async (email) => {
    try {
      await axios.delete(PHARMACY_URL + "/queue", {
        params: { clinicID: clinicID, email: email }, // Pass both clinicID and student email
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response.data.ERR);
      } else {
        console.log("Failed to remove student from queue");
      }
    }
    fetchQueue();
  };

  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const resetMedicines = () => {
    setMedicines([]);
  };

  const searchMedicinesFunction = async (text) => {
    console.log(text);
    try {
      const response = await axios.get(
        `${MEDICINE_API_URL}?terms=${text}&ef=STRENGTHS_AND_FORMS`
      );
      const medicinesData = response.data;
      const medicineNames = medicinesData[1];
      const strengthsAndForms = medicinesData[2]?.STRENGTHS_AND_FORMS || [];

      const formattedMedicines = medicineNames.map((name, index) => ({
        name,
        strengthsAndForms: strengthsAndForms[index] || [],
      }));

      setMedicines(formattedMedicines);
      console.log(formattedMedicines);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

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
      gender: "Female",
    },
    info: [
      { title: "Blood Pressure", value: "120/80 mmHg", color: "#FFDDC1" },
      { title: "Temperature", value: "98.6 °F", color: "#CFE2F3" },
      { title: "Heart Rate", value: "75 bpm", color: "#D9EAD3" },
      { title: "Oxygen Saturation", value: "98%", color: "#F9CB9C" },
    ],
    tests: [
      { testName: "Blood Test", result: "Normal" },
      { testName: "X-Ray", result: "Clear" },
      { testName: "MRI", result: "No abnormalities detected" },
    ],
    history: [
      "Hypertension diagnosed in 2018",
      "Allergic to Penicillin",
      "Previous surgeries: Appendectomy in 2015",
    ],
  };

  const handleCheckout = async () => {
    const checkoutData = {
      studentEmail: patientInfo.Email,
      rollNumber: patientInfo.Roll_number,
      diagnosis,
      tests,
      medicines: selectedMedicines.map((m) => ({
        name: m.name,
        dosage: m.dosage,
        timing: m.timing,
        strengthAndForm: m.selectedStrength,
      })),
    };
    console.log(JSON.stringify(checkoutData, null, 2));
  
    try {
      const response = await axios.post(MONGO_URL + "/prescription", checkoutData);
      
      if (response.status === 201) {
        alert("Prescription saved successfully!");
        
        // Clear form fields
        setDiagnosis("");
        setTests([]);
        setSelectedMedicines([]);
        
        // Clear patient information
        setPatientInfo({
          Name: "",
          Email: "",
          Age: "",
          Gender: "",
          Blood_Group: "",
          Roll_number: "",
        });
        
        // Refresh the queue
        fetchQueue();
        
        // Remove the processed patient from the queue
        handleReject(patientInfo.Email);
      } else {
        alert("Error saving prescription");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred while processing the prescription");
    }
  };
  

  const handleMedicineSelect = (medicineName, strengthAndForm) => {
    const medicineObject = {
      name: medicineName,
      dosage: "",
      timing: {},
      strengthAndForm,
      selectedStrength: strengthAndForm[0], // Set the first option as default
    };
    
    const existingMedicine = selectedMedicines.find(
      (m) => m.name === medicineName && m.selectedStrength === strengthAndForm[0]
    );
    
    if (!existingMedicine) {
      setSelectedMedicines((prev) => [...prev, medicineObject]);
    }
  };
  

  useEffect(() => {
    console.log(selectedMedicines);
  }, [selectedMedicines]);

  const handleUpdate = (id, field, value) => {
    setSelectedMedicines((prevMedicines) =>
      prevMedicines.map((medicine) =>
        medicine.id === id ? { ...medicine, [field]: value } : medicine
      )
    );
  };

  const handleStudentApprove = async (email) => {
    const token = secureLocalStorage.getItem("token");
    const res = await axios.get(STUDENT_URL + `?email=${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status == 200) {
      console.log(res.data.MSG);
      setPatientInfo(res.data.MSG[0]);
      handleReject(email);
    } else {
      console.log(res.body);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header Section */}
      <header className="flex items-center p-4 bg-white shadow-md">
        <img
          src="/mediclined_logo-modified.png"
          alt="Logo"
          className="h-8 w-auto mr-2"
        />
        <h1 className="text-xl font-bold">MEDICLINED</h1>
      </header>

      <div className="flex flex-grow overflow-auto">
        {/* Diagnosis and Prescription Container */}
        <div className="flex flex-col flex-1 p-4 space-y-4">
          <div className="flex flex-grow space-x-4">
            {/* Diagnosis Section */}
            <div className="bg-white shadow-md p-4 rounded-lg w-1/4 flex flex-col">
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
            </div>

            {/* Prescription Section */}
            <div className="col-span-6 bg-green-50 shadow-md p-4 rounded-lg overflow-auto w-3/4 mx-4 flex flex-col">
              <h4 className="font-bold mb-4">PRESCRIPTION</h4>
              <MedicineSearch
                medicines={medicines}
                onSelect={handleMedicineSelect}
                callAPI={searchMedicinesFunction}
                resetMedicines={resetMedicines}
              />
              <ul className="mt-4 overflow-auto flex-grow">
                {selectedMedicines.map((medicine) => (
                  <PrescriptionItem
                    key={medicine.id}
                    medicineObject={medicine}
                    onUpdate={handleUpdate}
                    onDelete={() =>
                      setSelectedMedicines((prev) =>
                        prev.filter((m) => m.id !== medicine.id)
                      )
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
          </div>
          {/* Waiting Queue Section */}
          <WaitingQueue
            patientQueue={patientQueue}
            onReject={handleReject}
            handleApprove={handleStudentApprove}
          />
        </div>

        {/* Patient Information */}
        <div className="bg-white shadow-md p-4 rounded-lg w-1/4 h-full mt-4 mr-4 mb-4 overflow-y-auto max-h-[calc(100vh-98px)] flex-shrink-0">
          <h4 className="font-bold mb-4">PATIENT INFORMATION</h4>
          <PatientData
            patientDetails={patientInfo}
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
