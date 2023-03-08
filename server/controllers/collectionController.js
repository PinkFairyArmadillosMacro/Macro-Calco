const models = require("../models/models");
const Collection = models.Collection;
const collectionController = {};

collectionController.createCollection = async (req, res, next) => {
  const { recipeIds, totals } = res.locals;
  const { fat, carbs, protein, calories } = totals;
  // Create a new instance of the Collection model with the collection name
  const newCollection = new Collection({
    name: req.body.name,
    recipes: [],
    totalFat: fat,
    totalCarbs: carbs,
    totalProtein: protein,
    totalCalories: calories,
  });

  // Iterate through each recipe in the req.body and add a reference to the Recipe instance
  for (let recipeId of recipeIds) {
    newCollection.recipes.push(recipeId);
  }
  // Save the Collection instance to the database
  await newCollection.save();

  return next();
};

collectionController.deleteCollection = (req, res, next) => {
  Collection.deleteOne({ name: req.body.name });
};

collectionController.generateSavedCollection = (req, res, next) => {
  const {username} = res.cookies;
  return next()
}

module.exports = collectionController;









//   //for demo
//   const { recipes } = res.locals;
//   for (const recipe of recipes){
//     recipe.servings = 1;
//   }

//   // initialize empty recipeId array on res.locals
//   res.locals.recipeIds = [];
//   // iterate through all recipes of recipe array

//   // define total Carbs, total Fat, and total Prot, total cals;
//   res.locals.totals = { fat: 0, carbs: 0, protein: 0, calories: 0 };
//   for (const recipe of recipes) {
    
//         // (err, recipe) => {
//         //   if (err) {
//         //     return next({ message: { err: "error in saveRecipes!" } });
//         //   }
//           // push created recipe ID to recipeID array
//           res.locals.recipeIds.push(recipee._id);
//         };
//       res.locals.totals.calories += (servings * calories) / yield;
//       res.locals.totals.fat += (servings * fat) / yield;
//       res.locals.totals.carbs += (servings * carbs) / yield;
//       res.locals.totals.protein += (servings * protein) / yield;
//     }
//     console.log(res.locals);
//     return next();

// };