import React from 'react';
import { Avatar, Card } from '@mui/material';

const getInitials = (name) => {
  const names = name.split(' ');
  const initials = names.map((n) => n.charAt(0)).join('');
  return initials.toUpperCase();
};

const ProfileCard = ({ name, id }) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center mb-6">
        <Avatar
          sx={{
            width: 100,
            height: 100,
            fontSize: '2rem',
            bgcolor: '#1976d2',
            marginBottom: '1rem'
          }}
        >
          {getInitials(name)}
        </Avatar>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">ID: {id}</p>
      </div>
    </Card>
  );
};

export default ProfileCard;
