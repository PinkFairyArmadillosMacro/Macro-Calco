import React from 'react';
import { useState, useEffect } from 'react';
import MyPieChart from './PieChart.jsx';

const round = (macro) => {
  return macro < 0.5 ? 0 : macro < 1 ? '< 1' : Math.floor(macro);
};

const RecipeTemplate = (props) => {
  // const {name, cal, protein, carbs, fat, imageURL} = props.recipeInfo;
  const {
    label,
    calories,
    protein,
    carbs,
    fat,
    image,
    healthLabels,
    dietLabels,
    cautions,
    shareAs,
  } = props.recipeInfo;
  const noOfServings = props.recipeInfo.yield;

  const { setCurrentCollection, currentCollection } = props; //
  const { totalCarbs, totalProtein, totalFat, totalCalories, recipes } =
    props.currentCollection;
  const [desiredServings, setDesiredServings] = useState(noOfServings);

  /*
  What we need from backend when listing recipes:
  Recipe name
  image url
  recipe url
  Servings per recipe
    - when we send a recipe to backend, include desired recipes
  cal 
  carbs
  fats 
  protein
  health label
  diet label
  */

  const desiredChange = (e) => {
    setDesiredServings(e.target.value);
  };

  const handleClick = (e) => {
    let newRecipeList = recipes;
    newRecipeList.push({
      label,
      yield: noOfServings,
      servings: desiredServings,
      calories: Math.floor(calories / noOfServings) * desiredServings,
      protein: Math.floor(protein / noOfServings) * desiredServings,
      carbs: Math.floor(carbs / noOfServings) * desiredServings,
      fat: Math.floor(fat / noOfServings) * desiredServings,
      image,
    });
    setCurrentCollection({
      totalCarbs:
        totalCarbs + Math.floor(carbs / noOfServings) * desiredServings,
      totalFat: totalFat + Math.floor(fat / noOfServings) * desiredServings,
      totalProtein:
        totalProtein + Math.floor(protein / noOfServings) * desiredServings,
      totalCalories:
        totalCalories + Math.floor(calories / noOfServings) * desiredServings,
      recipes: newRecipeList,
    });
    console.log(currentCollection);
  };

  const redirectToInfoPage = () => {};

  return (
    <div className="recipe-template-container">
      <h2 id="recipe-template-title">{label}</h2>
      <img
        alt="IMAGE"
        className="recipe-image"
        onClick={() => window.open(shareAs, '_blank')}
        height="200"
        width="200"
        src={image}
      />

      <div id="template-macros-container">
        <div id="macros-and-chart-container">
          <div id="nutrition-facts-container">
            <h1 id="nutrition-facts-title">Nutrition Facts</h1>
            <div id="nutrition-serving-size-container">
              <p>{noOfServings} servings per recipe</p>
              <div id="nutrition-single-serving-title-container">
                <strong>
                  <p>Single Serving Size</p>
                </strong>
                <strong>
                  <p>100g</p>
                </strong>
              </div>
            </div>
            <div id="nutrition-facts-columns-container">
              <div id="nutrition-column-one">
                <div id="nutrition-column-calories-header">
                  <h5> .</h5>
                  <h2>Calories</h2>
                </div>
                <div className="nutrition-facts-label-container">
                  <p className="nutrition-facts-label">Carbs</p>
                  <p className="nutrition-facts-label">Fats</p>
                  <p className="nutrition-facts-label">Protein</p>
                </div>
              </div>
              <div id="nutrition-column-two">
                <div className="nutrition-column-header">
                  <h5>Single Serv</h5>
                  <h2>{Math.floor(calories / noOfServings)}</h2>
                </div>
                <div className="nutrition-facts-label-container single-serv-label">
                  <p className="nutrition-facts-label">
                    {Math.floor(carbs / noOfServings)}g
                  </p>
                  <p className="nutrition-facts-label">
                    {Math.floor(fat / noOfServings)}g
                  </p>
                  <p className="nutrition-facts-label">
                    {Math.floor(protein / noOfServings)}g
                  </p>
                </div>
              </div>
              <div id="nutrition-column-three">
                <div className="nutrition-column-header">
                  <h5>Per Recipe</h5>
                  <h2>{Math.floor(calories)}</h2>
                </div>
                <div className="nutrition-facts-label-container recipe-serv-label">
                  <p className="nutrition-facts-label">{round(carbs)}g</p>
                  <p className="nutrition-facts-label">{round(fat)}g</p>
                  <p className="nutrition-facts-label">{round(protein)}g</p>
                </div>
              </div>
            </div>
            <div id="nutrition-health-labels-container">
              <p>*Health Labels: {healthLabels}</p>
              <p>*Diet Labels: {dietLabels}</p>
            </div>
          </div>
        </div>
      </div>
      <form id="desired-serving-form">
        <label id="desired-serving-label">
          Desired # of servings (must be less than servings per recipe)
        </label>
        <input onChange={desiredChange}></input>
      </form>
      <div className="recipe-crud-buttons">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#40513B"
          className="bi bi-plus-square-fill add-button"
          viewBox="0 0 16 16"
          onClick={handleClick}
        >
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
        </svg>
      </div>
    </div>
  );
};

export default RecipeTemplate;
