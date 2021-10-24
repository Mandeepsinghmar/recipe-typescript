import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { useDebounce } from 'use-debounce';

import { fetchData } from '../utils/fetchData';

interface Props {
  setRecipesData: any;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setHeadingName: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<Props> = ({
  setRecipesData,
  setLoading,
  setHeadingName,
}) => {
  const [query, setQuery] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [debouncedValue] = useDebounce(text, 300);

  useEffect(() => {
    if (debouncedValue) {
      setQuery(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    const fetchRecipesData = async (query: string) => {
      setLoading(true);
      const data = await fetchData(
        `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${query}`
      );

      setRecipesData(data.results);
      setLoading(false);
    };

    if (query !== '') {
      setHeadingName('');
      fetchRecipesData(query);
    }
  }, [query, setLoading, setRecipesData, setHeadingName]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)) , url(
        'https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/779e6e46334844f2a1486cb2d7a10118.jpeg'
        )`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: 400,
      }}
    >
      <Typography
        sx={{
          color: '#e40754',
          fontSize: 30,
          mt: 2,
        }}
      >
        Find recipes you can make right now.
      </Typography>
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: 40,
          color: 'white',
          mt: 2,
        }}
      >
        Search Your Favourite Recipes
      </Typography>
      <TextField
        id='outlined-disabled'
        label='Search Reciepes'
        color='info'
        sx={{
          margin: 'auto',
          width: 360,
          marginTop: 3,
          background: 'white',
          border: 'none',
          borderRadius: 1,
          mb: 5,
        }}
        onChange={(
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ): void => setText(e.target.value)}
      />
    </Box>
  );
};

export default Search;
