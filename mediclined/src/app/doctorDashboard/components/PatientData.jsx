import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PatientData = () => {
  // Key health metrics with example values
  const patientInfo = [
    { title: "Blood Pressure", value: "120/80 mmHg", color: "#FFDDC1" },
    { title: "Temperature", value: "98.6 °F", color: "#CFE2F3" },
    { title: "Heart Rate", value: "75 bpm", color: "#D9EAD3" },
    { title: "Oxygen Saturation", value: "98%", color: "#F9CB9C" },
  ];

  // Example previous test results
  const previousTests = [
    {
      testName: "Blood Test",
      result: "Normal",
    },
    {
      testName: "X-Ray",
      result: "Clear",
    },
    {
      testName: "MRI",
      result: "No abnormalities detected",
    },
  ];

  // Example patient details
  const patientDetails = {
    name: "John Doe",
    age: 30,
    gender: "Male",
  };

  // Example medical history
  const medicalHistory = [
    "Hypertension diagnosed in 2018",
    "Allergic to Penicillin",
    "Previous surgeries: Appendectomy in 2015",
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Patient Information Section */}
      <div className="mb-4 bg-white shadow-md p-4 rounded-lg">
        <p>
          <strong>Name:</strong> {patientDetails.name}
        </p>
        <p>
          <strong>Age:</strong> {patientDetails.age}
        </p>
        <p>
          <strong>Gender:</strong> {patientDetails.gender}
        </p>
      </div>

      {/* Health Metrics Section */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {patientInfo.map((info, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-dotted"
            style={{ backgroundColor: info.color }}
          >
            <h4 className="font-bold">{info.title}</h4>
            <p>{info.value}</p>
          </div>
        ))}
      </div>

      {/* Accordions for Previous Tests and Other Information */}
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-tests-content"
            id="panel-tests-header"
          >
            <Typography>Previous Tests</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {previousTests.map((test, index) => (
                <Typography key={index}>
                  {test.testName}: {test.result}
                </Typography>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-medical-history-content"
            id="panel-medical-history-header"
          >
            <Typography>Medical History</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {medicalHistory.map((item, index) => (
                <Typography key={index}>• {item}</Typography>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default PatientData;
