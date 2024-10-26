import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MyComponent = () => {
  const [selectedTab, setSelectedTab] = useState("doctor");

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", px: 7 }}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{ mb: 3 }}
      >
        <Tab sx={{ width: "25%", fontSize: "0.8rem" }} value="student" label="Student" />
        <Tab sx={{ width: "25%", fontSize: "0.8rem" }} value="pharmacy" label="Pharmacy" />
        <Tab sx={{ width: "25%", fontSize: "0.8rem" }} value="clinic" label="Clinic" />
        <Tab sx={{ width: "25%", fontSize: "0.8rem" }} value="doctor" label="Doctor" />
      </Tabs>

      <Box sx={{ p: 3, bgcolor: "background.paper" }}>
        {selectedTab === "doctor" && <Doctor />}
        {/* Other components (Student, Pharmacy, Clinic) can be included here */}
      </Box>
    </Box>
  );
};

const Doctor = () => {
  const [doctor, setDoctor] = useState({
    id: "",
    name: "",
    age: "",
    email: "",
    specialization: "",
    qualification: "",
  });
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    setDoctors((prev) => [...prev, { ...doctor, id: String(prev.length + 1) }]);
    console.log("Create doctor:", doctor);
    setDoctor({ id: "", name: "", age: "", email: "", specialization: "", qualification: "" });
  };

  const handleGetAll = () => {
    console.log("Get all doctors");
    // Fetch all doctors from the database (mocked here)
    setDoctors([
      { id: "1", name: "Dr. John Doe", age: 45, email: "john@example.com", specialization: "Cardiology", qualification: "MD" },
      { id: "2", name: "Dr. Jane Smith", age: 38, email: "jane@example.com", specialization: "Neurology", qualification: "PhD" },
    ]);
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
  };

  const handleUpdate = () => {
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === editingDoctor.id ? editingDoctor : doc))
    );
    console.log("Update doctor:", editingDoctor);
    setEditingDoctor(null);
  };

  const handleDelete = (doctorId) => {
    setDoctors((prev) => prev.filter((doc) => doc.id !== doctorId));
    console.log("Delete doctor:", doctorId);
    setOpen(false);
  };

  const handleClickOpen = (doctorId) => {
    setOpen(true);
    setDoctor((prev) => ({ ...prev, id: doctorId }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box border={"gray-500"} display="flex" justifyContent="space-between" sx={{ flexDirection: { xs: "column", md: "row" } }}>
      <Box width={{ xs: "100%", md: "40%" }} sx={{ mb: 2 }}>
        <Typography className="text-[28px]" variant="h6" sx={{ mb: 1 }}>Add Doctor Details</Typography>
        <TextField
          name="name"
          label="Doctor Name"
          value={doctor.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ mb: 0.5 }}
        />
        <TextField
          name="age"
          label="Age"
          value={doctor.age}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ mb: 0.5 }}
        />
        <TextField
          name="email"
          label="Email"
          value={doctor.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ mb: 0.5 }}
        />
        <TextField
          name="specialization"
          label="Specialization"
          value={doctor.specialization}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ mb: 0.5 }}
        />
        <TextField
          name="qualification"
          label="Qualification"
          value={doctor.qualification}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ mb: 0.5 }}
        />
        <Button
        className="mt-3"
          variant="contained"
          color="primary"
          onClick={handleCreate}
          sx={{ mb: 0.5 }}
        >
          Add Details
        </Button>
      </Box>
      <Box width={{ xs: "100%", md: "58%" }} sx={{ mb: 2 }}>
        <Typography variant="h6" className="text-[28px]" sx={{ fontSize: "1rem", mb: 2 }}>Doctor Details Management</Typography>
        <TextField
          name="search"
          label="Search Doctor"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          margin="normal"
          sx={{ mb: 0.5 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGetAll}
          sx={{ mb: 0.5 ,mt: 2}}
        >
          Get All Doctors
        </Button>
        <Box>
          {filteredDoctors.map((doc) => (
            <Box key={doc.id} display="flex" alignItems="center" sx={{ mb: 2 }}>
              <Typography sx={{ flexGrow: 1 }}>{doc.name}</Typography>
              <IconButton color="primary" onClick={() => handleEdit(doc)}>
                <EditIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleClickOpen(doc.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
        {editingDoctor && (
          <Box>
            <Typography variant="h6" sx={{ fontSize: "1rem", mb: 2 }}>Edit Doctor</Typography>
            <TextField
              name="name"
              label="Doctor Name"
              value={editingDoctor.name}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
              fullWidth
              margin="normal"
              sx={{ mb: 1 }}
            />
            <TextField
              name="age"
              label="Age"
              value={editingDoctor.age}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, age: e.target.value })}
              fullWidth
              margin="normal"
              sx={{ mb: 1 }}
            />
            <TextField
              name="email"
              label="Email"
              value={editingDoctor.email}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, email: e.target.value })}
              fullWidth
              margin="normal"
              sx={{ mb: 1 }}
            />
            <TextField
              name="specialization"
              label="Specialization"
              value={editingDoctor.specialization}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, specialization: e.target.value })}
              fullWidth
              margin="normal"
              sx={{ mb: 1 }}
            />
            <TextField
              name="qualification"
              label="Qualification"
              value={editingDoctor.qualification}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, qualification: e.target.value })}
              fullWidth
              margin="normal"
              sx={{ mb: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              sx={{ mb: 1 }}
            >
              Save Changes
            </Button>
          </Box>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Doctor"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this doctor?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleDelete(doctor.id)} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default MyComponent;
