"use client";

// pages/index.js
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../styles/Home.module.css';

export default function Homeies() {
  const [expandedBox, setExpandedBox] = useState(null);

  const handleBoxClick = (boxIndex) => {
    setExpandedBox(boxIndex === expandedBox ? null : boxIndex);
  };

  return (
    <div className={styles.container}>
      {[1, 2, 3, 4].map((box, index) => (
        <Box
          key={index}
          className={`${styles.box} ${expandedBox === index ? styles.expanded : styles.collapsed}`}
          onClick={() => handleBoxClick(index)}
        >
          <Typography variant="h6">Box {index + 1}</Typography>
          {expandedBox === index && (
            <Typography variant="body2" className={styles.content}>
              This is the content inside Box {index + 1}. Click again to collapse.
            </Typography>
          )}
        </Box>
      ))}
    </div>
  );
}
