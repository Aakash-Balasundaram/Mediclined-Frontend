"use client";

import React, { useState, useEffect } from "react";
import {
  Avatar,
  Card,
  TextField,
  Button,
  Rating,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Autocomplete,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FeedbackIcon from "@mui/icons-material/Feedback";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Head from "../header";
import axios from "axios";
import MedicineSearch from "./components/MedicineSearch";
import { MEDICINE_API_URL, STUDENT_URL } from "../constants";
import secureLocalStorage from "react-secure-storage";

export const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
};

const ProfileCard = ({ name, id }) => {
  const [studentDetails, setStudentDetails] = useState({
    Email: "",
    Name: "",
    Age: "",
    Gender: "",
    Blood_Group: "",
    Roll_number: "",
    Address: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});

  const getDetails = async () => {
    const email = secureLocalStorage.getItem("email");
    const token = secureLocalStorage.getItem("token");
    const response = await axios.get(`${STUDENT_URL}?email=${email}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Assuming Bearer token
      },
    });
    if (response.status >= 200 && response.status < 300) {
      console.log(response.data.MSG);
      setStudentDetails(response.data.MSG[0]);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditedDetails(studentDetails);
    } else {
      setStudentDetails(editedDetails);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    try {
      const updatedDetails = Object.entries(editedDetails).reduce(
        (acc, [key, value]) => {
          if (value !== "") acc[key] = value;
          return acc;
        },
        {}
      );

      const response = await axios.put(`${STUDENT_URL}`, updatedDetails, {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem("token")}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        console.log("Profile updated successfully");
        // Update local storage if needed
        secureLocalStorage.setItem(
          "email",
          editedDetails.Email || studentDetails.Email
        );
        toggleEditMode();
      } else {
        throw new Error(`Failed to update profile: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <Card className="p-6">
      {editMode ? (
        <div>
          <TextField
            label="Email"
            name="Email"
            value={editedDetails.Email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Name"
            name="Name"
            value={editedDetails.Name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Age"
            name="Age"
            value={editedDetails.Age}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Gender</InputLabel>
            <Select
              value={editedDetails.Gender || ""}
              onChange={(event) =>
                handleInputChange({
                  target: { name: "Gender", value: event.target.value },
                })
              }
              label="Gender"
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Blood Group"
            name="Blood_Group"
            value={editedDetails.Blood_Group || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Roll Number"
            name="Roll_number"
            value={editedDetails.Roll_number}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Address"
            name="Address"
            value={editedDetails.Address}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
            variant="outlined"
          />

          <Button
            onClick={saveChanges}
            variant="contained"
            color="primary"
            fullWidth
          >
            Save Changes
          </Button>
          <Button onClick={toggleEditMode} variant="outlined" fullWidth>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center mb-6">
          <Avatar
            sx={{
              width: 100,
              height: 100,
              fontSize: "2rem",
              bgcolor: "#1976d2",
              marginBottom: "1rem",
            }}
          >
            {getInitials(name)}
          </Avatar>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">ID: {id}</p>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-gray-600">Age</span>
          <span className="font-medium">
            {studentDetails.Age || "Not Available"}
          </span>
        </div>
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-gray-600">Blood Group</span>
          <span className="font-medium">
            {studentDetails.Blood_Group || "Not Available"}
          </span>
        </div>
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-gray-600">Weight</span>
          <span className="font-medium">75 kg</span>
        </div>
      </div>

      <IconButton onClick={toggleEditMode}>
        {editMode ? <DeleteOutlineIcon /> : <FeedbackIcon />}
      </IconButton>
    </Card>
  );
};

const MedicineSearchSection = ({ onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedStrength, setSelectedStrength] = useState("");
  const [loading, setLoading] = useState(false);

  const searchMedicines = async (query) => {
    if (!query) {
      setMedicines([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${MEDICINE_API_URL}?terms=${query}&ef=STRENGTHS_AND_FORMS`
      );
      const medicinesData = response.data;
      const medicineNames = medicinesData[1];
      const strengthsAndForms = medicinesData[2]?.STRENGTHS_AND_FORMS || [];

      const formattedMedicines = medicineNames.map((name, index) => ({
        name,
        strengthsAndForms: strengthsAndForms[index] || [],
      }));

      setMedicines(formattedMedicines);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event, newValue) => {
    setSearchQuery(newValue);
    if (newValue) {
      searchMedicines(newValue);
    }
  };

  // Fixed: Now only updates selected medicine without adding to cart
  const handleMedicineSelect = (event, newValue) => {
    setSelectedMedicine(newValue);
    setSelectedStrength(""); // Reset strength when medicine changes
  };

  const handleStrengthSelect = (event) => {
    setSelectedStrength(event.target.value);
  };

  const handleAddToCart = () => {
    if (selectedMedicine && selectedStrength) {
      onAddToCart({
        name: selectedMedicine.name,
        dosage: selectedStrength,
        price: (Math.random() * 20 + 5).toFixed(2),
        id: Date.now(),
      });

      // Reset selections after adding to cart
      setSelectedMedicine(null);
      setSelectedStrength("");
      setSearchQuery("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Autocomplete
          fullWidth
          value={selectedMedicine}
          onChange={handleMedicineSelect}
          options={medicines}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e, e.target.value)}
            />
          )}
          loading={loading}
          isOptionEqualToValue={(option, value) => option.name === value.name}
        />

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Strength & Form</InputLabel>
          <Select
            value={selectedStrength}
            onChange={handleStrengthSelect}
            label="Strength & Form"
            disabled={!selectedMedicine}
          >
            {selectedMedicine?.strengthsAndForms.map((strength, index) => (
              <MenuItem key={index} value={strength}>
                {strength}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {selectedMedicine && selectedStrength && (
        <Card className="p-4 border rounded-lg hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar sx={{ bgcolor: "#f5f5f5" }}>
              <LocalPharmacyIcon sx={{ color: "#ef4444" }} />
            </Avatar>
            <div>
              <h3 className="font-medium">{selectedMedicine.name}</h3>
              <p className="text-sm text-gray-500">{selectedStrength}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="contained" size="small" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

const UserDashboard = () => {
  const [cart, setCart] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [openFeedback, setOpenFeedback] = useState(false);

  // Sample featured medications
  const featuredMedications = [
    { name: "Vitamin D3", dosage: "1000 IU", price: 12.99 },
    { name: "Multivitamin", dosage: "Daily tablet", price: 19.99 },
    { name: "Omega-3", dosage: "1000mg", price: 15.99 },
    { name: "Calcium", dosage: "500mg", price: 9.99 },
  ];

  const doctors = [
    {
      name: "Dr. Robert Smith",
      specialty: "Cardiologist",
      status: "Available",
    },
    {
      name: "Dr. James Wilson",
      specialty: "Orthopedist",
      status: "Not Available",
    },
  ];

  const addToCart = (medication) => {
    setCart([...cart, { ...medication, id: Date.now() }]);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + Number(item.price), 0).toFixed(2);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div>
        <Head />
      </div>
      <div className="grid grid-cols-12 gap-4">
        {/* Left Column - Profile */}
        <div className="col-span-3">
          <ProfileCard name="John Doe" id="johndoe@gmail.com" />
          {/* Doctors List */}
          <Card className="p-4 mt-4">
            <h2 className="text-lg font-semibold mb-4">Available Doctors</h2>
            <div className="space-y-3">
              {doctors.map((doctor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    <Avatar
                      className="text-[12.5px]"
                      sx={{ width: 36, height: 36 }}
                    >
                      {getInitials(doctor.name)}
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{doctor.name}</p>
                      <p className="text-xs text-gray-500">
                        {doctor.specialty}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        doctor.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {doctor.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Middle Column - Pharmacy Services */}
        <div className="col-span-6">
          <Card className="p-4 max-h-[calc(100vh-32px)] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-2 z-10">
              <h2 className="text-lg font-semibold">Pharmacy Services</h2>
              <div className="flex items-center space-x-2">
                <IconButton
                  onClick={() => setOpenFeedback(true)}
                  color="primary"
                >
                  <FeedbackIcon />
                </IconButton>
                <Badge badgeContent={cart.length} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </div>
            </div>

            <MedicineSearchSection onAddToCart={addToCart} />

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">
                Featured Medications
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {featuredMedications.map((med, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar sx={{ bgcolor: "#f5f5f5" }}>
                        <LocalPharmacyIcon sx={{ color: "#ef4444" }} />
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{med.name}</h3>
                        <p className="text-sm text-gray-500">{med.dosage}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">${med.price}</span>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => addToCart(med)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Cart */}
        <div className="col-span-3">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <Badge badgeContent={cart.length} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </div>

            <div className="space-y-3 mb-4 max-h-[calc(100vh-250px)] overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded group"
                >
                  <div className="flex-grow">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.dosage}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">${item.price}</span>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">${calculateTotal()}</span>
              </div>
              <Button variant="contained" fullWidth>
                Checkout
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Feedback Dialog */}
      <Dialog open={openFeedback} onClose={() => setOpenFeedback(false)}>
        <DialogTitle>Provide Feedback</DialogTitle>
        <DialogContent>
          <div className="space-y-4 p-4">
            <Rating
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here..."
            />
            <Button
              variant="contained"
              onClick={() => {
                setOpenFeedback(false);
                setFeedback("");
                setRating(0);
              }}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDashboard;
