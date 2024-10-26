import { useState } from "react";
import { FaClinicMedical } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { Box, Typography, TextField, Button } from "@mui/material";

export default function Categories() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [studentInput, setStudentInput] = useState("");
  const [pharmacyInput, setPharmacyInput] = useState("");
  const [clinicInput, setClinicInput] = useState("");
  const [doctorInput, setDoctorInput] = useState("");
  const [notifications, setNotifications] = useState({});

  const handleCategoryClick = (category) => {
    setExpandedCategory(category === expandedCategory ? null : category);
  };

  const handleOperationClick = (category, operation, inputData) => {
    setNotifications((prev) => ({
      ...prev,
      [category]: `Performed ${operation} with data: ${inputData}`
    }));

    // Reset the input field after operation
    switch (category) {
      case "student":
        setStudentInput("");
        break;
      case "pharmacy":
        setPharmacyInput("");
        break;
      case "clinic":
        setClinicInput("");
        break;
      case "doctor":
        setDoctorInput("");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-row justify-between w-full h-full p-4">
      <div className="flex flex-col w-1/2">
        {/* Student Category */}
        <div
          className={`flex flex-row items-center p-4 cursor-pointer bg-customStudent transition-all w-full duration-300 ease-in-out ${
            expandedCategory === "student" ? "h-auto" : "h-16"
          }`}
          onClick={() => handleCategoryClick("student")}
        >
          <div>
            <PiStudentBold />
          </div>
          <div className="ml-2">Student</div>
        </div>
        {expandedCategory === "student" && (
          <Box className="p-4 bg-gray-100 w-full transition-all duration-300 ease-in-out">
            <Typography variant="h6" gutterBottom>
              Student Operations
            </Typography>
            <TextField
              label="Get All Students"
              value={studentInput}
              onChange={(e) => setStudentInput(e.target.value)}
              className="my-2"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOperationClick("student", "Get All Students", studentInput)}
            >
              Get Students
            </Button>
            <TextField
              label="Add Multiple Students"
              value={studentInput}
              onChange={(e) => setStudentInput(e.target.value)}
              className="my-2"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOperationClick("student", "Add Multiple Students", studentInput)}
            >
              Add Students
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleOperationClick("student", "Delete Multiple Students", studentInput)}
            >
              Delete Students
            </Button>
            <TextField
              label="Update Student Password"
              value={studentInput}
              onChange={(e) => setStudentInput(e.target.value)}
              className="my-2"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOperationClick("student", "Update Student Password", studentInput)}
            >
              Update Password
            </Button>
            <TextField
              label="Reset Student Password"
              value={studentInput}
              onChange={(e) => setStudentInput(e.target.value)}
              className="my-2"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOperationClick("student", "Reset Student Password", studentInput)}
            >
              Reset Password
            </Button>
            {notifications.student && (
              <Typography variant="body1" gutterBottom>
                Notification: {notifications.student}
              </Typography>
            )}
          </Box>
        )}

        {/* Clinic Category */}
        <div
          className={`flex flex-row items-center p-4 cursor-pointer bg-customClinic transition-all w-full duration-300 ease-in-out ${
            expandedCategory === "clinic" ? "h-auto" : "h-16"
          }`}
          onClick={() => handleCategoryClick("clinic")}
        >
          <div>
            <FaClinicMedical />
          </div>
          <div className="ml-2">Clinic</div>
        </div>
        {expandedCategory === "clinic" && (
          <Box className="p-4 bg-gray-100 w-full transition-all duration-300 ease-in-out">
            <Typography variant="h6" gutterBottom>
              Clinic Operations
            </Typography>
            <TextField
              label="Create Clinic"
              value={clinicInput}
              onChange={(e) => setClinicInput(e.target.value)}
              className="my-2"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOperationClick("clinic", "Create Clinic", clinicInput)}
            >
              Create Clinic
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleOperationClick("clinic", "Get All Clinics", clinicInput)}
            >
              Get All Clinics
            </Button>
            <TextField
              label="Get Clinic by ID"
              value={clinicInput}
              onChange={(e) => setClinicInput(e.target.value)}
              className="my-2"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOperationClick("clinic", "Get Clinic by ID", clinicInput)}
            >
              Get Clinic by ID
            </Button>
            <TextField
              label="Update Clinic"
              value={clinicInput}
              onChange={(e) => setClinicInput(e.target.value)}
              className="my-2"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOperationClick("clinic", "Update Clinic", clinicInput)}
            >
              Update Clinic
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleOperationClick("clinic", "Delete Clinic", clinicInput)}
            >
              Delete Clinic
            </Button>
            {notifications.clinic && (
              <Typography variant="body1" gutterBottom>
                Notification: {notifications.clinic}
              </Typography>
            )}
          </Box>
        )}
      </div>

      <div className="flex flex-col w-1/2">
        {/* Pharmacy Category */}
        <div
          className={`flex flex-row items-center p-4 cursor-pointer bg-customPharmacy transition-all w-full duration-300 ease-in-out ${
            expandedCategory === "pharmacy" ? "h-auto" : "h-16"
          }`}
          onClick={() => handleCategoryClick("pharmacy")}
        >
          <div>
            <GiMedicines />
          </div>
          <div className="ml-2">Pharmacy</div>
        </div>
        {expandedCategory === "pharmacy" && (
          <Box className="p-4 bg-gray-100 w-full transition-all duration-300 ease-in-out">
            <Typography variant="h6" gutterBottom>
              Pharmacy Operations
            </Typography>
            <TextField
              label="Add Product"
              value={pharmacyInput}
              onChange={(e) => setPharmacyInput(e.target.value)}
              className="my-2"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOperationClick("pharmacy", "Add Product", pharmacyInput)}
            >
              Add Product
            </Button>
            <TextField
              label="Add Product to Pharmacy with Stock"
              value={pharmacyInput}
              onChange={(e) => setPharmacyInput(e.target.value)}
              className="my-2"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOperationClick("pharmacy", "Add Product with Stock", pharmacyInput)}
            >
              Add Product with Stock
            </Button>
            <TextField
              label="Edit Product"
              value={pharmacyInput}
              onChange={(e) => setPharmacyInput(e.target.value)}
              className="my-2"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOperationClick("pharmacy", "Edit Product", pharmacyInput)}
            >
              Edit Product
            </Button>
            <TextField
              label="Update Stock"
              value={pharmacyInput}
              onChange={(e) => setPharmacyInput(e.target.value)}
              className="my-2"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOperationClick("pharmacy", "Update Stock", pharmacyInput)}
            >
              Update Stock
            </Button>
            <TextField
              label="Get All Products"
              value={pharmacyInput}
              onChange={(e) => setPharmacyInput(e.target.value)}
              className="my-2"
              fullWidth
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleOperationClick("pharmacy", "Get All Products", pharmacyInput)}
            >
              Get All Products
            </Button>
            {notifications.pharmacy && (
              <Typography variant="body1" gutterBottom>
                Notification: {notifications.pharmacy}
              </Typography>
            )}
          </Box>
        )}

        {/* Doctor Category */}
        <div
          className={`flex flex-row items-center p-4 cursor-pointer bg-customDoctor transition-all w-full duration-300 ease-in-out ${
            expandedCategory === "doctor" ? "h-auto" : "h-16"
          }`}
          onClick={() => handleCategoryClick("doctor")}
        >
          <div>
            <FaUserDoctor />
          </div>
          <div className="ml-2">Doctor</div>
        </div>
        {expandedCategory === "doctor" && (
          <Box className="p-4 bg-gray-100 w-full transition-all duration-300 ease-in-out">
            <Typography variant="h6" gutterBottom>
              Doctor Operations
            </Typography>
            <TextField
              label="Create Doctor"
              value={doctorInput}
              onChange={(e) => setDoctorInput(e.target.value)}
              className="my-2"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOperationClick("doctor", "Create Doctor", doctorInput)}
            >
              Create Doctor
            </Button>
            <TextField
              label="Get All Doctors"
              value={doctorInput}
              onChange={(e) => setDoctorInput(e.target.value)}
              className="my-2"
              fullWidth
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleOperationClick("doctor", "Get All Doctors", doctorInput)}
            >
              Get All Doctors
            </Button>
            <TextField
              label="Get Doctor by ID"
              value={doctorInput}
              onChange={(e) => setDoctorInput(e.target.value)}
              className="my-2"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOperationClick("doctor", "Get Doctor by ID", doctorInput)}
            >
              Get Doctor by ID
            </Button>
            <TextField
              label="Update Doctor"
              value={doctorInput}
              onChange={(e) => setDoctorInput(e.target.value)}
              className="my-2"
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOperationClick("doctor", "Update Doctor", doctorInput)}
            >
              Update Doctor
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleOperationClick("doctor", "Delete Doctor", doctorInput)}
            >
              Delete Doctor
            </Button>
            {notifications.doctor && (
              <Typography variant="body1" gutterBottom>
                Notification: {notifications.doctor}
              </Typography>
            )}
          </Box>
        )}
      </div>
    </div>
  );
}
