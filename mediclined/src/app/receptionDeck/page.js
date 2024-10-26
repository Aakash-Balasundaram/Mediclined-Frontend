"use client";
import React, { useState } from "react";

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
    height: "",
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
      height: "5'10",
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-xl font-bold text-gray-800">Clinic Dashboard</h1>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Dashboard Options */}
          <div className="w-1/4 max-w-xs">
            <div className="bg-white rounded-lg shadow-sm p-4 h-[calc(100vh-8rem)]">
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
            <div className="bg-white rounded-lg shadow-sm p-4 h-[calc(100vh-8rem)]">
              <h2 className="font-semibold text-gray-800 mb-4">
                Patient/Student Details
              </h2>
              <div className="flex gap-4">
                {/* Student Details */}
                <div className="w-1/2 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Roll No
                    </label>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="rollNo"
                          value={formData.rollNo}
                          onChange={handleChange}
                          className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter Roll No"
                        />
                        <button
                          onClick={handleFetchStudentDetails}
                          className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors"
                        >
                          Fetch
                        </button>
                      </div>
                      {error.studentDetails && (
                        <span className="text-red-500 text-sm">
                          {error.studentDetails}
                        </span>
                      )}
                    </div>
                  </div>
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
                </div>

                {/* Vitals Bento Boxes */}
                <div className="w-1/2 flex flex-wrap gap-4">
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
                  <div className="bg-gray-100 rounded-lg shadow-lg h-32 w-32 flex flex-col justify-center items-center p-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Height
                    </label>
                    <input
                      type="text"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="e.g. 5'10"
                      className="text-center border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                    />
                  </div>
                </div>
              </div>
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
