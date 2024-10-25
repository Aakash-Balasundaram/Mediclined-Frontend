"use client";
import React, { useState } from "react";

function App() {
  const [diagnosis, setDiagnosis] = useState("");
  const [test, setTest] = useState("");
  const [medicine, setMedicine] = useState("");

  const [timing, setTiming] = useState({
    MN: "",
    AF: "",
    NT: "",
  });

  // Placeholder function for future use
  const handleCheckout = () => {
    // Implement checkout logic
  };

  const handleTimingChange = (timeOfDay, value) => {
    setTiming((prev) => ({
      ...prev,
      [timeOfDay]: value,
    }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-12 gap-4">
        {/* Left Panel (Diagnosis and Tests) */}
        <div className="col-span-3 bg-white shadow-md p-4 rounded-lg">
          <h4 className="font-bold mb-4">Diagnosis</h4>
          <input
            type="text"
            placeholder="Diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-4"
          />
          <h4 className="font-bold mb-4">Tests</h4>
          <input
            type="text"
            placeholder="Blood Test"
            value={test}
            onChange={(e) => setTest(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-2"
          />
          <button className="bg-gray-200 p-2 w-full rounded mt-2 hover:bg-gray-300">
            + Add Test
          </button>
        </div>

        {/* Center Panel (Prescription) */}
        <div className="col-span-6 bg-green-50 shadow-md p-4 rounded-lg">
          <h4 className="font-bold mb-4">PRESCRIPTION</h4>
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-full border border-gray-300 p-2 rounded mb-4"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
          />
          <div className="flex justify-between items-center mb-4">
            <div className="flex-grow">
              <p className="text-sm">Paracetamol 500mg</p>
            </div>
            <div className="space-x-2 flex">
              {["MN", "AF", "NT"].map((timeOfDay) => (
                <div key={timeOfDay} className="flex items-center space-x-1">
                  <button
                    className={`text-xs px-2 py-1 rounded ${
                      timing[timeOfDay] === "B"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    } hover:bg-blue-400`}
                    onClick={() => handleTimingChange(timeOfDay, "B")}
                  >
                    {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)} (B)
                  </button>
                  <button
                    className={`text-xs px-2 py-1 rounded ${
                      timing[timeOfDay] === "A"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    } hover:bg-blue-400`}
                    onClick={() => handleTimingChange(timeOfDay, "A")}
                  >
                    {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)} (A)
                  </button>
                </div>
              ))}
              <button className="text-red-500 font-bold text-xs">x</button>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 text-sm"
          >
            Checkout
          </button>
        </div>

        {/* Right Panel (Patient Info) */}
        <div className="col-span-3 bg-white shadow-md p-4 rounded-lg">
          <h4 className="font-bold mb-4">PATIENT INFORMATION</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-100 p-4 rounded text-center">
              <p>Blood Pressure</p>
              <p className="font-bold">120/80</p>
            </div>
            <div className="bg-blue-100 p-4 rounded text-center">
              <p>Temperature</p>
              <p className="font-bold">98.6°F</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded text-center">
              <p>Heart Rate</p>
              <p className="font-bold">72 bpm</p>
            </div>
            <div className="bg-green-100 p-4 rounded text-center">
              <p>Pulse</p>
              <p className="font-bold">80</p>
            </div>
          </div>
          <button className="mt-4 w-full bg-gray-200 p-2 rounded hover:bg-gray-300">
            View Past Medical History
          </button>
        </div>

        {/* Student Queue */}
        <div className="col-span-12 bg-white shadow-md p-4 rounded-lg mt-6">
          <h4 className="font-bold mb-4">Student Queue</h4>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-2">
                1
              </div>
              <div>
                <p>John Doe</p>
                <p className="text-sm text-gray-500">Waiting</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-2">
                2
              </div>
              <div>
                <p>Jane Smith</p>
                <p className="text-sm text-gray-500">Waiting</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-2">
                3
              </div>
              <div>
                <p>Alex Johnson</p>
                <p className="text-sm text-gray-500">Waiting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
