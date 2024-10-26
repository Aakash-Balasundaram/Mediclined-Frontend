"use client";
import React, { useState } from "react";
import WaitingQueue from "./components/WaitingQueue";

const ClinicDashboard = () => {
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    age: "",
    hostel: "",
    roomNo: "",
    contactNumber: "",
    bloodPressure: "",
    temperature: "",
    knownAllergies: "No",
  });

  const [leaveData, setLeaveData] = useState({
    rollNo: "",
    startDate: "",
    endDate: "",
    selectedPrescription: "",
  });

  const [error, setError] = useState({
    studentDetails: "",
    leaveDetails: "",
  });

  // Mock prescription data (in real app, this would come from backend)
  const mockPrescriptions = [
    { id: 1, date: "2024-10-20", diagnosis: "Common Cold" },
    { id: 2, date: "2024-10-15", diagnosis: "Fever" },
    { id: 3, date: "2024-10-10", diagnosis: "Allergic Reaction" },
  ];

  // Patient queue state
  const [patientQueue, setPatientQueue] = useState([
    { id: 1, name: "John Doe", age: 28, gender: "Male" },
    { id: 2, name: "Jane Smith", age: 34, gender: "Female" },
    { id: 3, name: "Mike Johnson", age: 45, gender: "Male" },
  ]);

  // Function to handle patient rejection
  const handleReject = (id) => {
    setPatientQueue((prevQueue) =>
      prevQueue.filter((patient) => patient.id !== id)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "rollNo") {
      setError((prev) => ({ ...prev, studentDetails: "" }));
    }
  };

  const handleLeaveChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
    if (name === "rollNo") {
      setError((prev) => ({ ...prev, leaveDetails: "" }));
    }
  };

  const handleCheckIn = () => {
    console.log("Check-in Data:", JSON.stringify(formData, null, 2));

    // Create a new patient object from formData
    const newPatient = {
      id: patientQueue.length + 1, // Unique ID based on queue length
      name: formData.name,
      age: formData.age,
      gender: formData.gender || "Not Specified",
    };

    // Add new patient to queue
    setPatientQueue((prevQueue) => [...prevQueue, newPatient]);

    // Clear the form data after check-in
    setFormData({
      rollNo: "",
      name: "",
      age: "",
      hostel: "",
      roomNo: "",
      contactNumber: "",
      bloodPressure: "",
      temperature: "",
      knownAllergies: "No",
    });
  };

  const handleFetchPrescriptions = () => {
    if (!leaveData.rollNo.trim()) {
      setError((prev) => ({
        ...prev,
        leaveDetails: "Please enter a roll number",
      }));
      return;
    }
    console.log("Fetching prescriptions for roll number:", leaveData.rollNo);
  };

  const handleFetchStudentDetails = () => {
    if (!formData.rollNo.trim()) {
      setError((prev) => ({
        ...prev,
        studentDetails: "Please enter a roll number",
      }));
      return;
    }

    console.log("Fetching student details for roll number:", formData.rollNo);

    const mockStudentData = {
      name: "John Doe",
      age: "20",
      contactNumber: "1234567890",
      knownAllergies: "No",
    };

    setFormData((prev) => ({
      ...prev,
      ...mockStudentData,
    }));
  };

  const handleGenerateLeave = () => {
    if (!leaveData.rollNo.trim()) {
      setError((prev) => ({
        ...prev,
        leaveDetails: "Please enter a roll number",
      }));
      return;
    }
    console.log("Generating medical leave with data:", leaveData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-gray-800">Clinic Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="flex gap-6">
          <div className="flex flex-col">
            <div className="flex gap-6">
              {/* Left Sidebar - Dashboard Options */}
              <div className="w-1/4 max-w-xs">
                <div className="bg-white rounded-lg shadow-sm p-4 h-[calc(100vh-17rem)]">
                  <h2 className="font-semibold text-gray-800 mb-4">
                    Dashboard Options
                  </h2>
                  <div className="space-y-2">
                    {["Overview", "Appointments", "Patients", "Reports"].map(
                      (option) => (
                        <button
                          key={option}
                          className="w-full text-left p-3 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
              {/* Middle Section - Patient and Student Details */}
              <div className="flex-1">
                <div className="bg-white rounded-lg shadow-sm p-4 h-[calc(100vh-17rem)]">
                  <h2 className="font-semibold text-gray-800 mb-4">
                    Patient/Student Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Student Details */}
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Roll No
                          </label>
                          <input
                            type="text"
                            name="rollNo"
                            value={formData.rollNo}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Roll No"
                          />
                        </div>
                        <button
                          onClick={handleFetchStudentDetails}
                          className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors self-end"
                        >
                          Fetch
                        </button>
                      </div>
                      {error.studentDetails && (
                        <span className="text-red-500 text-sm">
                          {error.studentDetails}
                        </span>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Age
                          </label>
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Gender
                          </label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="" disabled>
                              Select Gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Hostel
                          </label>
                          <select
                            name="hostel"
                            value={formData.hostel}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Hostel</option>
                            <option value="Hostel A">Hostel A</option>
                            <option value="Hostel B">Hostel B</option>
                            <option value="Hostel C">Hostel C</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Room No
                          </label>
                          <input
                            type="text"
                            name="roomNo"
                            value={formData.roomNo}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Vitals Bento Boxes and Check-In Button */}
                    <div className="flex flex-wrap gap-4 justify-center items-center">
                      <div className="bg-red-100 rounded-lg shadow-lg h-32 w-32 flex flex-col justify-center items-center p-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Blood Pressure
                        </label>
                        <input
                          type="text"
                          name="bloodPressure"
                          value={formData.bloodPressure}
                          onChange={handleChange}
                          placeholder="e.g. 120/80"
                          className="text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                        />
                      </div>
                      <div className="bg-blue-100 rounded-lg shadow-lg h-32 w-32 flex flex-col justify-center items-center p-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Temperature
                        </label>
                        <input
                          type="text"
                          name="temperature"
                          value={formData.temperature}
                          onChange={handleChange}
                          placeholder="e.g. 98.6"
                          className="text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                        />
                      </div>
                      <div className="bg-green-100 rounded-lg shadow-lg h-32 w-32 flex flex-col justify-center items-center p-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Known Allergies
                        </label>
                        <select
                          name="knownAllergies"
                          value={formData.knownAllergies}
                          onChange={handleChange}
                          className="text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                      <button
                        onClick={handleCheckIn}
                        className="bg-blue-500 text-white rounded-lg shadow-lg h-32 w-32 flex items-center justify-center text-lg font-semibold hover:bg-blue-600 transition-colors"
                      >
                        Check-In
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <WaitingQueue
                patientQueue={patientQueue}
                onReject={handleReject}
              />
            </div>
          </div>

          {/* Right Sidebar - Alerts Section and Medical Leave */}
          <div className="w-1/4 max-w-xs">
            <div className="space-y-6">
              {/* Alerts Section */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Alert area with data from org/h2
                </h3>
                <div className="text-sm text-gray-700">
                  Side panel to update the log patient and approve for medical
                  leave
                </div>
              </div>

              {/* Medical Leave Section */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-600 mb-4">
                  Generate Medical Leave
                </h3>
                <div className="space-y-4">
                  {/* Roll Number Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Roll Number
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="rollNo"
                        value={leaveData.rollNo}
                        onChange={handleLeaveChange}
                        className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Roll No"
                      />
                      <button
                        onClick={handleFetchPrescriptions}
                        className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        Fetch
                      </button>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={leaveData.startDate}
                      onChange={handleLeaveChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={leaveData.endDate}
                      onChange={handleLeaveChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Prescription History Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Select Previous Prescription
                    </label>
                    <select
                      name="selectedPrescription"
                      value={leaveData.selectedPrescription}
                      onChange={handleLeaveChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a prescription</option>
                      {mockPrescriptions.map((prescription) => (
                        <option key={prescription.id} value={prescription.id}>
                          {prescription.date} - {prescription.diagnosis}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Generate Leave Button */}
                  <button
                    onClick={handleGenerateLeave}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Generate Leave
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicDashboard;
