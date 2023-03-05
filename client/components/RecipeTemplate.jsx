import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecipeTemplate = () => {

  const redirectToInfoPage = () => {

  }

  return (
      <div className='recipe-template'>
        <div className='recipe-image'>
          IMAGE
        </div>
        <div className='recipe-info'>
          <p className='recipe-info-name'> Name </p>
          <div className="recipe-info-macros-container">
            <div className="regular-serving-macros">
              <p className='serving-macros-title'> SERVING SIZE </p>
              <p className='recipe-info-macros-amount'> CARB: </p>
              <p className='recipe-info-macros-amount'> FAT: </p>
              <p className='recipe-info-macros-amount'> PROTEIN: </p>
              <p className='recipe-info-macros-amount'> KCAL: </p>
            </div>
            <div className="single-serving-macros">
            <p className='serving-macros-title'> SERVING SIZE </p>
              <p className='recipe-info-macros-amount'> CARB: </p>
              <p className='recipe-info-macros-amount'> FAT: </p>
              <p className='recipe-info-macros-amount'> PROTEIN: </p>
              <p className='recipe-info-macros-amount'> KCAL: </p>
            </div>
          </div>
        </div>
        <div className="crud-buttons">
          <button className="delete-btn">
            Delete
          </button>
        </div>
      </div>
  )
}

export default RecipeTemplate;