import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeTemplate from './RecipeTemplate.jsx';
import RecipeCollection from './RecipeCollection.jsx';

const Home = () => {
    return (
        <div>
          <h1>HOME PAGE</h1>
          <RecipeTemplate />
          <RecipeCollection />
        </div>
    )
}

export default Home;