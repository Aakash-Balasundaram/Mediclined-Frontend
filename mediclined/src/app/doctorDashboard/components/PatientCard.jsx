// src/components/PatientCard.js
import React from "react";
import { FaUser, FaVenusMars, FaCheck, FaTimes } from "react-icons/fa";

function PatientCard({ patient, onReject }) {
  const handleApprove = () => {
    console.log("Approve button clicked!");
  };

  const handleReject = () => {
    // Confirmation before removal
    if (
      window.confirm(
        `Are you sure you want to remove ${patient.name} from the queue?`
      )
    ) {
      onReject(patient.id); // Call the onReject function with the patient's ID
    }
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg p-3 m-2 border-l-4 border-blue-400 flex flex-col justify-between"
      style={{
        width: "200px",
        height: "80px",
      }}
    >
      <div className="flex justify-between items-center">
        {/* Patient Details */}
        <div>
          <h5 className="font-semibold text-blue-500 text-sm truncate">
            {patient.name}
          </h5>
          <div className="text-xs text-gray-600 mt-1">
            <span className="flex items-center">
              <FaUser className="mr-1" /> {patient.age}
            </span>
            <span className="flex items-center">
              <FaVenusMars className="mr-1" /> {patient.gender}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center space-y-1">
          <button
            onClick={handleApprove}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
          >
            <FaCheck size={12} />
          </button>
          <button
            onClick={handleReject}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
          >
            <FaTimes size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientCard;
