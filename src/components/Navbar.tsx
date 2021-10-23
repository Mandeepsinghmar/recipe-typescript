import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <Box
      sx={{
        borderBottom: '1px solid #3d3d3d',
        textAlign: 'center',
        p: 2,
      }}
    >
      <Link
        to='/'
        style={{
          fontSize: '30px',
          padding: '10px',
          textDecoration: 'none',
          color: '#e40754',
          fontFamily: 'cursive',
        }}
      >
        🍽 Yummies
      </Link>
    </Box>
  );
};

export default Navbar;
