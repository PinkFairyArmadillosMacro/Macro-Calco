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
        <p> Total Macros: </p>
        <div className="collection-total-macros">
          <div className="recipe-collection-table">
            <div className="recipe-collection-table-row">
              <p>Serving Size</p>
              <p>1</p>
            </div>
            <div className="recipe-collection-table-row">
              <p>Carbs</p>
              <p>{props.collection.totalMacros.carbs}g</p>
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
        <p> Total Recipes: {collection.totalRecipes} </p>
      </div>
      {recipeCollectionItems}
    </div>
  );
};

export default RecipeCollection;
