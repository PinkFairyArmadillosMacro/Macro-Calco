import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeTemplate from './RecipeTemplate.jsx';
import RecipeCollectionItem from './RecipeCollectionItem.jsx';

const Home = () => {
    return (
        <div>
          <h1>HOME PAGE</h1>
          <RecipeTemplate />
          <RecipeCollectionItem />
        </div>
    )
}

export default Home;