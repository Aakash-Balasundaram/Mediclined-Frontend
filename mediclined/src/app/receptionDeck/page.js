// ClinicDashboard.js
"use client";
import React, { useState } from "react";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { StudentDetailsForm } from "./components/StudentDetailsForm";
import { VitalsSection } from "./components/VitalsSection";
import { MedicalLeaveSection } from "./components/MedicalLeaveSection";
import { AlertSection } from "./components/AlertSection";
import WaitingQueue from "./components/WaitingQueue";

const ClinicDashboard = () => {
  // Student/Patient Form State
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    age: "",
    gender: "",
    hostel: "",
    roomNo: "",
    contactNumber: "",
    bloodPressure: "",
    temperature: "",
    knownAllergies: "No",
  });

  // Medical Leave State
  const [leaveData, setLeaveData] = useState({
    rollNo: "",
    startDate: "",
    endDate: "",
    selectedPrescription: "",
  });

  // Error State
  const [error, setError] = useState({
    studentDetails: "",
    leaveDetails: "",
  });

  // Mock Data
  const mockPrescriptions = [
    { id: 1, date: "2024-10-20", diagnosis: "Common Cold" },
    { id: 2, date: "2024-10-15", diagnosis: "Fever" },
    { id: 3, date: "2024-10-10", diagnosis: "Allergic Reaction" },
  ];

  // Patient Queue State
  const [patientQueue, setPatientQueue] = useState([
    { id: 1, name: "John Doe", age: 28, gender: "Male" },
    { id: 2, name: "Jane Smith", age: 34, gender: "Female" },
    { id: 3, name: "Mike Johnson", age: 45, gender: "Male" },
  ]);

  // Handler Functions
  const handleStudentFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "rollNo") {
      setError((prev) => ({ ...prev, studentDetails: "" }));
    }
  };

  const handleLeaveFormChange = (e) => {
    const { name, value } = e.target;
    setLeaveData((prev) => ({ ...prev, [name]: value }));
    if (name === "rollNo") {
      setError((prev) => ({ ...prev, leaveDetails: "" }));
    }
  };

  const handleFetchStudentDetails = async () => {
    if (!formData.rollNo.trim()) {
      setError((prev) => ({
        ...prev,
        studentDetails: "Please enter a roll number",
      }));
      return;
    }

    try {
      // Mock API call - replace with actual API call
      const mockStudentData = {
        name: "John Doe",
        age: "20",
        gender: "male",
        contactNumber: "1234567890",
        hostel: "Hostel A",
        roomNo: "101",
        knownAllergies: "No",
      };
      setFormData((prev) => ({
        ...prev,
        ...mockStudentData,
      }));
    } catch (error) {
      setError((prev) => ({
        ...prev,
        studentDetails: "Failed to fetch student details",
      }));
    }
  };

  const handleCheckIn = () => {
    // Validation
    if (!formData.name || !formData.age) {
      setError((prev) => ({
        ...prev,
        studentDetails: "Please fill in required fields",
      }));
      return;
    }

    // Create new patient object with all form data
    const newPatient = {
      id: patientQueue.length + 1,
      ...formData, // Spread the formData to include all fields
    };

    // Add to queue
    setPatientQueue((prev) => [...prev, newPatient]);

    // Reset form
    setFormData({
      rollNo: "",
      name: "",
      age: "",
      gender: "",
      hostel: "",
      roomNo: "",
      contactNumber: "",
      bloodPressure: "",
      temperature: "",
      knownAllergies: "No",
    });
  };

  const handleFetchPrescriptions = async () => {
    if (!leaveData.rollNo.trim()) {
      setError((prev) => ({
        ...prev,
        leaveDetails: "Please enter a roll number",
      }));
      return;
    }

    try {
      // Mock API call - replace with actual API call
      console.log("Fetching prescriptions for:", leaveData.rollNo);
      // In a real app, you would update the mockPrescriptions state here
    } catch (error) {
      setError((prev) => ({
        ...prev,
        leaveDetails: "Failed to fetch prescriptions",
      }));
    }
  };

  const handleGenerateLeave = async () => {
    if (
      !leaveData.rollNo.trim() ||
      !leaveData.startDate ||
      !leaveData.endDate
    ) {
      setError((prev) => ({
        ...prev,
        leaveDetails: "Please fill in all required fields",
      }));
      return;
    }

    try {
      // Mock API call - replace with actual API call
      console.log("Generating medical leave with data:", leaveData);

      // Reset form after successful submission
      setLeaveData({
        rollNo: "",
        startDate: "",
        endDate: "",
        selectedPrescription: "",
      });
    } catch (error) {
      setError((prev) => ({
        ...prev,
        leaveDetails: "Failed to generate leave",
      }));
    }
  };

  const handleReject = (id) => {
    setPatientQueue((prev) => prev.filter((patient) => patient.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-gray-800">Clinic Dashboard</h1>
      </header>

      <div className="p-6">
        <div className="flex gap-6">
          <div className="flex flex-col">
            <div className="flex gap-6">
              <DashboardSidebar />

              {/* Main Content Area */}
              <div className="flex-1">
                <div className="bg-white rounded-lg shadow-sm p-4 h-[calc(100vh-17rem)]">
                  <h2 className="font-semibold text-gray-800 mb-4">
                    Patient/Student Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <StudentDetailsForm
                      formData={formData}
                      error={error.studentDetails}
                      onInputChange={handleStudentFormChange}
                      onFetchDetails={handleFetchStudentDetails}
                    />

                    <VitalsSection
                      formData={formData}
                      onChange={handleStudentFormChange}
                      onCheckIn={handleCheckIn}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Waiting Queue */}
            <div className="mt-2">
              <WaitingQueue
                patientQueue={patientQueue}
                onReject={handleReject}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-1/4 max-w-xs">
            <div className="space-y-6">
              <AlertSection />

              <MedicalLeaveSection
                leaveData={leaveData}
                error={error.leaveDetails}
                mockPrescriptions={mockPrescriptions}
                onInputChange={handleLeaveFormChange}
                onFetchPrescriptions={handleFetchPrescriptions}
                onGenerateLeave={handleGenerateLeave}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicDashboard;
