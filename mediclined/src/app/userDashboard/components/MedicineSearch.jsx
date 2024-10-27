import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const MedicineSearch = ({ onMedicineSelect, apiUrl }) => {
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
        `${apiUrl}?terms=${query}&ef=STRENGTHS_AND_FORMS`
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
      setMedicines([]);
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

  const handleMedicineSelect = (event, newValue) => {
    setSelectedMedicine(newValue);
    setSelectedStrength("");

    if (!newValue) {
      onMedicineSelect(null);
    }
  };

  const handleStrengthSelect = (event) => {
    const strength = event.target.value;
    setSelectedStrength(strength);

    if (selectedMedicine) {
      onMedicineSelect({
        name: selectedMedicine.name,
        dosage: strength,
      });
    }
  };

  const resetSelection = () => {
    setSelectedMedicine(null);
    setSelectedStrength("");
    setSearchQuery("");
    onMedicineSelect(null);
  };

  return (
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
  );
};

export default MedicineSearch;
