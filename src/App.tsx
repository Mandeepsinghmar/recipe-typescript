import { Box } from '@mui/material';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import RecipeDetails from './components/RecipeDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Box sx={{ background: '#000814' }}>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/recipe-details/:id' component={RecipeDetails} />
        </Switch>
      </Box>
    </Router>
  );
};

export default App;
