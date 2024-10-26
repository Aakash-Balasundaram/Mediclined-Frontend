"use client";

import { useState } from "react";
import { FaClinicMedical } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { Box, Typography, Button, TextField } from "@mui/material";

export default function Categories() {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setExpandedCategory(category === expandedCategory ? null : category);
  };

  return (
    <div className="flex flex-row flex-wrap space-x-4">
      <div className="flex flex-col w-1/2 space-y-2">
        <div
          className={`flex flex-row items-center p-4 cursor-pointer bg-customStudent transition-all duration-300 ease-in-out ${
            expandedCategory === "student" ? "w-full" : "w-1/2"
          }`}
          onClick={() => handleCategoryClick("student")}
        >
          <div>
            <PiStudentBold />
          </div>
          <div className="ml-2">Student</div>
        </div>
        <Box
          className={`p-4 bg-gray-100 w-full transition-all duration-300 ease-in-out ${
            expandedCategory === "student" ? "max-h-screen" : "max-h-0 overflow-hidden"
          }`}
        >
          <Typography variant="h6">Student Operations</Typography>
          <Button variant="contained" className="my-2">Get All Students</Button>
          <Button variant="contained" className="my-2">Add Multiple Students</Button>
          <Button variant="contained" className="my-2">Delete Multiple Students</Button>
          <TextField label="Update Student Password" className="my-2" fullWidth />
          <TextField label="Reset Student Password" className="my-2" fullWidth />
        </Box>

        <div
          className={`flex flex-row items-center p-4 cursor-pointer bg-customPharmacy transition-all duration-300 ease-in-out ${
            expandedCategory === "pharmacy" ? "w-full" : "w-1/2"
          }`}
          onClick={() => handleCategoryClick("pharmacy")}
        >
          <div>
            <GiMedicines />
          </div>
          <div className="ml-2">Pharmacy</div>
        </div>
        <Box
          className={`p-4 bg-gray-100 w-full transition-all duration-300 ease-in-out bg-${
            expandedCategory === "pharmacy" ? "max-h-screen" : "max-h-0 overflow-hidden"
          }`}
        >
          <Typography variant="h6">Pharmacy Operations</Typography>
          <Button variant="contained" className="my-2">Add Product</Button>
          <Button variant="contained" className="my-2">Add Product to Pharmacy with Stock</Button>
          <Button variant="contained" className="my-2">Edit Product</Button>
          <TextField label="Update Stock" className="my-2" fullWidth />
          <Button variant="contained" className="my-2">Delete Product</Button>
          <Button variant="contained" className="my-2">Delete Product in Particular Pharmacy</Button>
        </Box>
      </div>
      
      <div className="flex flex-col w-1/2 space-y-2">
        <div
          className={`flex flex-row items-center p-4 cursor-pointer bg-customClinic transition-all duration-300 ease-in-out ${
            expandedCategory === "clinic" ? "w-full" : "w-1/2"
          }`}
          onClick={() => handleCategoryClick("clinic")}
        >
          <div>
            <FaClinicMedical />
          </div>
          <div className="ml-2">Clinic</div>
        </div>
        <Box
          className={`p-4 bg-gray-100 w-full transition-all duration-300 ease-in-out ${
            expandedCategory === "clinic" ? "max-h-screen" : "max-h-0 overflow-hidden"
          }`}
        >
          <Typography variant="h6">Clinic Operations</Typography>
          <Button variant="contained" className="my-2">Create Clinic</Button>
          <Button variant="contained" className="my-2">Get All Clinics</Button>
          <TextField label="Get Clinic by ID" className="my-2" fullWidth />
          <Button variant="contained" className="my-2">Update Clinic</Button>
          <Button variant="contained" className="my-2">Delete Clinic</Button>
        </Box>

        <div
          className={`flex flex-row items-center p-4 cursor-pointer bg-customDoctor transition-all duration-300 ease-in-out ${
            expandedCategory === "doctor" ? "w-full" : "w-1/2"
          }`}
          onClick={() => handleCategoryClick("doctor")}
        >
          <div>
            <FaUserDoctor />
          </div>
          <div className="ml-2">Doctor</div>
        </div>
        <Box
          className={`p-4 bg-gray-100 w-full transition-all duration-300 ease-in-out ${
            expandedCategory === "doctor" ? "max-h-screen" : "max-h-0 overflow-hidden"
          }`}
        >
          <Typography variant="h6">Doctor Operations</Typography>
          <Button variant="contained" className="my-2">Create Doctor</Button>
          <Button variant="contained" className="my-2">Edit Doctor</Button>
          <Button variant="contained" className="my-2">Get All Doctors</Button>
          <Button variant="contained" className="my-2">Delete Doctor</Button>
        </Box>
      </div>
    </div>
  );
}
