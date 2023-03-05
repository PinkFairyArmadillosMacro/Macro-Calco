import React from 'react';
import { useState, useEffect } from 'react';
import RecipeTemplate from './RecipeTemplate.jsx';
import RecipeCollectionItem from './RecipeCollectionItem.jsx';

const RecipeCollection = () => {

  
  return (
    <div className='recipe-collection-container'>
      <RecipeCollectionItem />
      <RecipeCollectionItem /> 
      <RecipeCollectionItem />
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
              <p>10g</p>
            </div>
            <div className="recipe-collection-table-row">
              <p>Fat</p>
              <p>5g</p>
            </div>
            <div className="recipe-collection-table-row">
              <p>Protein</p>
              <p>20g</p>
            </div>
            <div className="recipe-collection-table-row">
              <p>kcal</p>
              <p>200</p>
            </div>
          </div>
        </div>
        <p> Total Recipes: 3 </p>
      </div>
    </div>
  );
};

export default RecipeCollection;
