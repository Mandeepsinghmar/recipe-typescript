import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, CircularProgress } from '@mui/material';

import Search from './Search';
import { fetchData } from '../utils/fetchData';
import RecipeCard from './RecipeCard';

export interface IRecipe {
  id: number;
  thumbnail_url: string;
  name: string;
  credits: {
    name: string;
  }[];
}

interface ITags {
  id: React.Key | null | undefined;
  display_name: string;
  name: string;
}

const Home: React.FC = () => {
  const [tags, setTags] = useState<ITags[]>([]);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [tagName, setTagName] = useState<string>('under_30_minutes');
  const [tagDisplayName, setTagDisplayName] = useState<string>('');
  const [loadingRecipes, setLoadingRecipes] = useState<boolean>(false);
  const [loadingTags, setLoadingTags] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [numberOfRecipes, setNumberOfRecipes] = useState<number | undefined>(0);

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
        `https://tasty.p.rapidapi.com/recipes/list?from=${
          page * 20 - 20
        }&size=20&tags=${tagName}`
      );
      setNumberOfRecipes(recipesList.count);
      setRecipes(recipesList.results);
      setLoadingRecipes(false);
    };

    fetchRecipesData();
  }, [tagName, page]);

  const totalNumberOfPages = numberOfRecipes && Math.ceil(numberOfRecipes / 20);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            color: '#e40754',
            fontSize: 25,
            mt: 2,
          }}
        >
          Choose Your Favourite
        </Typography>
        <Typography
          sx={{ fontWeight: 900, fontSize: 35, color: '#2B394E', mb: 2, p: 1 }}
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
            tags?.map((tag: ITags) => (
              <Box key={tag.id}>
                <Button
                  variant='outlined'
                  size='small'
                  sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                    color: '#2B394E',
                    borderColor: '#2B394E',
                  }}
                  onClick={() => {
                    setTagDisplayName(tag.display_name);
                    setTagName(tag.name);
                    window.scrollTo(0, 900);
                  }}
                >
                  {tag.display_name}
                </Button>
              </Box>
            ))
          ) : (
            <CircularProgress sx={{ color: '#e40754' }} />
          )}
        </Box>
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
            mt: 4,
          }}
        >
          <Typography sx={{ color: '#e40754', fontSize: 25 }}>
            All for you
          </Typography>
          <Typography
            sx={{ fontWeight: 900, fontSize: 40, color: '#2B394E', mb: 4 }}
          >
            {tagDisplayName || 'Best Recipes'}
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
              recipes?.map((recipe: IRecipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  thumbnail_url={recipe.thumbnail_url}
                  name={recipe.name}
                  credits={recipe.credits}
                />
              ))
            ) : (
              <CircularProgress sx={{ color: '#e40754' }} />
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              m: 4,
            }}
          >
            <Button
              disabled={loadingRecipes || page <= 1}
              onClick={() => setPage(page - 1)}
              sx={{
                background: '#e40754',
                color: '#edf6f9',
                fontWeight: '800',
                fontSize: 15,
              }}
            >
              prev
            </Button>
            <Typography
              sx={{ fontWeight: 900, fontSize: 30, color: '#2B394E' }}
            >
              {page} of {totalNumberOfPages}
            </Typography>
            <Button
              disabled={loadingRecipes || page >= (totalNumberOfPages || 0)}
              onClick={() => setPage(page + 1)}
              sx={{
                background: '#e40754',
                color: '#edf6f9',
                fontWeight: '800',
                fontSize: 15,
              }}
            >
              next
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
