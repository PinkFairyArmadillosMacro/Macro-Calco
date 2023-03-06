import React from 'react';
import { useState, useEffect } from 'react';

const RecipeCollectionItem = (props) => {

  const {name, servingSize, cals, protein, carbs, fat, url} = props;
  return (
    <div className="recipe-collection-item">
      <img src="" alt="Recipe Image" />
      <div className="recipe-collection-item-macros">
        <h2>{name}</h2>
        <div className="recipe-collection-item-table">
          <div className="recipe-collection-item-table-row">
            <p>Serving Size</p>
            <p>{servingSize}</p>
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
      <div className="recipe-collection-item-buttons">
        <button className='recipe-collection-item-see-recipe-btn' >See Recipe</button>
        <button className='recipe-collection-item-delete-btn'>Delete</button>
      </div>
    </div>
  );
};

export default RecipeCollectionItem;