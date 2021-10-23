import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        p: 5,
        gap: 5,
        borderTop: '1px solid #3d3d3d',
      }}
    >
      <Box>
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
        <Link
          to='/'
          style={{
            fontSize: '20px',
            padding: '10px',
            textDecoration: 'none',
            color: '#e40754',
          }}
        >
          Home
        </Link>
        <Link
          to='/'
          style={{
            fontSize: '20px',
            padding: '10px',
            textDecoration: 'none',
            color: '#e40754',
          }}
        >
          Recipes
        </Link>
      </Box>
      <Box sx={{ display: 'flex', gap: 5 }}>
        <TwitterIcon sx={{ color: '#e40754' }} />
        <FacebookIcon sx={{ color: '#e40754' }} />
        <InstagramIcon sx={{ color: '#e40754' }} />
      </Box>
    </Box>
  );
};

export default Footer;
