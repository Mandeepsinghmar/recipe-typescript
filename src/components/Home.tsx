import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Icon,
  CircularProgress,
} from '@mui/material';

import Search from './Search';
import { fetchData } from '../utils/fetchData';
import RecipeCard from './RecipeCard';

interface iRecipe {
  id: number;
  thumbnail_url: string;
  name: string;
  credits: {
    name: string;
  }[];
}

const Home: React.FC = () => {
  const [tags, setTags] = useState<any | null>();
  const [recipes, setRecipes] = useState<any | null>([]);
  const [tagName, setTagName] = useState<string>('under_30_minutes');
  const [tagDisplayName, setTagDisplayName] = useState<string>('');
  const [loadingRecipes, setLoadingRecipes] = useState<boolean>(false);
  const [loadingTags, setLoadingTags] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipeTags = async () => {
      setLoadingTags(true);

      const data = await fetchData('https://tasty.p.rapidapi.com/tags/list');
      setTags(data.results);
      setLoadingTags(false);
    };
    fetchRecipeTags();
  }, []);

  useEffect(() => {
    const fetchRecipesData = async () => {
      setLoadingRecipes(true);
      const recipesList = await fetchData(
        `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=${tagName}`
      );
      setRecipes(recipesList.results);
      setLoadingRecipes(false);
    };

    fetchRecipesData();
  }, [tagName]);

  console.log(recipes, tags);

  return (
    <Box>
      <Search
        setRecipesData={setRecipes}
        setLoading={setLoadingRecipes}
        setHeadingName={setTagDisplayName}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: 4,
        }}
      >
        <Typography sx={{ color: '#e40754', fontSize: 25 }}>
          Choose a Category
        </Typography>
        <Typography
          sx={{ fontWeight: 900, fontSize: 40, color: '#edf6f9', mb: 4 }}
        >
          Recipe Categories
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            height: 200,
            overflow: 'auto',
            m: 3,
            p: 2,
          }}
        >
          {!loadingTags ? (
            tags?.map(
              (tag: {
                id: React.Key | null | undefined;
                display_name: string;
                name: string;
              }) => (
                <Box key={tag.id}>
                  <Button
                    variant='outlined'
                    size='small'
                    sx={{
                      borderRadius: 2,
                      fontWeight: 700,
                      color: '#edf6f9',
                    }}
                    onClick={() => {
                      setTagDisplayName(tag.display_name);
                      setTagName(tag.name);
                    }}
                  >
                    {tag.display_name}
                  </Button>
                </Box>
              )
            )
          ) : (
            <CircularProgress sx={{ color: '#e40754' }} />
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            mt: 4,
          }}
        >
          <Typography sx={{ color: '#e40754', fontSize: 25 }}>
            All for you
          </Typography>
          <Typography
            sx={{ fontWeight: 900, fontSize: 40, color: '#edf6f9', mb: 4 }}
          >
            {tagDisplayName || 'Best Recipes'}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            {!loadingRecipes ? (
              recipes?.map((recipe: iRecipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  image={recipe.thumbnail_url}
                  name={recipe.name}
                  credits={recipe.credits}
                />
              ))
            ) : (
              <CircularProgress sx={{ color: '#e40754' }} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
