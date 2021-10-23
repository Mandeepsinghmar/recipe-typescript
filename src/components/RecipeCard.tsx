import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {
  image: string;
  name: string;
  id: number;
  credits: {
    name: string;
  }[];
}

const RecipeCard: React.FC<Props> = ({ image, name, id, credits }) => {
  const [state, setState] = useState();
  return (
    // <Box sx={{ maxWidth: 345 }}>
    //   <img src={image} style={{ height: '250px', maxWidth: '345px' }} />
    //   <Typography sx={{ fontWeight: 'bold', fontSize: 17 }}>{name}</Typography>
    // </Box>
    <Link to={`/recipe-details/${id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          width: 345,
          height: 360,
          boxShadow: ' 0 3px 10px rgb(0 0 0 / 0.2)',
          border: '',
          background: '#edf6f9',
        }}
      >
        <CardMedia
          component='img'
          height='250'
          image={image}
          alt='green iguana'
        />
        <CardContent>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
            {name}
          </Typography>
          <Typography sx={{ fontSize: 17 }}>
            {credits && credits[0]?.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;
