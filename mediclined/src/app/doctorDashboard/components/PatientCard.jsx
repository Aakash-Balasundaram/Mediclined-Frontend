// src/components/PatientCard.js
import React from "react";

function PatientCard({ patient }) {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-2 m-2"
      style={{ width: "200px", height: "80px" }}
    >
      <h5 className="font-bold">{patient.name}</h5>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>
    </div>
  );
}

export default PatientCard;
