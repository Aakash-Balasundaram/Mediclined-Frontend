// EditDoctorModal.js
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

export default function EditDoctorModal({
  open,
  onClose,
  doctor = { Name: '', Age: '', Email: '', Specialization: '', Qualification: '' }, // Default values
  onChange,
  onUpdate,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Doctor</DialogTitle>
      <DialogContent>
        <TextField
          name="Name"
          label="Doctor Name"
          value={doctor.Name}
          onChange={onChange}
          fullWidth
          size="small"
          margin="dense"
        />
        <TextField
          name="Age"
          label="Age"
          value={doctor.Age}
          onChange={onChange}
          fullWidth
          size="small"
          margin="dense"
        />
        <TextField
          name="Email"
          label="Email"
          value={doctor.Email}
          onChange={onChange}
          fullWidth
          size="small"
          margin="dense"
          disabled
        />
        <TextField
          name="Specialization"
          label="Specialization"
          value={doctor.Specialization}
          onChange={onChange}
          fullWidth
          size="small"
          margin="dense"
        />
        <TextField
          name="Qualification"
          label="Qualification"
          value={doctor.Qualification}
          onChange={onChange}
          fullWidth
          size="small"
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onUpdate} color="primary">
          Update Doctor
        </Button>
      </DialogActions>
    </Dialog>
  );
}
