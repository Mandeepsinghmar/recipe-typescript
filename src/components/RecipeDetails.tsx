import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

import { fetchData } from '../utils/fetchData';
import SuggestedRecipes from './SuggestedRecipes';

interface IParams {
  id: string | undefined;
}

const RecipeDetails: React.FC = () => {
  const { id } = useParams<IParams>();
  const [details, setDetails] = useState<any | null>({});

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const data = await fetchData(
        `https://tasty.p.rapidapi.com/recipes/detail?id=${id}`
      );
      setDetails(data);
    };
    fetchRecipeDetails();
  }, [id]);

  const {
    name,
    thumbnail_url,
    credits,
    num_servings,
    instructions,
    nutrition,
    sections,
    description,
    tags,
  } = details;
  return (
    <>
      {details && Object.keys(details).length ? (
        <Box sx={{ maxWidth: '1200px', margin: '20px auto', p: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              gap: 5,
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <img
                src={thumbnail_url}
                alt={name}
                className='recipe-image'
                style={{
                  maxWidth: '450px',
                  height: '400px',
                  borderRadius: '10px',
                  transition: 'all 0.5s ease-in-out',
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{ fontSize: 40, color: '#2B394E', fontWeight: '900' }}
              >
                {name}
              </Typography>
              <StarIcon sx={{ color: '#e40754' }} />
              <StarIcon sx={{ color: '#e40754' }} />
              <StarIcon sx={{ color: '#e40754' }} />
              <StarIcon sx={{ color: '#e40754' }} />
              <StarIcon sx={{ color: '#e40754' }} />

              <Typography sx={{ color: '#e40754', fontSize: 20 }}>
                {credits && credits[0]?.name}
              </Typography>

              <Typography
                sx={{
                  fontSize: 25,
                  fontWeight: '600',
                  mt: 3,
                  color: '#2B394E',
                }}
              >
                {num_servings} Person
              </Typography>
              <Typography sx={{ color: '#e40754' }}>Servings</Typography>
            </Box>
          </Box>
          <Typography
            sx={{ fontSize: 23, color: '#2B394E', fontWeight: 800, p: 1 }}
          >
            {description}
          </Typography>
          <Box>
            <Typography
              sx={{
                fontSize: 25,
                color: '#2B394E',
                fontWeight: '800',
                mt: 4,
                mb: 2,
              }}
            >
              Preparation
            </Typography>
            <Box>
              {instructions?.map(
                (
                  instruction: { display_text: string | undefined },
                  idx: number
                ) => (
                  <Typography
                    key={idx}
                    sx={{ fontSize: 18, fontWeight: 500, color: '#2B394E' }}
                  >
                    <span style={{ marginRight: '2px', fontWeight: 'bold' }}>
                      {' '}
                      {idx + 1}.{' '}
                    </span>{' '}
                    {instruction.display_text}
                  </Typography>
                )
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              p: 1,
            }}
          >
            <Box sx={{ mt: 4, mb: 2 }}>
              <Typography
                sx={{
                  fontSize: 25,
                  color: '#2B394E',
                  fontWeight: '800',
                }}
              >
                Ingredients
              </Typography>

              {sections &&
                sections[0]?.components?.map(
                  (item: { raw_text: string | undefined }, idx: number) => (
                    <Typography
                      key={idx}
                      sx={{
                        fontSize: 18,
                        fontWeight: 500,
                        color: '#2B394E',
                        p: 1,
                      }}
                    >
                      {item.raw_text}
                    </Typography>
                  )
                )}
            </Box>
            {nutrition && Object.keys(nutrition).length && (
              <Box
                sx={{
                  mt: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 25,
                    color: '#2B394E',
                    fontWeight: '800',
                  }}
                >
                  Nutritions
                </Typography>
                <Typography
                  sx={{ fontSize: 18, fontWeight: 500, color: '#2B394E' }}
                >
                  {nutrition?.calories} Calories
                </Typography>
                <Typography
                  sx={{ fontSize: 18, fontWeight: 500, color: '#2B394E' }}
                >
                  {nutrition?.carbohydrates}gm Carbo
                </Typography>
                <Typography
                  sx={{ fontSize: 18, fontWeight: 500, color: '#2B394E' }}
                >
                  {nutrition?.fat}gm Fat
                </Typography>
                <Typography
                  sx={{ fontSize: 18, fontWeight: 500, color: '#2B394E' }}
                >
                  {nutrition?.fiber}gm fiber
                </Typography>
                <Typography
                  sx={{ fontSize: 18, fontWeight: 500, color: '#2B394E' }}
                >
                  {nutrition?.protein}gm Protein
                </Typography>
                <Typography
                  sx={{ fontSize: 18, fontWeight: 500, color: '#2B394E' }}
                >
                  {nutrition?.sugar}gm Sugar
                </Typography>
              </Box>
            )}
          </Box>
          <Box>
            <SuggestedRecipes queryName={tags && tags[0]?.name} id={id} />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress sx={{ color: '#e40754' }} />
        </Box>
      )}
    </>
  );
};

export default RecipeDetails;
