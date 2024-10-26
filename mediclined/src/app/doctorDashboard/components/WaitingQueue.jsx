// src/components/WaitingQueue.js
import React from "react";
import PatientCard from "./PatientCard";

function WaitingQueue({ patientQueue }) {
  return (
    <div className="p-2 mt-2 overflow-auto rounded-lg bg-white shadow-xl">
      <h4 className="font-bold mb-2">Waiting Queue</h4>
      <div className="flex overflow-x-auto">
        {patientQueue.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  );
}

export default WaitingQueue;