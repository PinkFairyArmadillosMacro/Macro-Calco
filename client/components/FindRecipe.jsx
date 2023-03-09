import React from 'react';
import { useState, useEffect } from 'react';
import RecipeTemplate from './RecipeTemplate.jsx';
import RecipeCollection from './RecipeCollection.jsx';

const FindRecipe = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [collectionName, setCollectionName] = useState('');
  const [currentCollection, setCurrentCollection] = useState({
    name: '',
    totalCarbs: 0,
    totalProtein: 0,
    totalFat: 0,
    totalCalories: 0,
    recipes: [],
  });
  const [recipesFromSearch, setRecipesFromSearch] = useState([]);
  const [recipeSelection, setRecipeSelection] = useState([]);
  
  useEffect(() => {
    handleQuerySubmit();
  }, []);

  useEffect(() => {
    console.log(currentCollection)
  }, [currentCollection])

  useEffect(() => {
    setRecipeSelection(
      recipesFromSearch.map((recipe, i) => (
        <RecipeTemplate
          key={i}
          recipeInfo={recipe}
          currentCollection={currentCollection}
          setCurrentCollection={setCurrentCollection}
        />
      ))
    );
    console.log('recipesFromSearch use effect ran');
  }, [recipesFromSearch]);

  const onNameChange = (e) => {
    setCollectionName(e.target.value);
  };

  const handleQueryChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const handleQuerySubmit = async (e) => {
    if (e !== undefined) e.preventDefault();
    // TODO: Modify based on backend
    let response = await fetch('/api/recipe/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ queryString: searchQuery }),
    });
    response = await response.json();
    console.log(response[3])
    setRecipesFromSearch(response);
  };

  const handleCollectionSubmit = (e) => {
    e.preventDefault();

    const recipes = [];
    for (let recipe of currentCollection.recipes) {
      const { servings, _id } = recipe;
      const recipeId = _id
      recipes.push({ servings, recipeId });
    }
    const collectionToAdd = {
      ...currentCollection,
      name: collectionName,
      recipes,
    };
    fetch('/api/collection', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collectionToAdd),
    })
  };

  return (
    <div className="find-recipe-container">
      <div id='find-left-side-container'>
        <h1 id="find-recipe-header">Create a new Collection</h1>
        <div id="refine-search-form-container">
          <form onSubmit={handleQuerySubmit} className="refine-search-form">
            <input
              type="text"
              onChange={handleQueryChange}
              name="recipeSearch"
              value={searchQuery}
              className="find-recipe-search"
              placeholder="Refine your search by including ingredients or dish names"
            />
            <button className="submit-recipe-search-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </form>
        <div className="recipe-selection">{recipeSelection}</div>
      </div>
      </div>
      
    
      <div className="current-recipe-collection">
        <div id='current-name-container'>
          <form id="current-recipe-name-form">
            <p>Enter Collection Name</p>
            <input
              id='current-recipe-form-input'
              placeholder="(Ex: My Collection 1)"
              onChange={onNameChange}
            ></input>
            <button onClick={handleCollectionSubmit} id='add-collection-button'>
              Add to My Collections
            </button>
          </form>
        </div>
  
        <RecipeCollection
          collection={currentCollection}
          setCurrentCollection={setCurrentCollection}
          location="findRecipe"
        />

      </div>

    </div>
  );
};

export default FindRecipe;
