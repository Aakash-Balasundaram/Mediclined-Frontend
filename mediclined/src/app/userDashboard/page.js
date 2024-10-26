import React from 'react';
import { 
  Avatar, 
  Card, 
  TextField, 
  Button,
} from '@mui/material';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

const UserDashboard = () => {
  const medications = [
    {
      name: "Paracetamol",
      dosage: "500mg tablet",
      price: "$5.99"
    },
    {
      name: "Amoxicillin",
      dosage: "250mg capsule",
      price: "$8.99"
    },
    {
      name: "Vitamin D3",
      dosage: "1000 IU",
      price: "$12.99"
    }
  ];

  const doctors = [
    {
      name: "Dr. Robert Smith",
      specialty: "Cardiologist",
      status: "Available",
      initials: "DR"
    },
    {
      name: "Dr. Sarah Johnson",
      specialty: "Dermatologist",
      status: "Busy",
      initials: "DS"
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      status: "Available",
      initials: "DM"
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">My Profile</h2>
          <div className="flex flex-col items-center mb-6">
            <Avatar 
              sx={{ width: 96, height: 96, fontSize: '2.5rem', bgcolor: '#e0e0e0', color: '#666' }}
            >
              JD
            </Avatar>
            <h3 className="text-xl mt-4">John Doe</h3>
            <p className="text-gray-500">Patient ID: #12345</p>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Age', value: '32 years' },
              { label: 'Blood Group', value: 'O+' },
              { label: 'Weight', value: '75 kg' },
              { label: 'Height', value: '175 cm' },
              { label: 'Next Appointment', value: 'Oct 30, 2024' }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Pharmacy Services Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Pharmacy Services</h2>
          
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search medicines..."
            className="mb-6"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {medications.map((med, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg text-center shadow-sm">
                <div className="mx-auto mb-3 flex justify-center">
                  <Avatar 
                    sx={{ 
                      bgcolor: '#f5f5f5',
                      width: 48,
                      height: 48
                    }}
                  >
                    <LocalPharmacyIcon sx={{ color: '#ef4444' }} />
                  </Avatar>
                </div>
                <h3 className="font-medium">{med.name}</h3>
                <p className="text-gray-500 text-sm">{med.dosage}</p>
                <p className="font-bold my-2">{med.price}</p>
                <Button 
                  variant="contained" 
                  fullWidth
                  sx={{
                    bgcolor: '#3b82f6',
                    '&:hover': {
                      bgcolor: '#2563eb'
                    }
                  }}
                >
                  Order Now
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Doctor Availability</h2>
            <div className="space-y-4">
              {doctors.map((doctor, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-4">
                    <Avatar
                      sx={{ 
                        bgcolor: '#e0e0e0',
                        color: '#666',
                        width: 48,
                        height: 48
                      }}
                    >
                      {doctor.initials}
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{doctor.name}</h3>
                      <p className="text-gray-500 text-sm">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      doctor.status === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {doctor.status}
                    </span>
                    <Button 
                      variant="contained"
                      sx={{
                        bgcolor: '#3b82f6',
                        '&:hover': {
                          bgcolor: '#2563eb'
                        }
                      }}
                    >
                      Book
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;