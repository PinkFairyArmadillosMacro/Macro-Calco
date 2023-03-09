import React from 'react';
import { useState, useEffect } from 'react';
import { round  } from './RecipeTemplate.jsx';
const RecipeCollectionItem = (props) => {



  const { collection, setCurrentCollection, location, collectionId} = props;
  const {name, servings, cals, protein, carbs, fat, url, id} = props;
  const noOfServings = props.yield;

  const handleDeleteItem = async(e) => { 
    //if were deleting a recipe from our collection in FindRecipe
    if(location ==='findRecipe'){
      for(let recipeInd in collection.recipes){

        if(collection.recipes[recipeInd]._id === id){
          const newRecipes = collection.recipes;
          newRecipes.splice(recipeInd, 1)
          console.log('Total cals:', cals)
          console.log('Total yield:', noOfServings)
          console.log('Desired servings:', servings)

          console.log((Math.floor((cals/noOfServings) * servings)))
          setCurrentCollection(prevCollection =>  {
            return ({
              ...prevCollection,
              totalCarbs: round(prevCollection.totalCarbs - (carbs / noOfServings) * servings),
              totalFat: round(prevCollection.totalFat- (fat / noOfServings) * servings),
              totalProtein: round(prevCollection.totalProtein - (protein / noOfServings) * servings),
              totalCalories: round(prevCollection.totalCalories - (cals / noOfServings) * servings),
              recipes: newRecipes,
          })
        })
          break;
        }
      }
    }
    if(location === 'home'){
      // TODO: fix if wrong
      let recipeId = id
      await fetch((`/api/recipe/${recipeId}/${collectionId}`), {
        method: 'DELETE'
      })
      // post request
      props.setHasDeleted(prev => !prev);
    }

    
  }

  return (
    <div className='recipe-collection-item-container'>
      <div className="recipe-collection-item-buttons">
        <button onClick={handleDeleteItem} className='recipe-collection-item-delete-btn'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
          </svg>
        </button>
      </div>
      <p>{name}</p>
      <div className="recipe-collection-item">
        <img src={url} alt="Recipe Image" />
        <div className="recipe-collection-item-macros">
          <div className="recipe-collection-item-table">
            <div className="recipe-collection-item-table-row">
              <p>Serving Size</p>
              <p>{servings}</p>
            </div>
            <div className="recipe-collection-item-table-row">
              <p>Carbs</p>
              <p>{round((carbs / noOfServings) * servings)}g</p>
            </div>
            <div className="recipe-collection-item-table-row">
              <p>Fat</p>
              <p>{round((fat / noOfServings) * servings)}g</p>
            </div>
            <div className="recipe-collection-item-table-row">
              <p>Protein</p>
              <p>{round((protein / noOfServings) * servings)}g</p>
            </div>
            <div className="recipe-collection-item-table-row">
              <p>kcal</p>
              <p>{round((cals / noOfServings) * servings)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCollectionItem;