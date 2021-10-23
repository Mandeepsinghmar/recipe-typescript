import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { TextField, Box } from '@mui/material';

import { fetchData } from '../utils/fetchData';
import { useDebounce } from 'use-debounce';

interface Props {
  setRecipesData: any;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setHeadingName: Dispatch<SetStateAction<string>>;
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
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <TextField
        id='outlined-disabled'
        label='Search Reciepes'
        sx={{
          margin: 'auto',
          width: 400,
          marginTop: 3,
          background: 'white',
          border: 'none',
          borderRadius: 20,
        }}
        onChange={(e) => setText(e.target.value)}
      />
      ;
    </Box>
  );
};

export default Search;
