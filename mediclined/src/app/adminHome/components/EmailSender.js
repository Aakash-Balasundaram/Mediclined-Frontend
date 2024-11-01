// components/EmailSender.js
import { useState, useEffect } from "react";
import axios from "axios";
import { STUDENT_URL } from "../../constants.js";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";
import secureLocalStorage from "react-secure-storage";

const EmailSender = ({ fetchAll }) => {
  const [emailPattern, setEmailPattern] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [emailPreview, setEmailPreview] = useState([]);
  const [clinicID, setClinicID] = useState("");
  const [operation, setOperation] = useState("add"); // Set default to "add"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");

    // Validate inputs
    if (!emailPattern || !start || !end) {
      setStatusMessage("Please fill in all fields.");
      return;
    }

    const startNum = parseInt(start, 10);
    const endNum = parseInt(end, 10);

    if (isNaN(startNum) || isNaN(endNum) || startNum > endNum) {
      setStatusMessage("Invalid range provided.");
      return;
    }

    // Generate emails and send requests
    try {
      const emailPromises = [];
      for (let i = startNum; i <= endNum; i++) {
        const email = emailPattern.replace(
          /\{n\}/g,
          String(i).padStart(2, "0")
        );
        emailPromises.push(email);
      }

      const token = secureLocalStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      if (operation === "add") {
        const res = await axios.post(
          `${STUDENT_URL}/students`,
          { emails: emailPromises, clinicID },
          { headers }
        );
        console.log(res);
        setStatusMessage("Emails sent successfully!");
        fetchAll();
      } else if (operation === "delete") {
        // Using data property in config for DELETE request
        const res = await axios.delete(`${STUDENT_URL}/students`, {
          headers,
          data: { emails: emailPromises },
        });
        console.log(res);
        setStatusMessage("Students deleted successfully!");
        fetchAll();
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("Error sending emails. Please try again.");
    }
  };

  const generateEmailPreview = () => {
    const startNum = parseInt(start, 10);
    const endNum = parseInt(end, 10);

    if (
      !emailPattern ||
      isNaN(startNum) ||
      isNaN(endNum) ||
      startNum > endNum
    ) {
      setEmailPreview([]);
      return;
    }

    const previews = [];
    const countToShow = 1;

    for (let i = startNum; i < startNum + countToShow && i <= endNum; i++) {
      previews.push(emailPattern.replace(/\{n\}/g, String(i).padStart(2, "0")));
    }

    for (let i = endNum; i > endNum - countToShow && i >= startNum; i--) {
      previews.push(emailPattern.replace(/\{n\}/g, String(i).padStart(2, "0")));
    }

    setEmailPreview(previews);
  };

  useEffect(() => {
    generateEmailPreview();
  }, [emailPattern, start, end]);

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 4,
        border: 1,
        borderColor: "grey.300",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Batch CRUD operations
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="ClinicID"
          variant="outlined"
          fullWidth
          value={clinicID}
          onChange={(e) => setClinicID(e.target.value)}
          placeholder="e.g. 12"
          margin="normal"
          required
        />
        <TextField
          label="Email Pattern"
          variant="outlined"
          fullWidth
          value={emailPattern}
          onChange={(e) => setEmailPattern(e.target.value)}
          placeholder="e.g. cb.en.u4cse224{n}@cb.students.amrita.edu"
          helperText='Use "{n}" as a placeholder for the number.'
          margin="normal"
          required
        />
        <TextField
          label="Start Number"
          variant="outlined"
          fullWidth
          type="number"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="End Number"
          variant="outlined"
          fullWidth
          type="number"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          margin="normal"
          required
        />
        <FormControl>
          <FormLabel id="functions">Functionality</FormLabel>
          <RadioGroup
            aria-labelledby="functions"
            name="radio-buttons-group"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <FormControlLabel value="add" control={<Radio />} label="Add" />
            <FormControlLabel
              value="delete"
              control={<Radio />}
              label="Delete"
            />
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
      {statusMessage && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {statusMessage}
        </Typography>
      )}
      {emailPreview.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Email Previews</Typography>
          <ul>
            {emailPreview.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default EmailSender;
