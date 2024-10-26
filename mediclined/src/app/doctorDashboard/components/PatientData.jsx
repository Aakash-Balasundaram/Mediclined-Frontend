import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PatientData = ({
  patientDetails,
  patientInfo,
  previousTests,
  medicalHistory,
}) => {
  return (
    <div className="p-6 bg-gray-100">
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
            <Typography>Past Prescriptions</Typography>
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
