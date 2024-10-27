"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import jsPDF from "jspdf";

export const MedicalLeaveSection = ({
  leaveData,
  error,
  onInputChange,
  setLeaveData,
}) => {
  const [selectedPrescription, setSelectedPrescription] = useState("");
  const [prescriptions] = useState([
    // Dummy data for prescriptions
    { id: 1, date: "2024-10-01", diagnosis: "Flu", treatment: "Rest and hydration" },
    { id: 2, date: "2024-10-10", diagnosis: "Sprained Ankle", treatment: "Ice, rest, and elevation" },
    { id: 3, date: "2024-10-15", diagnosis: "Migraine", treatment: "Pain relief and dark room" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const generateReport = async () => {
    if (!selectedPrescription) {
      alert("Please select a prescription first.");
      return;
    }

    setIsLoading(true);
    try {
      const pdf = generatePDF(selectedPrescription);
      pdf.save(`prescription_${selectedPrescription.id}.pdf`);
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexDirection: "column",
          maxWidth: "400px",
        }}
      >
        <TextField
          label="Roll Number"
          variant="outlined"
          name="rollNo"
          value={leaveData.rollNo}
          onChange={onInputChange}
          fullWidth
        />
        <TextField
          label="Start Date"
          variant="outlined"
          type="date"
          name="startDate"
          value={leaveData.startDate}
          onChange={onInputChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="End Date"
          variant="outlined"
          type="date"
          name="endDate"
          value={leaveData.endDate}
          onChange={onInputChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          disabled={isLoading || !leaveData.rollNo}
          onClick={() => {
            setIsLoading(true);
            // Placeholder for your submit logic
            setIsLoading(false);
          }}
        >
          {isLoading ? "Generating..." : "Submit Leave Request"}
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => alert("Prescriptions fetched!")}
          disabled={isLoading}
        >
          Fetch Prescriptions
        </Button>
      </div>

      {prescriptions.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <FormControl fullWidth>
            <InputLabel>Select a Prescription</InputLabel>
            <Select
              value={selectedPrescription}
              onChange={(e) => setSelectedPrescription(e.target.value)}
            >
              {prescriptions.map((prescription) => (
                <MenuItem key={prescription.id} value={prescription}>
                  {`${prescription.date}: ${prescription.diagnosis}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}

      {selectedPrescription && (
        <div style={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={generateReport}
            disabled={isLoading}
          >
            Generate Report
          </Button>
        </div>
      )}
    </div>
  );
};

function generatePDF(prescription) {
  const pdf = new jsPDF();
  pdf.setFontSize(16);
  pdf.text("Medical Prescription Report", 10, 10);

  pdf.setFontSize(12);
  pdf.text(`Prescription ID: ${prescription.id}`, 10, 30);
  pdf.text(`Date: ${prescription.date}`, 10, 40);
  pdf.text(`Diagnosis: ${prescription.diagnosis}`, 10, 50);
  pdf.text(`Treatment: ${prescription.treatment}`, 10, 60);

  pdf.setFontSize(10);
  pdf.text("Doctor's Signature: _______________________", 10, 80);
  pdf.text("Date: _______________", 150, 80);

  return pdf;
}
