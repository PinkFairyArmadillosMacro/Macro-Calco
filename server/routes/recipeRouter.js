const express = require('express');
const router = express.Router();

const { saveRecipes, sortRecipes, deleteRecipe } = require('../controllers/recipeController');

// DONE???
// for finding random recipes upon first loading find recipes page
router.post('/find', saveRecipes, /* sortRecipes,*/ (req, res) => {
  return res.status(200).json(res.locals.recipesToSend);
})

// TODO
// for deleting recipes in home on each saved collection
router.delete('/:id', deleteRecipe, (req, res) => {
  return res.status(200).send("recipe deleted successfully!");
})

module.exports = router;