import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCollectionItem from './RecipeCollectionItem.jsx';
import RecipeTemplate from './RecipeTemplate.jsx';
import RecipeCollection from './RecipeCollection.jsx';

const FindRecipe = (props) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [collectionName, setCollectionName] = useState('')
  const [currentCollection, setCurrentCollection] = useState(
    { name: '',
      totalCarbs: 0,
      totalProtein: 0,
      totalFat: 0, 
      totalCalories: 0,
      recipes: []
    }
  );
  const [recipesFromSearch, setRecipesFromSearch] = useState([])
  // const dummyRecipes = [
  //   {
  //     name: 'Chicken Pasta',
  //     noOfServings: 6,
  //     cal:640,
  //     protein: 50,
  //     carbs: 23,
  //     fat: 20,
  //     imageURL: ''
  //   },
  //   {
  //     name: 'Caesar Salad',
  //     noOfServings: 4,
  //     cal:400,
  //     protein: 40,
  //     carbs: 9,
  //     fat: 10,
  //     imageURL: ''
  //   },
  //   {
  //     name: 'Blueberry Pancakes',
  //     noOfServings: 4,
  //     cal:860,
  //     protein: 32,
  //     carbs: 18,
  //     fat: 14,
  //     imageURL: ''
  //   },
  //   {
  //     name: 'Eggs and Bacon',
  //     noOfServings: 2,
  //     cal:1200,
  //     protein: 55,
  //     carbs: 32,
  //     fat: 20,
  //     imageURL: ''
  //   },
  //   {
  //     name: 'French Toast',
  //     noOfServings: 3,
  //     cal:860,
  //     protein: 50,
  //     carbs: 18,
  //     fat: 13,
  //     imageURL: ''
  //   },
  // ]

  // const recipeSchema = new Schema({
  //   label: { type: String, required: true},
  //   servings: { type: Number, required: true},
  //   image: { type: String, required: true},
  //   shareAs: { type: String, required: true},
  //   yield: { type: Number, required: true},
  //   dietLabels: { type: Array, required: true},
  //   healthLabels: { type: Array, required: true},
  //   cautions: { type: Array, required: true},
  //   calories: { type: Number, required: true},
  //   carbs: { type: Number, required: true},
  //   protein: { type: Number, required: true},
  //   fat: { type: Number, required: true}
  // });

  useEffect(() => {
    handleQuerySubmit();
  }, [])

  const onNameChange = (e) => {setCollectionName(e.target.value)}

  const handleQueryChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  }

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    // TODO: SEND GET REQUEST TO BACKEND
    let response = await fetch('/api/findRecipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({q: searchQuery})
    })
    response = await response.json();
    setRecipesFromSearch(response);
  }

  const handleCollectionSubmit = (e) =>{
    e.preventDefault();
    setCurrentCollection({...currentCollection, name: collectionName})
    console.log(currentCollection)
  }

  const recipeSelection = null;
  useEffect(() => {
    recipeSelection = recipesFromSearch.map((recipe, i) => (
      <RecipeTemplate key={i} recipeInfo={recipe} currentCollection={currentCollection} setCurrentCollection={setCurrentCollection}/>
    ));
  }, [recipesFromSearch]);

  return (
      <div className='find-recipe-container'>
        <h1 id='find-recipe-header'>Create a new Collection</h1>
        <div id='refine-search-form-container'>
          <form onSubmit={handleQuerySubmit} className='refine-search-form'>
            <input 
              type='text'
              onChange={handleQueryChange}
              name='recipeSearch'
              value={searchQuery}
              className='find-recipe-search' 
              placeholder='Refine your search by including ingredients or dish names'
            />
            <button className='submit-recipe-search-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            </button>
          </form>
        </div>

        <div id='recipes-and-total-container'>
          <div className='recipe-selection'>
            {recipeSelection}
          </div>
          <div className='current-recipe-collection'>
            <RecipeCollection collection={currentCollection} setCurrentCollection={setCurrentCollection} location='findRecipe'/>  
            <form id='current-recipe-name-form'>
              <p>Enter Collection Name</p>
              <input placeholder='(Ex: My Collection 1)' onChange={onNameChange}></input>
              <button onClick={handleCollectionSubmit}>Add to My Collections</button>
            </form>
          </div>
        </div>

      </div>
  )
}

export default FindRecipe;