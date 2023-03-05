import React from 'react';
import { useState, useEffect } from 'react';

const RecipeCollectionItem = () => {

  return (
    <div className="recipe-collection-item">
      <img src="" alt="Recipe Image" />
      <div className="recipe-collection-item-macros">
        <h2>Recipe Name</h2>
        <div className="recipe-collection-item-table">
          <div className="recipe-collection-item-table-row">
            <p>Serving Size</p>
            <p>1</p>
          </div>
          <div className="recipe-collection-item-table-row">
            <p>Carbs</p>
            <p>10g</p>
          </div>
          <div className="recipe-collection-item-table-row">
            <p>Fat</p>
            <p>5g</p>
          </div>
          <div className="recipe-collection-item-table-row">
            <p>Protein</p>
            <p>20g</p>
          </div>
          <div className="recipe-collection-item-table-row">
            <p>kcal</p>
            <p>200</p>
          </div>
        </div>
      </div>
      <div className="recipe-collection-item-buttons">
        <button className='recipe-collection-item-see-recipe-btn' >See Recipe</button>
        <button className='recipe-collection-item-delete-btn'>Delete</button>
      </div>
    </div>
  );
};

export default RecipeCollectionItem;