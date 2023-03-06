import React from 'react';
import { useState, useEffect } from 'react';
import MyPieChart from './PieChart.jsx';

const RecipeTemplate = (props) => {
  // console.log('Recipe Template Props', props);
  const {name, noOfServings, cal, protein, carbs, fat, imageURL} = props.recipeInfo;

  const deleteRecipe = () => {};

  const redirectToInfoPage = () => {};

  return (
    <div className="recipe-template">
      <img src={imageURL} alt='IMAGE' className="recipe-image" onClick={redirectToInfoPage}  />
      <div className="recipe-info">
        <p className="recipe-info-name"> {name} </p>
        <div className="recipe-info-macros-container">
          <p className="macros-summary"> Macros Summary </p>
          <p className="macros-count-label">Per Recipe</p>
          <p className="macros-count-label">Per Serving</p>

          <p className="serving-macros-title"> SERVING SIZE: </p>
          <p className="macros-count-title"> {noOfServings} </p>
          <p className="macros-count-title"> 1 </p>

          <p className="recipe-info-macros-amount"> CARBS: </p>
          <p className="recipe-info-macros-count"> {carbs} </p>
          <p className="recipe-info-macros-count"> {carbs / noOfServings} </p>

          <p className="recipe-info-macros-amount"> FAT: </p>
          <p className="recipe-info-macros-count"> {fat} </p>
          <p className="recipe-info-macros-count"> {fat / noOfServings} </p>

          <p className="recipe-info-macros-amount"> PROTEIN: </p>
          <p className="recipe-info-macros-count"> {protein} </p>
          <p className="recipe-info-macros-count"> {protein / noOfServings} </p>

          <p className="recipe-info-macros-amount"> KCAL: </p>
          <p className="recipe-info-macros-count"> {cal} </p>
          <p className="recipe-info-macros-count"> {cal / noOfServings} </p>
        </div>
      </div>
      {/* <MyPieChart /> */}
      <div className="recipe-crud-buttons">
        <button className="recipe-delete-btn" onClick={deleteRecipe}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeTemplate;
