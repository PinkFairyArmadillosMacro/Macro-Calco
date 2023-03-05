const models = require("../models/models");
const Recipe = models.Recipe;
const recipeController = {};

recipeController.saveRecipes = async (req, res, next) => {
  // assign recipe to collection

  // destructure recipes array from request body
  const {recipes} = req.body;
  // initialize empty recipeId array on res.locals
  res.locals.recipeIds = [];
  // iterate through all recipes of recipe array

  // define total Carbs, total Fat, and total Prot, total cals;
  res.locals.totals = {carbs: 0, fat: 0, protein: 0, calories: 0}
  for(const recipe of recipes) {
    // check for if recipe is in collection
    // if so, we destructure id from the recipe document and push to recipeID array
    if(await Recipe.exists({label: recipe.label})){
      const { _id, fat ,carbs, protein, calories } = Recipe.findOne({label: recipe.label});  // {"_id": ObjectId(asdjfashdkf)}
        res.locals.recipeIds.push(_id);
        res.locals.totals.carbs += carbs;
        res.locals.totals.fat += fat;
        res.locals.totals.protein += protein;
        res.locals.totals.calories += calories;
      }
    else {
      // grab all properties from each input recipe
      const { label, image, shareAs, yield, dietLabels, healthLabels, cautions, calories, cuisineType, totalTime, totalNutrients } = recipe;
      const { FAT, CHOCDF, PROCNT } = totalNutrients;
      const fat = FAT.quantity;
      const carbs = CHOCDF.quantity;
      const protein = PROCNT.quantity;
        // create recipe document with all properties
      Recipe.create({ label, image, shareAs, yield, dietLabels, healthLabels, cautions, calories, cuisineType, totalTime, fat, carbs, protein }, (err, recipe) => {
        if (err) {
          return next({message: {err: 'error in saveRecipes!'}});
        }
        // push created recipe ID to recipeID array
        res.locals.recipeIds.push(recipe._id); 
      })

      res.locals.totals.carbs += carbs;
      res.locals.totals.fat += fat;
      res.locals.totals.protein += protein;
      res.locals.totals.calories += calories;
    }
  }
  return next();
};

  recipeController.deleteRecipe = (req, req, next) => {

  }


// CHADGPT SAYS
// const Recipe = require('./models/recipe');

// // Iterate through each recipe in the req.body and save them to the database
// for (let recipe of req.body.recipes) {
//   const newRecipe = new Recipe({
//     name: recipe.name,
//     carbs: recipe.carbs,
//     calories: recipe.calories,
//     fats: recipe.fats,
//     proteins: recipe.proteins,
//     ingredients: recipe.ingredients
//   });
//   await newRecipe.save();
// }

module.exports = recipeController;

