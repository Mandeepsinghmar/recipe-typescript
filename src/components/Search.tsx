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
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)) , url(
          'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/336799.jpg?resize=600:*&output-format=auto&output-quality=auto'
        )`,
        width: '100%',
        height: 400,
      }}
    >
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
          borderRadius: 20,
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
