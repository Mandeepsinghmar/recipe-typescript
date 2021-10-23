import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          borderBottom: '1px solid #3d3d3d',
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
      {/* 
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          borderBottom: '1px solid #e3e3e3',
        }}
      >
        <Link to='/'>Home</Link>
        <Link to='/'>Recipes</Link>

      </Box> */}
    </Box>
  );
};

export default Navbar;
