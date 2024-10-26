"use client";

// pages/index.js
import { useState } from 'react';
import { Box, Typography } from '@mui/material';

export default function Homies() {
  const [expandedBox, setExpandedBox] = useState(null);

  const handleBoxClick = (boxIndex) => {
    setExpandedBox(boxIndex === expandedBox ? null : boxIndex);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {[1, 2, 3, 4].map((box, index) => (
        <Box
          key={index}
          className={`w-64 p-4 m-4 cursor-pointer transition-all duration-300 ease-in-out bg-white rounded shadow-lg ${
            expandedBox === index ? 'h-auto' : 'h-16 overflow-hidden'
          }`}
          onClick={() => handleBoxClick(index)}
        >
          <Typography variant="h6">Box {index + 1}</Typography>
          {expandedBox === index && (
            <Typography variant="body2" className="mt-2 text-gray-600">
              This is the content inside Box {index + 1}. Click again to collapse.
            </Typography>
          )}
        </Box>
      ))}
    </div>
  );
}
