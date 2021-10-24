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
        p: 3,
        gap: 5,
        borderTop: '1px solid #3d3d3d',
        alignItems: 'center',
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
            fontFamily: 'Rampart One',
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
        <Link
          to='/'
          style={{
            textDecoration: 'none',
          }}
        >
          <TwitterIcon sx={{ color: '#e40754' }} />
        </Link>
        <Link
          to='/'
          style={{
            textDecoration: 'none',
          }}
        >
          <FacebookIcon sx={{ color: '#e40754' }} />
        </Link>{' '}
        <Link
          to='/'
          style={{
            textDecoration: 'none',
          }}
        >
          <InstagramIcon sx={{ color: '#e40754' }} />
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
