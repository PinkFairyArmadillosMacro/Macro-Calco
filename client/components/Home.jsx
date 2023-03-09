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
  
  // useEffect(()=>{
  //   //console.log('collections to render', allSavedCollections)
  // },[allSavedCollections])

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