import React from 'react';
import { useState, useEffect } from 'react';
import RecipeTemplate from './RecipeTemplate.jsx';
import RecipeCollectionItem from './RecipeCollectionItem.jsx';

const RecipeCollection = (props) => {
  const collection = props.collection
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
      />
    )
  })
  return (
    <div className='recipe-collection-container'>
      <div className="collection-totals">
        <p className='collection-totals-label'> Total Macros: </p>
        <div className="collection-total-macros">
        <div className="recipe-collection-table">
            <div className="recipe-collection-table-row">
              <p>Serving Size</p>
              <p>1</p>
            </div>
            <div className="recipe-collection-table-row">
              <p>Carbs</p>
              <p>50g</p>
            </div>
            <div className="recipe-collection-table-row">
              <p>Fat</p>
              <p>50g</p>
            </div>
            <div className="recipe-collection-table-row">
              <p>Protein</p>
              <p>50g</p>
            </div>
            <div className="recipe-collection-table-row">
              <p>kcal</p>
              <p>50</p>
            </div>
          </div>
        </div>
        <p className='collection-totals-label'> Total Recipes: {collection.totalRecipes} </p>
      </div>
      <div className='collection-scroll'>
        {recipeCollectionItems}
      </div>
      <div className="recipe-collection-buttons">
        <button className='recipe-collection-delete-btn'>
          Delete Collection
        </button>
      </div>
    </div>
  );
};

export default RecipeCollection;
