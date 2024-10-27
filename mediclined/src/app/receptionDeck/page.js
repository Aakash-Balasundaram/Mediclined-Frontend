"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { StudentDetailsForm } from "./components/StudentDetailsForm";
import { VitalsSection } from "./components/VitalsSection";
import { MedicalLeaveSection } from "./components/MedicalLeaveSection";
import { AlertSection } from "./components/AlertSection";
import WaitingQueue from "./components/WaitingQueue";
import { v4 as uuidv4 } from "uuid";
import { STUDENT_URL, CLINIC_URL, PHARMACY_URL } from "../constants";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import { Switch } from "@mui/material";

const ClinicDashboard = () => {
  const router = useRouter();
  // Student/Patient Form State
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    age: "",
    gender: "",
    hostel: "",
    roomNo: "",
    email: "",
    bloodPressure: "",
    temperature: "",
    knownAllergies: "No",
  });
  const [switchValue, setSwitchValue] = useState(false);

  // Medical Leave State
  const [leaveData, setLeaveData] = useState({
    rollNo: "",
    startDate: "",
    endDate: "",
    selectedPrescription: "",
  });

  const [clinicID, setClinicID] = useState(""); // Example clinicID
  const [token, setToken] = useState("");
  const [patientQueue, setPatientQueue] = useState([]);

  const [error, setError] = useState({
    studentDetails: "",
    leaveDetails: "",
    queue: "",
  });

  useEffect(() => {
    const role = secureLocalStorage.getItem("role");
    if (role != "C") {
      router.push("/403");
    }
    const storedClinicID = secureLocalStorage.getItem("userId");
    const storedToken = secureLocalStorage.getItem("token");
    console.log("Stored Clinic ID:", storedClinicID); // Check what is being retrieved
    console.log("Stored Token: ", storedToken);
    if (storedClinicID) {
      setClinicID(storedClinicID);
    } else {
      console.log("No Clinic ID found in local storage");
    }
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.log("No token found in local storage");
    }
  }, []);

  // Call fetchQueue whenever clinicID changes
  useEffect(() => {
    if (clinicID) {
      console.log("fetchQueue executing with clinicID:", clinicID);
      fetchQueue(clinicID);
    }
  }, [clinicID]);

  const fetchQueue = async (clinicID) => {
    if (!clinicID) {
      setError((prev) => ({
        ...prev,
        queue: "Clinic ID is required to fetch the queue",
      }));
      return; // Exit early if no clinic ID is found
    }

    try {
      const response = await axios.get(PHARMACY_URL + "/queue", {
        params: { clinicID: clinicID },
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check if response contains data and set patientQueue as an array
      const data = response.data.MSG[0]; // Assuming MSG returns an array
      if (data) {
        setPatientQueue(Array.isArray(data) ? data : [data]); // Ensure it's always an array
      } else {
        setPatientQueue([]); // Default to empty if no data
      }

      console.log("Response:", response.data);
    } catch (error) {
      setPatientQueue([]); // Reset to empty on error
      if (error.response && error.response.status === 400) {
        setError((prev) => ({
          ...prev,
          queue: error.response.data.ERR,
        }));
      } else {
        setError((prev) => ({
          ...prev,
          queue: "Internal Server Error",
        }));
      }
    }
  };

  const handleFetchStudentDetails = async () => {
    if (switchValue == false) {
      if (!formData.rollNo.trim()) {
        setError((prev) => ({
          ...prev,
          studentDetails: "Please enter a roll number",
        }));
        return;
      }

      try {
        console.log("Fetching student details..."); // Confirm the function is triggered

        const response = await axios.get(STUDENT_URL + "/rollno", {
          params: { rollNo: formData.rollNo },
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Response MSG data:", response.data.MSG[0]); // Log the response

        if (response.status === 200) {
          const { Email, Name, Age, Gender, Roll_number } = response.data.MSG[0];

          // Map response fields to formData fields
          setFormData((prev) => ({
            ...prev,
            email: Email, // Backend "Email" -> form "email"
            name: Name, // Backend "Name" -> form "name"
            age: Age, // Backend "Age" -> form "age"
            gender: Gender===1?"male":"female", // Backend "Gender" -> form "gender"
            rollNo: Roll_number
          }));
        } else {
          setError((prev) => ({
            ...prev,
            studentDetails:
              response.data.ERR || "Failed to fetch student details",
          }));
        }
      } catch (error) {
        console.error("API Error:", error); // Log error details
        setError((prev) => ({
          ...prev,
          studentDetails: "Failed to fetch student details",
        }));
      }
    } else {
      if (!formData.email.trim()) {
        setError((prev) => ({
          ...prev,
          studentDetails: "Please enter a email",
        }));
        return;
      }

      try {
        const response = await axios.get(STUDENT_URL, {
          params: { email: formData.email },
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Response MSG data:", response.data.MSG[0]); // Log the response

        if (response.status === 200) {
          const { Email, Name, Age, Gender, Roll_number } =
            response.data.MSG[0];

          // Map response fields to formData fields
          setFormData((prev) => ({
            ...prev,
            email: Email, // Backend "Email" -> form "email"
            name: Name, // Backend "Name" -> form "name"
            age: Age, // Backend "Age" -> form "age"
            gender: Gender, // Backend "Gender" -> form "gender"
            rollNo: Roll_number,
          }));
          if(Name==null || Roll_number == null) {
            window.alert("Data fetched, but empty, try updating")
          }
        } else {
          setError((prev) => ({
            ...prev,
            studentDetails:
              response.data.ERR || "Failed to fetch student details",
          }));
        }
      } catch (error) {
        console.error("API Error:", error); // Log error details
        setError((prev) => ({
          ...prev,
          studentDetails: "Failed to fetch student details",
        }));
      }
    }
  };

  const handleReject = async (email) => {
    try {
      await axios.delete(PHARMACY_URL + "/queue", {
        params: { clinicID: clinicID, email: email }, // Pass both clinicID and student email
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatientQueue((prev) =>
        prev.filter((patient) => patient.email !== email)
      );
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError((prev) => ({
          ...prev,
          queue: error.response.data.ERR,
        }));
      } else {
        setError((prev) => ({
          ...prev,
          queue: "Failed to remove student from queue",
        }));
      }
    }
  };

  const handleCheckIn = async () => {
    // Ensure clinicID and email are set in formData
    if (!clinicID || !formData.email) {
      setError((prev) => ({
        ...prev,
        studentDetails: "Clinic ID and Email are required",
      }));
      return;
    }

    const queueNo = patientQueue.length + 1;

    try {
      const response = await axios.post(
        PHARMACY_URL + "/queue",
        {
          clinicID: clinicID,
          email: formData.email,
          queueNo: queueNo,
        },
        { headers: { Authorization: `Bearer ${token}` } } // Clinic authorization
      );
      setPatientQueue((prev) => [...prev, response.data.MSG[0]]); // Assuming response contains new student details

      // Reset form after successful addition
      setFormData({
        rollNo: "",
        name: "",
        age: "",
        gender: "",
        hostel: "",
        roomNo: "",
        email: "",
        bloodPressure: "",
        temperature: "",
        knownAllergies: "No",
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError((prev) => ({
          ...prev,
          studentDetails: error.response.data.ERR,
        }));
      } else {
        setError((prev) => ({
          ...prev,
          studentDetails: "Failed to add student to queue",
        }));
      }
    }
  };

  // Mock Data
  const mockPrescriptions = [
    { id: 1, date: "2024-10-20", diagnosis: "Common Cold" },
    { id: 2, date: "2024-10-15", diagnosis: "Fever" },
    { id: 3, date: "2024-10-10", diagnosis: "Allergic Reaction" },
  ];

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

  const handleStudentDetailsUpdate = async () => {
    const res = await axios.put(
      STUDENT_URL,
      {
        email: formData.email,
        name: formData.name,
        age: formData.age,
        gender: formData.gender=="male"?0:1,
        bloodGroup: "",
        rollNo: formData.rollNo
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    try {
      if (res.status == 200) {
        console.log("Updation successful!");
        handleFetchStudentDetails();
      }
    } catch (err) {
      console.log(err);
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
                  <div className="flex flex-row gap-10">
                    <h2 className="font-semibold text-gray-800 mb-4">
                      Patient/Student Details
                    </h2>
                    <div>
                      Roll number
                      <Switch
                        value={switchValue}
                        onChange={(e) => setSwitchValue(e.target.checked)}
                      />
                      Email
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <StudentDetailsForm
                      formData={formData}
                      error={error.studentDetails}
                      onInputChange={handleStudentFormChange}
                      onFetchDetails={handleFetchStudentDetails}
                      switchValue={switchValue}
                    />

                    <VitalsSection
                      formData={formData}
                      onChange={handleStudentFormChange}
                      onCheckIn={handleCheckIn}
                      onUpdate={handleStudentDetailsUpdate}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Waiting Queue */}
            <div className="mt-2">
              <WaitingQueue
                patientQueue={patientQueue}
                onReject={(email) => handleReject(email)}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-1/2">
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
