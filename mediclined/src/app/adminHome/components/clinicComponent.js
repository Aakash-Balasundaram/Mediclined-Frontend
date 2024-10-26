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

import EditClinicModal from "./clinicEditModal.js"; // Assuming a separate edit modal for clinics
import { CLINIC_URL } from "../../constants.js";
import secureLocalStorage from "react-secure-storage";

export default function Clinic() {
  const [clinic, setClinic] = useState({
    university_name: "",
    doctor_availability: "",
    password: "",
    clinicID: "",
  });

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [clinics, setClinics] = useState([]);
  const [editingClinic, setEditingClinic] = useState({
    University_Name: "",
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
    setClinic((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditingClinic((prev) => ({ ...prev, [name]: value }));
  };

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
  };

  const handleCreate = async () => {
    try {
      const token = secureLocalStorage.getItem("token");
      const response = await axios.post(
        CLINIC_URL,
        {
          university_name: clinic.university_name,
          doctor_availability: clinic.doctor_availability,
          password: clinic.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        showAlert("Clinic added successfully!", "success");
        handleGetAll();
        setClinic({
          university_name: "",
          password: "",
        });
      }
    } catch (error) {
      showAlert(error.response.data.ERR, "error");
      console.error("Error creating clinic:", error);
    }
  };

  const handleGetAll = async () => {
    try {
      const token = secureLocalStorage.getItem("token");
      const response = await axios.get(CLINIC_URL + "/clinics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClinics(response.data.MSG);
    } catch (error) {
      showAlert(error.response.data.ERR, "error");
      console.error("Error fetching clinics:", error.response.data.ERR);
    }
  };

  const handleEdit = (clinic) => {
    setEditingClinic(clinic);
    setOpenEdit(true);
  };

  const handleUpdate = async () => {
    try {
      const token = secureLocalStorage.getItem("token");
      const response = await axios.put(
        CLINIC_URL + `/${editingClinic.Clinic_ID}`,
        {
          university_name: editingClinic.University_Name,
          password: editingClinic.Password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setOpenEdit(false);
        showAlert("Clinic updated successfully!", "success");
        handleGetAll();
        setEditingClinic({
          university_name: "",
          password: "",
          clinicID: "",
        });
      }
    } catch (error) {
      showAlert(error.response.data.ERR, "error");
      console.error("Error updating clinic:", error);
    }
  };

  const handleDelete = async (clinicID) => {
    try {
      const token = secureLocalStorage.getItem("token");
      const response = await axios.delete(CLINIC_URL + `/${clinicID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        showAlert("Clinic deleted successfully!", "success");
        handleGetAll();
        setOpen(false);
      }
    } catch (error) {
      showAlert(error.response.data.ERR, "error");
      console.error("Error deleting clinic:", error);
    }
  };

  const handleClickOpen = (clinicID) => {
    setClinic((prev) => ({ ...prev, clinicID })); // Set clinic ID for deletion
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClinics = clinics.filter((cl) =>
    cl.University_Name && cl.University_Name.toLowerCase().includes(searchTerm.toLowerCase())
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
          Add Clinic Details
        </Typography>
        <TextField
          name="university_name"
          label="University Name"
          value={clinic.university_name}
          onChange={handleChange}
          fullWidth
          size="small"
          margin="dense"
        />
        <TextField
          name="password"
          label="Password"
          value={clinic.password}
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
            All Clinics
          </Typography>
          <TextField
            label="Search Clinics"
            variant="outlined"
            size="small"
            onChange={handleSearchChange}
            fullWidth
            sx={{ mb: 1 }}
          />
        </div>
        <div className="overflow-scroll h-[400px]">
          {filteredClinics.map((clinic) => (
            <Box
              key={clinic.clinicID} // Use clinicID for unique key
              border="1px solid gray"
              borderRadius="5px"
              className="flex flex-row justify-between"
              p={2}
              mb={1}
            >
              <div>
                <Typography>University Name: {clinic.University_Name}</Typography>
                <Typography>Clinic ID: {clinic.Clinic_ID}</Typography>
              </div>
              <div>
                <IconButton
                  onClick={() => handleEdit(clinic)}
                  aria-label="edit"
                  color="primary"
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleClickOpen(clinic.Clinic_ID)} // Pass clinicID for deletion
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
          <DialogTitle>Delete Clinic</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this clinic?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => handleDelete(clinic.clinicID)}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <EditClinicModal
        open={openEdit}
        setOpen={setOpenEdit}
        handleChange={handleChangeEdit}
        handleUpdate={handleUpdate}
        clinic={editingClinic}
      />
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
  );
}
