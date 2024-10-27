// src/components/PatientCard.js
import React from "react";
import { FaUser, FaVenusMars, FaCheck, FaTimes } from "react-icons/fa";

function PatientCard({ patient, onReject }) {
  const handleApprove = () => {
    console.log("Approved patient data:", patient); // Log entire patient data
  };

  const handleReject = () => {
    // Confirmation before removal
    if (
      window.confirm(
        `Are you sure you want to remove ${patient.Email} from the queue?`
      )
    ) {
      onReject(patient.email); // Use patient email instead of id
    }
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg px-3 m-2 border-l-4 border-blue-400 flex flex-col justify-between"
      style={{
        width: "200px",
        height: "80px",
      }}
    >
      <div className="flex justify-between items-center">
        {/* Patient Details */}
        <div className="w-full">
          
          <div className="text-xs text-gray-600 mt-1 flex flex-row justify-between">
            <span className="flex items-center">
              <FaUser className="mr-1" /> {patient.Queue_No}
            </span>
            {/* <span className="flex items-center">
              <FaVenusMars className="mr-1" /> {patient.gender}
            </span> */}
            <button
            onClick={handleReject}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
          >
            <FaTimes size={12} />
          </button>
          </div>
          <h5 className="font-semibold text-blue-500 text-sm truncate mt-2">
            {patient.Email?.slice(0, 20)}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default PatientCard;
