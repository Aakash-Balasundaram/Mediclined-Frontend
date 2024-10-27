"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

export const MedicalLeaveSection = ({
  leaveData,
  error,
  onInputChange,
  setLeaveData,
}) => {
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPrescriptions = async () => {
    if (
      !leaveData.rollNo.trim() ||
      !leaveData.startDate ||
      !leaveData.endDate
    ) {
      console.log("Some fields are empty!")
      return;
    }

    try {
      const response = await axios.get(
        MONGO_URL +
          `/rollNo/${leaveData.rollNo}?startDate=${leaveData.startDate}&endDate=${leaveData.endDate}`
      );

      if (response.status === 200) {
        console.log("Prescriptions fetched successfully!");

        // Update the mockPrescriptions state with the fetched data
        setPrescriptions(response.data);

        setError((prev) => ({ ...prev, leaveDetails: "" }));
        setLeaveData({
          rollNo: "",
          startDate: "",
          endDate: "",
          selectedPrescription: "", // Reset selectedPrescription
        });
      } else {
        console.error("Failed to fetch prescriptions:", response.data);
      }
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const generateReport = async () => {
    if (!selectedPrescription) {
      alert("Please select a prescription first.");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate PDF generation
      const pdfContent = await generatePDF(selectedPrescription);
      const blob = new Blob([pdfContent], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `report_${selectedPrescription.id}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
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
        >
          {isLoading ? "Generating..." : "Submit Leave Request"}
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchPrescriptions}
          disabled={isLoading}
        >
          {isLoading ? "Fetching..." : "Fetch Prescriptions"}
        </Button>
      </div>

      {prescriptions.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Select a Prescription:</Typography>
          <List>
            {prescriptions.map((prescription) => (
              <ListItem
                key={prescription.id}
                button
                onClick={() => setSelectedPrescription(prescription)}
              >
                <ListItemText
                  primary={`${prescription.date}: ${prescription.diagnosis}`}
                />
              </ListItem>
            ))}
          </List>
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
  // Implement your PDF generation logic here
  // This is just a placeholder - you'll need to implement the actual PDF generation
  console.log(`Generating PDF for prescription ${prescription.id}`);
  return "PDF content"; // Return the actual PDF content
}
