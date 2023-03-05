import React from 'react';
import { useState, useEffect } from 'react';
import MyPieChart from './PieChart.jsx';

const RecipeTemplate = () => {

  const deleteRecipe = () => {};

  const redirectToInfoPage = () => {};

  return (
    <div className="recipe-template">
      <div className="recipe-image" onClick={redirectToInfoPage}>IMAGE</div>
      <div className="recipe-info">
        <p className="recipe-info-name"> Name </p>
        <div className="recipe-info-macros-container">
          <p className="macros-summary"> Macros Summary </p>
          <p className="macros-count-label">Per Recipe</p>
          <p className="macros-count-label">Per Serving</p>

          <p className="serving-macros-title"> SERVING SIZE: </p>
          <p className="macros-count-title"> 5 </p>
          <p className="macros-count-title"> 5 </p>

          <p className="recipe-info-macros-amount"> CARB: </p>
          <p className="recipe-info-macros-count">20</p>
          <p className="recipe-info-macros-count">20</p>

          <p className="recipe-info-macros-amount"> FAT: </p>
          <p className="recipe-info-macros-count">20</p>
          <p className="recipe-info-macros-count">20</p>

          <p className="recipe-info-macros-amount"> PROTEIN: </p>
          <p className="recipe-info-macros-count">20</p>
          <p className="recipe-info-macros-count">20</p>

          <p className="recipe-info-macros-amount"> KCAL: </p>
          <p className="recipe-info-macros-count">20</p>
          <p className="recipe-info-macros-count">20</p>
        </div>
      </div>
      <MyPieChart />
      <div className="recipe-crud-buttons">
        <button className="recipe-delete-btn" onClick={deleteRecipe}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeTemplate;
