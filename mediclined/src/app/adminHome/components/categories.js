import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
} from "@mui/material";

import Doctor from "./doctorComponent";
import Clinic from "./clinicComponent";

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
        {selectedTab === "clinic" && <Clinic />}
        {/* Other components (Student, Pharmacy, Clinic) can be included here */}
      </Box>
    </Box>
  );
};


export default MyComponent;
