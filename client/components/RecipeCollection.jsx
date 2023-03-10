import React from 'react';
import { useState, useEffect } from 'react';
import RecipeTemplate from './RecipeTemplate.jsx';
import RecipeCollectionItem from './RecipeCollectionItem.jsx';

const RecipeCollection = (props) => {

  const { deleteRecipeCollection } = props;

  const { setSavedCollections } = props;

  // deleteRecipeCollection 
  
  const {collection, setCurrentCollection, location} = props

  let num = 0;
  const recipeCollectionItems = collection.recipes.map((recipe) => {
    return (
      <RecipeCollectionItem 
        name = {recipe.name}
        servingSize = {recipe.noOfServings}
        cals = {recipe.cal}
        protein = {recipe.protein}
        carbs = {recipe.carbs}
        fat = {recipe.fat}
        url = {recipe.imageURL}
        id = {num++}
        collection = {collection}
        setCurrentCollection = {setCurrentCollection}
        location = {location}
      />
    )
  })
  return (
    <div className='recipe-collection-container'>
      <div className="collection-totals">
        <p className='collection-name'>{collection.name}</p>
        <p className='collection-totals-label'> Total Macros: </p>
        <div className="collection-total-macros">
        <div className="recipe-collection-table">
            <div className="recipe-collection-table-row">
              <p>Carbs</p>
              <p>{collection.totalMacros.carbs}g</p>
            </div>
            <div className="recipe-collection-table-row">
              <p>Fat</p>
              <p>{collection.totalMacros.fat}g</p>
            </div>
            <div className="recipe-collection-table-row">
              <p>Protein</p>
              <p>{collection.totalMacros.protein}g</p>
            </div>
            <div className="recipe-collection-table-row">
              <p>kcal</p>
              <p>{collection.totalMacros.cals}</p>
            </div>
          </div>
        </div>
        <p className='collection-totals-label'> Total Recipes: {collection.totalRecipes} </p>
      </div>
      <div className='collection-scroll'>
        {recipeCollectionItems}
      </div>
      <div className="recipe-collection-buttons">
        <button onClick={() => deleteRecipeCollection(collection.name)} className='recipe-collection-delete-btn'>
          Delete Collection
        </button>
      </div>
    </div>
  );
};

export default RecipeCollection;
