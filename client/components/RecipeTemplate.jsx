import React from 'react';
import { useState, useEffect } from 'react';
import MyPieChart from './PieChart.jsx';

const RecipeTemplate = (props) => {
  // console.log('Recipe Template Props', props);
  const {name, noOfServings, cal, protein, carbs, fat, imageURL} = props.recipeInfo;
  const {setCurrentCollection, currentCollection} = props;
  const {totalMacros, totalRecipes, recipes} = props.currentCollection
  const [desiredServings, setDesiredServings] = useState(noOfServings);

  //we have setCurrentCollection and currentCollection from props

  const desiredChange = (e) => {setDesiredServings(e.target.value) }

  const handleClick = (e) =>{
    setCurrentCollection({
      totalMacros:{
        carbs: totalMacros.carbs + (Math.floor(carbs/noOfServings)* desiredServings),
        fat: totalMacros.fat +  (Math.floor(fat/noOfServings)* desiredServings),
        protein: totalMacros.protein +  (Math.floor(protein/noOfServings)* desiredServings),
        cals: totalMacros.cals +  (Math.floor(cal/noOfServings)* desiredServings)
      },
      totalRecipes: totalRecipes + 1,
      recipes: recipes.concat({name, noOfServings:desiredServings, cal: (Math.floor(cal/noOfServings)* desiredServings), protein: (Math.floor(protein/noOfServings)* desiredServings), carbs:(Math.floor(carbs/noOfServings)* desiredServings), fat: (Math.floor(fat/noOfServings)* desiredServings)})
    })
    console.log(currentCollection)
  }

  const deleteRecipe = () => {};

  const redirectToInfoPage = () => {};

  return (
    <div className="recipe-template-container">
      <h2 id='recipe-template-title'>{name}</h2>
      <img alt='IMAGE' className="recipe-image" onClick={redirectToInfoPage} height='200' width='200' src="https://edamam-product-images.s3.amazonaws.com/web-img/041/04158b5869398c899942336274f0e0f7-m.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFMaCXVzLWVhc3QtMSJIMEYCIQD8yTzcZWvHgGrqe8QxAqPgo8GHx4xUcp9fkvvagCeDlQIhAOgpPIyVXmD7y2DDoIXk%2BQNQz9s4pObGbQa0bWKRmxZiKsIFCPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMMTg3MDE3MTUwOTg2Igzwil2Pd94%2F93aVlp4qlgUWFJXcDWBNIeWNdx9OWZP%2Bnwspgdx6fQSq0%2FzHEjdwnKGp%2Boqr6GqXlVJiMhA6to5unr3F85qTCLq3noKj26RnWg99JzB4RxoijmB8CAGvE%2FFg9RqoQOd7wCIzfoQWHz47yjweuZ%2BQTN88DdcNJbr2i04DwV3RGLIiYTrkPyu6y8L012Ynrh4MgOCW2zgU5wmdZRXybxmLSGrXowPgdhz8yLZl6L9%2BH6BRnN23MWCTEKurg4hjQeW3Du8vMkYlYIzI9ImssDKezr4R9mwvObLckysNMwgw4fdcw8ybWLXZwK%2F8Akr1Sno0B7fzFH4%2BYmBn24An2mV3cCNUxAOBDb0mvQlPkvTyamB0b%2BfRkuxsOE%2BvuyEuHLFW926Q2VvYXyFODxR%2Fon2M3X3ZG8%2B8u2WrMzi837JQpUrb8kmpLxTq3iBrUvCyMrFoaJGnUS9sIcwSdYOjc6plBKKAM%2BhX4UUqRWLumzyDFg22SPoHIulDJXXiLiZqBQlwqL%2BJbcY2LQ%2FzTmuJO35n3iJ8luSYJNf4eAF87uDJcBINGaKAHZTYOpPHyovPhKIEnV4knJaV36G7qILSPPBuBy0EZnRf9w4vEmPMIVO1JXdNCJZjWP%2BKBAuR7jL7j1G3JFXlNARssgRsYF8w%2FjEVWTjybCCRCsPf23B5W69Z2gGucVITQKQqeRB31d60W5VCPMuSrE5ugV60Y5Cm62Od7WAsnG9xQ%2F83PLL5ZgIppi3kLqTv09iUkYD%2BCY89m0HE5%2B0uB1TAhjp2bKLqZh8C%2FW7oiNbuF5FqYD4uOvtE2NcUOb2isPOkeY2VhO7Q0VLJDN8icsmUXOxcbKs2oQvz2765gooDYWBaW19RUwLkOYw3lEm16ujyWPa5TduhHTDjq5WgBjqwAXACf%2Fo%2F2aN%2BcWmSSBL3SxWi9E%2FTNkDabTpdfAV5hhs3%2BTc7W3nK6DF%2FiNdrA2m2If%2Fy6p%2FWH0E9Wx%2B7gVA9Z15ZFyLS38csCNcRU3ToS7iGUn3%2FP7wcSLfEXoRVCiMX2cELhwB9wc1i0ujoBrJ0hTqTDdAJDJrydNxfj9dwqSvhJTB21s6jxnaDz72Oc2MMTZZw6bUO5189N%2BTKdK22SHbr%2B5wmPOXmSg%2B%2FL14UPqhm&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230306T042301Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFKUE2QJ3P%2F20230306%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=ec0e59b599cebb881f702ca4a3002c1e8d43757d1c18368a1c8afe097e20d260" />

      <div id='template-macros-container'>
        <div id='macros-and-chart-container'>
          <div id="nutrition-facts-container">
            <h1 id="nutrition-facts-title">Nutrition Facts</h1>
            <div id="nutrition-serving-size-container">
              <p>{noOfServings} servings per recipe</p>
              <div id="nutrition-single-serving-title-container">
                <strong><p>Single Serving Size</p></strong>
                <strong><p>100g</p></strong>
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
                  <h2>{Math.floor(cal/noOfServings)}</h2>
                </div>
                <div className="nutrition-facts-label-container single-serv-label">
                  <p className="nutrition-facts-label">{Math.floor(carbs/noOfServings)}g</p>
                  <p className="nutrition-facts-label">{Math.floor(fat/noOfServings)}g</p>
                  <p className="nutrition-facts-label">{Math.floor(protein/noOfServings)}g</p>
                </div>
              </div>
              <div id="nutrition-column-three">
                <div className="nutrition-column-header">
                  <h5>Per Recipe</h5>
                  <h2>{cal}</h2>
                </div>
                <div className="nutrition-facts-label-container recipe-serv-label">
                  <p className="nutrition-facts-label">{carbs}g</p>
                  <p className="nutrition-facts-label">{fat}g</p>
                  <p className="nutrition-facts-label">{protein}g</p>
                </div>
              </div>
            </div>
            <div id="nutrition-health-labels-container">
              <p>*Health Labels: Vegan, Vegetarian, gluten-free, dairy-free, peanut-free, fish-free</p>
              <p>*Diet Labels: high-protein, low carv</p>
            </div>
          </div>
        </div>  
      </div>
      <form id='desired-serving-form'>
        <label id='desired-serving-label'>Desired # of servings (must be less than servings per recipe)</label>
        <input onChange={desiredChange}></input>
      </form>
      <div className="recipe-crud-buttons">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#40513B" className="bi bi-plus-square-fill add-button" viewBox="0 0 16 16" onClick={handleClick}>
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
        </svg>
      </div>

    </div>
  );
};

export default RecipeTemplate;
