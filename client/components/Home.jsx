import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeTemplate from './RecipeTemplate.jsx';

const Home = () => {
    return (
        <div>
          <h1>HOME PAGE</h1>
          <RecipeTemplate />
        </div>
    )
}

export default Home;