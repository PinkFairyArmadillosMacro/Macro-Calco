import React from 'react';
import { useState, useEffect } from 'react';

const RecipeCollectionItem = (props) => {



  const { deleteRecipeCollectionItem, collection, setCurrentCollection, location, collectionId} = props;
  const {totalMacros} = collection
  const {name, servings, cals, protein, carbs, fat, url, id} = props;
  const noOfServings = props.yield;

  const handleDeleteItem = async(e) => { 
    //if were deleting a recipe from our collection in FindRecipe
    if(location ==='findRecipe'){
      for(let recipeInd in collection.recipes){

        console.log(collection.recipes[recipeInd])
        //console.log((Math.floor((cals/noOfServings) * servings)))
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
              totalCarbs: prevCollection.totalCarbs - carbs,
              totalFat: prevCollection.totalFat - fat,
              totalProtein: prevCollection.totalProtein -  protein,
              totalCalories: prevCollection.totalCalories -  cals,
              recipes: newRecipes,
          })
        })
          //console.log(collection)
          break;
        }
      }
    }
    if(location === 'home'){
      // TODO: fix if wrong
      await fetch(`/api/recipe/collection/?collectionId=${collectionId}&recipeId${id}`)
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
              <p>{carbs}g</p>
            </div>
            <div className="recipe-collection-item-table-row">
              <p>Fat</p>
              <p>{fat}g</p>
            </div>
            <div className="recipe-collection-item-table-row">
              <p>Protein</p>
              <p>{protein}g</p>
            </div>
            <div className="recipe-collection-item-table-row">
              <p>kcal</p>
              <p>{cals}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCollectionItem;