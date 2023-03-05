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

// chadGPT SAYS
// const Collection = require('./models/collection');

// // Create a new instance of the Collection model with the collection name
// const newCollection = new Collection({
//   name: req.body.name
// });

// // Iterate through each recipe in the req.body and add a reference to the Recipe instance
// for (let recipe of req.body.recipes) {
//   newCollection.recipes.push(recipe._id);
// }

// // Save the Collection instance to the database
// await newCollection.save();

module.exports = collectionController;
