import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import EditDoctorModal from "./doctorEditModal.js";

import { DOCTOR_URL } from "../../constants.js";
import secureLocalStorage from "react-secure-storage";

export default function Doctor() {
  const [doctor, setDoctor] = useState({
    Name: "",
    Age: "",
    Email: "",
    Specialization: "",
    Qualification: "",
    Password: "",
    Clinic_ID: "",
  });
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState({
    Name: "",
    Age: "",
    Email: "",
    Specialization: "",
    Qualification: "",
    Password: "",
    Clinic_ID: "",
  });
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    handleGetAll();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditingDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
  };

  const handleCreate = async () => {
    try {
      const token = secureLocalStorage.getItem("token");
      const response = await axios.post(
        DOCTOR_URL,
        {
          email: doctor.Email, // Use lowercase keys for Axios request
          name: doctor.Name,
          age: doctor.Age,
          spec: doctor.Specialization,
          qualification: doctor.Qualification,
          password: doctor.Password,
          clinicID: doctor.Clinic_ID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        showAlert("Doctor added successfully!", "success");
        handleGetAll();
        setDoctor({
          Name: "",
          Age: "",
          Email: "",
          Specialization: "",
          Qualification: "",
          Password: "",
          Clinic_ID: "",
        });
      }
    } catch (error) {
      showAlert(error.response.data.ERR, "error");
      console.error("Error creating doctor:", error);
    }
  };

  const handleGetAll = async () => {
    try {
      const token = secureLocalStorage.getItem("token");
      const response = await axios.get(DOCTOR_URL + "/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDoctors(response.data.MSG);
    } catch (error) {
      showAlert(error.response.data.ERR, "error");
      console.error("Error fetching doctors:", error.response.data.ERR);
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setOpenEdit(true);
  };

  const handleUpdate = async () => {
    try {
      const token = secureLocalStorage.getItem("token");
      const response = await axios.put(
        DOCTOR_URL,
        {
          email: editingDoctor.Email, // Use lowercase keys for Axios request
          name: editingDoctor.Name,
          age: editingDoctor.Age,
          spec: editingDoctor.Specialization,
          qualification: editingDoctor.Qualification,
          password: editingDoctor.Password,
          clinicID: editingDoctor.Clinic_ID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setOpenEdit(false);
        showAlert("Doctor updated successfully!", "success");
        handleGetAll();
        setEditingDoctor({
          Name: "",
          Age: "",
          Email: "",
          Specialization: "",
          Qualification: "",
          Password: "",
          Clinic_ID: "",
        });
      }
    } catch (error) {
      showAlert(error.response.data.ERR, "error");
      console.error("Error updating doctor:", error);
    }
  };

  const handleDelete = async (doctorEmail) => {
    try {
      const token = secureLocalStorage.getItem("token");
      const response = await axios.delete(DOCTOR_URL + `/${doctorEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        showAlert("Doctor deleted successfully!", "success");
        handleGetAll();
        setOpen(false);
      }
    } catch (error) {
      showAlert(error.response.data.ERR, "error");
      console.error("Error deleting doctor:", error);
    }
  };

  const handleClickOpen = (email) => {
    setDoctor((prev) => ({ ...prev, Email: email })); // Changed to Title Case
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      border={"gray-500"}
      display="flex"
      justifyContent="space-between"
      sx={{ flexDirection: { xs: "column", md: "row" } }}
    >
      <Box width={{ xs: "100%", md: "40%" }} sx={{ mb: 2 }}>
        <Typography className="text-[24px]" variant="h6" sx={{ mb: 1 }}>
          Add Doctor Details
        </Typography>
        <TextField
          name="Name" // Changed to Title Case
          label="Doctor Name"
          value={doctor.Name}
          onChange={handleChange}
          fullWidth
          size="small"
          margin="dense"
        />
        <TextField
          name="Age" // Changed to Title Case
          label="Age"
          value={doctor.Age}
          onChange={handleChange}
          fullWidth
          size="small"
          margin="dense"
        />
        <TextField
          name="Email" // Changed to Title Case
          label="Email"
          value={doctor.Email}
          onChange={handleChange}
          fullWidth
          size="small"
          margin="dense"
        />
        <TextField
          name="Specialization" // Changed to Title Case
          label="Specialization"
          value={doctor.Specialization}
          onChange={handleChange}
          fullWidth
          size="small"
          margin="dense"
        />
        <TextField
          name="Qualification" // Changed to Title Case
          label="Qualification"
          value={doctor.Qualification}
          onChange={handleChange}
          fullWidth
          size="small"
          margin="dense"
        />
        <TextField
          name="Password" // Changed to Title Case
          label="Password"
          value={doctor.Password}
          onChange={handleChange}
          type="text"
          fullWidth
          size="small"
          margin="dense"
        />
        <TextField
          name="Clinic_ID" // Changed to Title Case
          label="Clinic ID"
          value={doctor.Clinic_ID}
          onChange={handleChange}
          fullWidth
          size="small"
          margin="dense"
        />
        <Button
          className="mt-2"
          variant="contained"
          color="primary"
          onClick={handleCreate}
          fullWidth
          size="small"
        >
          Add Details
        </Button>
      </Box>
      <Box width={{ xs: "100%", md: "50%" }} className="flex flex-col gap-2">
        <div className="">
          <Typography className="text-[24px]" variant="h6" sx={{ mb: 1 }}>
            All Doctors
          </Typography>
          <TextField
            label="Search Doctors"
            variant="outlined"
            size="small"
            onChange={handleSearchChange}
            fullWidth
            sx={{ mb: 1 }}
          />
        </div>
        <div className="overflow-scroll h-[400px]">
          {filteredDoctors.map((doctor) => (
            <Box
              key={doctor.Email} // Changed to Title Case
              border="1px solid gray"
              borderRadius="5px"
              className="flex flex-row justify-between"
              p={2}
              mb={1}
            >
              <div>
                <Typography>Name: {doctor.Name}</Typography>
                <Typography>Specialization: {doctor.Specialization}</Typography>
              </div>
              <div>
                <IconButton
                  onClick={() => handleEdit(doctor)}
                  aria-label="edit"
                  color="primary"
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleClickOpen(doctor.Email)} // Changed to Title Case
                  aria-label="delete"
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </Box>
          ))}
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Delete Doctor</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this doctor?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(doctor.Email)} // Changed to Title Case
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          <Alert
            onClose={() => setAlert({ ...alert, open: false })}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
      <EditDoctorModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        doctor={editingDoctor}
        onChange={handleChangeEdit}
        onUpdate={handleUpdate}
      />
    </Box>
  );
}
