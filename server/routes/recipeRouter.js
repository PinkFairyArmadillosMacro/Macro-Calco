const express = require('express');
const router = express.Router();

const {
  saveRecipes,
  sortRecipes,
  searchRecipes,
  deleteRecipe,
} = require('../controllers/recipeController');

// DONE???
// for finding random recipes upon first loading find recipes page
router.post('/find', sortRecipes, searchRecipes, (req, res) => {
  return res.status(200).json(res.locals.recipesToSend);
});

router.post('/find/populate', saveRecipes, (req, res) => {
  return res.status(200).json(res.locals.recipesToSend);
});

// TODO
// for deleting recipes in home on each saved collection
router.delete('/:recipeId/:collectionId', deleteRecipe, (req, res) => {
  return res.status(200).send('recipe deleted successfully!');
});

module.exports = router;
