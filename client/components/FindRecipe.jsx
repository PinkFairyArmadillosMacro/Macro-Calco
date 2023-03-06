import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCollectionItem from './RecipeCollectionItem.jsx';
import RecipeTemplate from './RecipeTemplate.jsx';
import RecipeCollection from './RecipeCollection.jsx';

const FindRecipe = (props) => {

  // PROPS
  // 
  const [currentCollection, setCurrentCollection] = useState(
    { totalMacros: {
        carbs: 0,
        fat: 0,
        protein: 0,
        cals: 0
      },
      totalRecipes: 0,
      recipes: [
      
      ]
    }
  );
  const dummyRecipes = [
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
    {
      name: 'Eggs and Bacon',
      noOfServings: 2,
      cal:860,
      protein: 50,
      carbs: 18,
      fat: 20,
      imageURL: ''
    },
    {
      name: 'French Toast',
      noOfServings: 2,
      cal:860,
      protein: 50,
      carbs: 18,
      fat: 20,
      imageURL: ''
    },
  ]
  const addToCollection = () => {

  }

  const addToUserCollections = () => {

  }

  const recipeSelection = dummyRecipes.map((recipe) => (
    <RecipeTemplate recipeInfo={recipe} />
  ));

  return (
      <div className='find-recipe-container'>
        <form>
          <input></input>
        </form>
        <div className='recipe-selection'>
          {recipeSelection}
        </div>
        <div className='current-recipe-collection'>
          <RecipeCollection addToUserCollections={addToUserCollections} collection={currentCollection} />  
        </div>
      </div>
  )
}

export default FindRecipe;