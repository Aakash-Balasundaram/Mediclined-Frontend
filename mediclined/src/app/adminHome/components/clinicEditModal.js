import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

export default function EditClinicModal({
  open,
  setOpen,
  clinic = { University_Name: '', Password: '', Clinic_ID: '' }, // Default values
  handleChange,
  handleUpdate,
}) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Edit Clinic</DialogTitle>
      <DialogContent>
        <TextField
          name="University_Name"
          label="University Name"
          value={clinic.University_Name}
          onChange={handleChange}
          fullWidth
          size="small"
          margin="dense"
        />
        <TextField
          name="Password"
          label="Password"
          value={clinic.Password}
          defaultValue={""}
          onChange={handleChange}
          fullWidth
          size="small"
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update Clinic
        </Button>
      </DialogActions>
    </Dialog>
  );
}
