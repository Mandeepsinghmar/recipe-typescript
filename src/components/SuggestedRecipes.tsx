import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { fetchData } from '../utils/fetchData';
import RecipeCard from './RecipeCard';
import { IRecipe } from './Home';

interface IProps {
  queryName: string;
  id: string | undefined;
}

const SuggestedRecipes: React.FC<IProps> = ({ queryName, id }) => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    const fetchRecipesData = async () => {
      setLoadingRecipes(true);
      const recipesList = await fetchData(
        `https://tasty.p.rapidapi.com/recipes/list?from=0&size=6&tags=${queryName}`
      );
      setRecipes(recipesList.results);
      setLoadingRecipes(false);
    };

    fetchRecipesData();
  }, [queryName, id]);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'cente',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: 40,
          color: '#2B394E',
          mb: 4,
          borderBottom: '4px solid #e40754',
        }}
      >
        You may also like
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 2,
          alignItems: 'center',
          p: 3,
        }}
      >
        {!loadingRecipes ? (
          recipes.length !== 0 ? (
            recipes.map((recipe: IRecipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                thumbnail_url={recipe.thumbnail_url}
                name={recipe.name}
                credits={recipe.credits}
              />
            ))
          ) : (
            <Typography
              sx={{ fontWeight: 700, fontSize: 26, color: '#edf6f9' }}
            >
              No Recipes Found!
            </Typography>
          )
        ) : (
          <CircularProgress sx={{ color: '#e40754' }} />
        )}
      </Box>
      <Button
        onClick={() => history.push('/')}
        sx={{
          background: '#e40754',
          color: '#edf6f9',
          m: 2,
          p: 1,
          fontWeight: '800',
          fontSize: 20,
        }}
      >
        Go Back To Home
      </Button>
    </Box>
  );
};

export default SuggestedRecipes;
