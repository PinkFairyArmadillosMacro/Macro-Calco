import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeTemplate from './RecipeTemplate.jsx';
import RecipeCollection from './RecipeCollection.jsx';

const Home = () => {
  const recipeCollection = 
    {
      totalMacros: {
        carbs: 50,
        fat: 50,
        protein: 140,
        cals: 1900
      },
      totalRecipes: 3,
      recipes:[
        {
          name: 'Chicken Pasta',
          noOfServings: 2,
          cal:640,
          protein: 50,
          carbs: 23,
          fat: 20,
          imageURL: ''
        },
        {
          name: 'Caesar Salad',
          noOfServings: 2,
          cal:400,
          protein: 40,
          carbs: 9,
          fat: 10,
          imageURL: ''
        },
        {
          name: 'Blueberry Pancakes',
          noOfServings: 2,
          cal:860,
          protein: 50,
          carbs: 18,
          fat: 20,
          imageURL: ''
        },
      ]
    }
    return (
        <div>
          <h1>Saved Collections</h1>
          <div id='collection-containers'>

          </div>
          <RecipeCollection collection={recipeCollection}/>
          <RecipeCollection collection={recipeCollection}/>
          <RecipeCollection collection={recipeCollection}/>
          <RecipeCollection collection={recipeCollection}/>

        </div>
    )
}

export default Home;