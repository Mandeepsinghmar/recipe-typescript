import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

import { fetchData } from '../utils/fetchData';

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
  } = details;
  return (
    <>
      {details ? (
        <Box sx={{ maxWidth: '1100px', margin: '20px auto', p: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              gap: 5,
              flexWrap: 'wrap',
            }}
          >
            <Box>
              <img
                src={thumbnail_url}
                alt={name}
                style={{
                  maxWidth: '450px',
                  height: '400px',
                  borderRadius: '10px',
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{ fontSize: 40, color: '#edf6f9', fontWeight: '900' }}
              >
                {name}
              </Typography>

              <Typography sx={{ color: '#e40754', fontSize: 20 }}>
                {credits && credits[0]?.name}
              </Typography>

              <Typography
                sx={{
                  fontSize: 25,
                  fontWeight: '600',
                  mt: 3,
                  color: '#edf6f9',
                }}
              >
                {num_servings} Person
              </Typography>
              <Typography sx={{ color: '#e40754' }}>Servings</Typography>
            </Box>
          </Box>
          <Typography
            sx={{ fontSize: 23, color: '#edf6f9', fontWeight: 800, p: 3 }}
          >
            {description}
          </Typography>
          <Box>
            <Typography
              sx={{
                fontSize: 25,
                color: '#edf6f9',
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
                    sx={{ fontSize: 18, fontWeight: 500, color: '#edf6f9' }}
                  >
                    <span> {idx + 1}. </span>
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
              m: 3,
              borderTop: '1px solid #3d3d3d',
            }}
          >
            <Box sx={{ mt: 4, mb: 2 }}>
              <Typography
                sx={{
                  fontSize: 25,
                  color: '#edf6f9',
                  fontWeight: '800',
                  p: 2,
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
                        color: '#edf6f9',
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
                    color: '#edf6f9',
                    fontWeight: '800',
                    p: 2,
                  }}
                >
                  Nutritions
                </Typography>
                <Typography
                  sx={{ fontSize: 18, fontWeight: 500, color: '#edf6f9' }}
                >
                  {nutrition?.calories} Calories
                </Typography>
                <Typography
                  sx={{ fontSize: 18, fontWeight: 500, color: '#edf6f9' }}
                >
                  {nutrition?.carbohydrates}gm Carbo
                </Typography>
                <Typography
                  sx={{ fontSize: 18, fontWeight: 500, color: '#edf6f9' }}
                >
                  {nutrition?.fat}gm Fat
                </Typography>
                <Typography
                  sx={{ fontSize: 18, fontWeight: 500, color: '#edf6f9' }}
                >
                  {nutrition?.fiber}gm fiber
                </Typography>
                <Typography
                  sx={{ fontSize: 18, fontWeight: 500, color: '#edf6f9' }}
                >
                  {nutrition?.protein}gm Protein
                </Typography>
                <Typography
                  sx={{ fontSize: 18, fontWeight: 500, color: '#edf6f9' }}
                >
                  {nutrition?.sugar}gm Sugar
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <CircularProgress sx={{ color: '#e40754' }} />
      )}
    </>
  );
};

export default RecipeDetails;
