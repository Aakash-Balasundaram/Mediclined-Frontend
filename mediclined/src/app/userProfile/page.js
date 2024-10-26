"use client"

import Head from "../header";
import { useState, useEffect, useRef } from 'react';
import { 
  Box,
  Container,
  Stack,
  Typography, 
  List,
  ListItem,
  ListItemText,
  Paper,
  Button
} from '@mui/material';
import Chart from 'chart.js/auto';

export default function Profile() {
  // Refs to store chart instances
  const heartRateChartRef = useRef(null);
  const bpChartRef = useRef(null);
  const o2ChartRef = useRef(null);

  const [vitalSigns] = useState({
    heartRate: [72, 75, 71, 73, 70, 74, 76, 73, 71, 72],
    bloodPressure: {
      systolic: [120, 122, 119, 121, 118, 123, 120, 122, 119, 121],
      diastolic: [80, 82, 79, 81, 78, 83, 80, 82, 79, 81]
    },
    oxygenLevel: [98, 97, 98, 99, 97, 98, 97, 98, 99, 98]
  });

  const userData = {
    name: "John Doe",
    rollNumber: "R12345",
    age: 19,
    bloodGroup: "O+",
    gender: "Male",
    email: "john.doe@example.com",
    address: "123 Health Street, Medical City, MC 12345"
  };

  const medicalHistory = [
    { date: "2024-01-15", diagnosis: "Regular Checkup", prescription: "Vitamins" },
    { date: "2024-02-20", diagnosis: "Flu", prescription: "Antibiotics" },
    { date: "2024-03-10", diagnosis: "Follow-up", prescription: "None" },
    { date: "2024-04-05", diagnosis: "Allergy", prescription: "Antihistamines" },
    { date: "2024-05-12", diagnosis: "Cold", prescription: "Rest and Hydration" }
  ];

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const createHeartRateChart = () => {
      const ctx = document.getElementById('heartRateChart');
      if (ctx) {
        if (heartRateChartRef.current) {
          heartRateChartRef.current.destroy();
        }
        heartRateChartRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            datasets: [{
              label: 'Heart Rate (BPM)',
              data: vitalSigns.heartRate,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Heart Rate Trend'
              }
            }
          }
        });
      }
    };

    const createBPChart = () => {
      const ctx = document.getElementById('bpChart');
      if (ctx) {
        if (bpChartRef.current) {
          bpChartRef.current.destroy();
        }
        bpChartRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            datasets: [
              {
                label: 'Systolic',
                data: vitalSigns.bloodPressure.systolic,
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.1
              },
              {
                label: 'Diastolic',
                data: vitalSigns.bloodPressure.diastolic,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Blood Pressure Trend'
              }
            }
          }
        });
      }
    };

    const createO2Chart = () => {
      const ctx = document.getElementById('o2Chart');
      if (ctx) {
        if (o2ChartRef.current) {
          o2ChartRef.current.destroy();
        }
        o2ChartRef.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            datasets: [{
              label: 'Oxygen Level (%)',
              data: vitalSigns.oxygenLevel,
              borderColor: 'rgb(153, 102, 255)',
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Oxygen Level Trend'
              }
            }
          }
        });
      }
    };

    createHeartRateChart();
    createBPChart();
    createO2Chart();

    return () => {
      if (heartRateChartRef.current) heartRateChartRef.current.destroy();
      if (bpChartRef.current) bpChartRef.current.destroy();
      if (o2ChartRef.current) o2ChartRef.current.destroy();
    };
  }, [vitalSigns]);

  // Handler for toggling medical history view
  const toggleHistoryView = () => {
    setShowAll(prev => !prev);
  };

  return (
    <Box component="main" className="min-h-screen bg-gray-100 py-3">
        <div>
            <Head />
        </div>

      <Container maxWidth="xl">
        <Box component="header" className="mb-2">
        </Box>

        <Stack spacing={4} component="section">
          <Box className="flex flex-col md:flex-row gap-4" component="section">
            {/* General Details Section */}
            <Paper elevation={3} className="flex-1 p-6">
              <Typography variant="h6" component="h2" className="mb-4 text-gray-700 font-semibold">
                General Details
              </Typography>
              <Stack spacing={3} component="dl">
                {Object.entries(userData).map(([key, value]) => (
                  <Box key={key} component="div" className="flex items-center">
                    <Box component="dt" className="w-1/3 text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </Box>
                    <Box component="dd" className="w-2/3 text-gray-800 font-medium m-0">
                      {value}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Medical History Section */}
            <Paper elevation={3} className="flex-1 p-6">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" component="h2" className="mb-2 text-gray-700 font-semibold">
                  Medical History & Prescriptions
                </Typography>
                <Button
                  variant="contained"
                  color={showAll ? "secondary" : "primary"}
                  onClick={toggleHistoryView}
                >
                  {showAll ? 'Show Less' : 'Show All'}
                </Button>
              </Box>
              <List className="divide-y divide-gray-200">
                {(showAll ? medicalHistory : medicalHistory.slice(-3)).map((record, index) => (
                  <ListItem key={index} component="div" className="py-3">
                    <ListItemText
                      primary={record.diagnosis}
                      secondary={
                        <Box component="div">
                          <Typography variant="body2" component="div" className="text-gray-600">
                            Date: {record.date}
                          </Typography>
                          <Typography variant="body2" component="div" className="text-gray-600">
                            Prescription: {record.prescription}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>

          {/* Critical Data Section */}
          <Paper elevation={3} className="p-6">
            <Typography variant="h6" component="h2" className="mb-4 text-gray-700 font-semibold">
              Vital Signs
            </Typography>
            <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Box className="w-full h-64">
                <canvas id="heartRateChart" />
              </Box>
              <Box className="w-full h-64">
                <canvas id="bpChart" />
              </Box>
              <Box className="w-full h-64">
                <canvas id="o2Chart" />
              </Box>
            </Box>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
