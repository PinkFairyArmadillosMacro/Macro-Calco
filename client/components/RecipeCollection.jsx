import React from 'react';
import { useState, useEffect } from 'react';
import RecipeTemplate from './RecipeTemplate.jsx';
import RecipeCollectionItem from './RecipeCollectionItem.jsx';

const RecipeCollection = (props) => {
  
  const { setSavedCollections } = props;
  
  const {collection, setCurrentCollection, location} = props


  const recipeCollectionItems = collection.recipes.map((recipe,i) => { // {servings, recipeId}
    // const {label, calories, protein, carbs, fat, image, _id} = recipe.recipeId;
    let noOfServings = 1;
    if (recipe.noOfServings !== undefined) noOfServings = recipe.noOfServings;
    else{ noOfServings = recipe.yield}
    //console.log('no of servings', noOfServings)
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


      /*
        name: { type: String, required: true },
        totalCarbs: { type: Number, required: true },
        totalProtein: { type: Number, required: true },
        totalFat: { type: Number, required: true },
        totalCalories: { type: Number, required: true },
        recipeIds: [{ type: Schema.Types.ObjectId, ref: 'recipe' }],
      */
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
        <p className='collection-totals-label'> Total Recipes: {collection.recipes.length} </p>
      </div>
      <div className='collection-scroll'>
        {recipeCollectionItems}
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
