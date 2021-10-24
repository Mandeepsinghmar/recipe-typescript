import React from 'react';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

import { IRecipe as IProps } from './Home';

const RecipeCard: React.FC<IProps> = ({ thumbnail_url, name, id, credits }) => {
  return (
    <Link to={`/recipe-details/${id}`} style={{ textDecoration: 'none' }}>
      <Card
        className='recipe-card'
        sx={{
          width: 345,
          height: 360,
          background: '#edf6f9',
        }}
      >
        <CardMedia
          component='img'
          height='250'
          image={thumbnail_url}
          alt='green iguana'
          className='recipe-image'
        />
        <CardContent>
          <Typography sx={{ fontSize: 20, fontWeight: 900 }}>{name}</Typography>
          <Typography sx={{ fontSize: 17, fontWeight: 700 }}>
            {credits && credits[0]?.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecipeCard;
