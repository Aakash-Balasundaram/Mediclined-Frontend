import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Modal,
  TextField,
  Divider,
} from "@mui/material";
import { Edit, Refresh } from "@mui/icons-material";
import axios from "axios";
import EmailSender from "./EmailSender";
import { STUDENT_URL } from "@/app/constants";
import secureLocalStorage from "react-secure-storage";

const AdminStudentDashboard = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = secureLocalStorage.getItem("token");
      const response = await axios.get(STUDENT_URL + "/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(response.data.MSG);
      setFilteredStudents(response.data.MSG);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      setFilteredStudents(
        students.filter(
          (student) =>
            student.rollNumber &&
            student.rollNumber
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredStudents(students);
    }
  };

  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setNewPassword("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  const handleUpdatePassword = async () => {
    try {
      const token = secureLocalStorage.getItem("token");
      await axios.put(
        STUDENT_URL + "/password",
        {
          email: selectedStudent.Email,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsModalOpen(false);
      fetchStudents();
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleResetPassword = async (studentEmail) => {
    try {
      const token = secureLocalStorage.getItem("token");
      await axios.put(
        STUDENT_URL + "/resetPassword",
        { email: studentEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchStudents();
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <Box display="flex" flexDirection="row" gap={2}>
      {/* Left Panel for Adding Students */}
      <EmailSender fetchAll={fetchStudents} />

      {/* Right Panel for Displaying Students */}
      <Box
        p={2}
        border={1}
        borderColor="grey.300"
        borderRadius={2}
        flex="2"
        minWidth={400}
      >
        <Typography variant="h6">Student List</Typography>
        <TextField
          label="Search by Roll Number"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          margin="normal"
        />
        <List
          sx={{
            maxHeight: 400, // Limit the height of the list
            overflowY: "auto", // Enable internal scrolling
            border: 1,
            borderColor: "grey.200",
            borderRadius: 1,
            mt: 1,
          }}
        >
          {filteredStudents.map((student) => (
            <React.Fragment key={student.Email}>
              <ListItem
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="update password"
                      onClick={() => handleOpenModal(student)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="reset password"
                      onClick={() => handleResetPassword(student.Email)}
                    >
                      <Refresh />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={student.Email} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Modal for Updating Password */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            minWidth: 300,
          }}
        >
          <Typography variant="h6">Update Password</Typography>
          <TextField
            label="Email"
            value={selectedStudent?.Email || ""}
            fullWidth
            disabled
            margin="normal"
          />
          <TextField
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdatePassword}
            fullWidth
          >
            Update Password
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminStudentDashboard;
