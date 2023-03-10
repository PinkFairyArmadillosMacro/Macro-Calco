import React from 'react';
import { useState, useEffect } from 'react';
import RecipeCollection from './RecipeCollection.jsx';

const Home = () => {

  const [savedCollections, setSavedCollections] = useState([]);
  const [allSavedCollections, setAllSavedCollections] = useState([]);
  const [hasDeleted, setHasDeleted] = useState(false);

  useEffect(()=>{
    const getSavedCollections = async () => {
      let response = await fetch('/api/user/myaccount')
      response = await response.json();
      setSavedCollections(response.collections);
    }
    getSavedCollections();
  }, [hasDeleted])

  useEffect(()=>{
    console.log('save collections', savedCollections)
    setAllSavedCollections(
      savedCollections.map((singleCollection, i) => {
        const {name, totalCarbs, totalProtein, totalFat, totalCalories, _id} = singleCollection
        
        const recipes = [];
        for (let recipe of singleCollection.recipes) {
          const { label, shareAs, image, dietLabels, healthLabels, cautions, calories, carbs, fat, protein, _id} = recipe.recipeId;
          const servings =  recipe.servings
          const noOfServings = recipe.recipeId.yield;
          recipes.push({servings, label, shareAs, image, dietLabels, healthLabels, cautions, calories, carbs, fat, protein, noOfServings, _id})
        }
        const newCollection = {
          name,
          _id,
          totalCarbs,
          totalProtein, 
          totalFat, 
          totalCalories,
          recipes
        }

        return (
          <RecipeCollection 
          collection={newCollection}
          location='home'
          key = {i}
          setHasDeleted = {setHasDeleted}
          />
        )

      }

    ))
  },[savedCollections])
  
    return (
        <div>
          <h1 id='home-page-title'>Saved Collections</h1>
          <div id='collection-containers'>

            {allSavedCollections}
          
          </div>
        </div>
    )
}

export default Home;