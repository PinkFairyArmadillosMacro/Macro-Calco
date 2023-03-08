import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeTemplate from './RecipeTemplate.jsx';
import RecipeCollection from './RecipeCollection.jsx';

const Home = () => {


  const recipeCollections = 
    [
      { 
        name: 'My Collection 1',
        totalCarbs: 50,
        totalFat: 50,
        totalProtein: 140,
        totalCa: 1900,
        totalRecipes: 4,
        recipes:[
          {
            name: 'Chicken Pasta',
            yield: 2,
            servings: 2,
            calories:640,
            protein: 50,
            carbs: 23,
            fat: 20,
            imageURL: ''
          },
          {
            name: 'Caesar Salad',
            yield: 4,
            servings: 2,
            calories:400,
            protein: 40,
            carbs: 9,
            fat: 10,
            imageURL: ''
          },
          {
            name: 'Blueberry Pancakes',
            yield: 5,
            servings: 2,
            calories:860,
            protein: 50,
            carbs: 18,
            fat: 20,
            imageURL: ''
          },
          {
            name: 'Blueberry Pancakes',
            yield: 3,
            servings: 2,
            calories:860,
            protein: 50,
            carbs: 18,
            fat: 20,
            imageURL: ''
          },
        ]
      },
      { 
        name: 'My Collection 2',
        totalCarbs: 50,
        totalFat: 50,
        totalProtein: 140,
        totalCa: 1900,
        totalRecipes: 4,
        recipes:[
          {
            name: 'Chicken Pasta',
            yield: 2,
            servings: 2,
            calories:640,
            protein: 50,
            carbs: 23,
            fat: 20,
            imageURL: ''
          },
          {
            name: 'Caesar Salad',
            yield: 4,
            servings: 2,
            calories:400,
            protein: 40,
            carbs: 9,
            fat: 10,
            imageURL: ''
          },
          {
            name: 'Blueberry Pancakes',
            yield: 5,
            servings: 2,
            calories:860,
            protein: 50,
            carbs: 18,
            fat: 20,
            imageURL: ''
          },
          {
            name: 'Blueberry Pancakes',
            yield: 3,
            servings: 2,
            calories:860,
            protein: 50,
            carbs: 18,
            fat: 20,
            imageURL: ''
          },
        ]
      }
    ]


  const [savedCollections, setSavedCollections] = useState([]);

  useEffect(()=>{
    const getSavedCollections = async () => {
      let response = await fetch('/api/recipe/find')
      response = await response.json();
      setSavedCollections(response);
    }
    getSavedCollections();
  }, [])
  

  const allSavedCollections = savedCollections.map((singleCollection, i) => (
    <RecipeCollection 
      collection={singleCollection}
      location={'home'}
      key = {i}
    />
  ))
    return (
        <div>
          <h1 id='home-page-title'>Saved Collections</h1>
          <div id='collection-containers'>
            {savedCollections.length === 0
            ?
              <p>Add a new collection!</p>
            :
              {allSavedCollections}
            }
          
          </div>
        </div>
    )
}

export default Home;