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
        alignItems: 'center',
        borderTop: '1px solid #e3e3e3',
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
