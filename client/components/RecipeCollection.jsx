import React from 'react';
import { useState, useEffect } from 'react';
import RecipeCollectionItem from './RecipeCollectionItem.jsx';
import DoughnutChart from './DoughnutChart.jsx';

const RecipeCollection = (props) => {
    
  const {collection, setCurrentCollection, location} = props
  const data = [collection.totalCarbs, collection.totalFat, collection.totalProtein];
 // const data =  [{id: 'Protein', nested: {value: collection.totalProtein}}, {id: 'Fat', nested: {value: collection.totalFat}}, {id: 'Carbs', nested: {value: collection.totalCarbs}}];

  const recipeCollectionItems = collection.recipes.map((recipe,i) => { // {servings, recipeId}
    let noOfServings;
    if (recipe.noOfServings !== undefined) noOfServings = recipe.noOfServings;
    else{ noOfServings = recipe.yield}
    return (
      <RecipeCollectionItem
        key = {i}
        name = {recipe.label}
        servings = {recipe.servings}
        yield = {noOfServings}
        cals = {recipe.calories}
        protein = {recipe.protein}
        carbs = {recipe.carbs}
        fat = {recipe.fat}
        url = {recipe.image}
        id = {recipe._id}
        //recipe url needed
        collection = {collection}
        setCurrentCollection = {setCurrentCollection}
        location = {location}
        collectionId = {collection._id}
        setHasDeleted = {props.setHasDeleted}
        />
        )
    }
  )

  const handleClick = async(e) => {
    e.preventDefault();
    const id = collection._id
    
    const response = await fetch(`/api/collection/${id}`,{
      method: 'DELETE'
      }
    );
    if(response.json()){
      console.log('deleted a collection')
      props.setHasDeleted(prev => !prev);
    }
  }

  return (
    <div className='recipe-collection-container'>
      <div className="collection-totals">
        <p className='collection-name'>{collection.name}</p>
        <p className='collection-totals-label'> Total Macros: </p>
        <div className="collection-total-macros">
        <div className="recipe-collection-table">
            <div className="recipe-collection-table-row">
              <p>Carbs</p>
              <p>{collection.totalCarbs}g</p>
            </div>
            <div className="recipe-collection-table-row">
              <p>Fat</p>
              <p>{collection.totalFat}g</p>
            </div>
            <div className="recipe-collection-table-row">
              <p>Protein</p>
              <p>{collection.totalProtein}g</p>
            </div>
            <div className="recipe-collection-table-row">
              <p>kcal</p>
              <p>{collection.totalCalories}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='collection-scroll'>
        {recipeCollectionItems}
      </div>
      <div id='chart-container'>
        <DoughnutChart data = {data}/>
      </div>

      
      <div className="recipe-collection-buttons">
        {location === 'home'
          ?        
          <button onClick={handleClick} className='recipe-collection-delete-btn'>
            Delete Collection
          </button>
          :<></>
        }

      </div>
    </div>
  );
};

export default RecipeCollection;
