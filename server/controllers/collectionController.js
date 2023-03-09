const models = require("../models/models");
const Collection = models.Collection;
const User = models.User;
const collectionController = {};

// const collectionSchema = new Schema({
//   name: { type: String, required: true },
//   totalCarbs: { type: Number, required: true },
//   totalProtein: { type: Number, required: true },
//   totalFat: { type: Number, required: true },
//   totalCalories: { type: Number, required: true },
//   recipes: [{ servings: Number, recipeId: { type: Schema.Types.ObjectId, ref: 'recipe' }}],
// });

collectionController.createCollection = async (req, res, next) => {

  const { recipes, name, totalCalories, totalFat, totalCarbs, totalProtein } = req.body;
  //create collection
  const collection = await Collection.create({ name, totalCarbs, totalProtein, totalFat, totalCalories, recipes });

  //save it to user
  username = req.cookies.username;
  const user = await User.findOne({ username });
  user.collections.push(collection._id);

  await user.save();

  return next();
};

collectionController.deleteCollection = async (req, res, next) => {
  const username = req.cookies.username;
  const { _id } = req.params;
  await Collection.deleteOne({ _id });

  const user = User.findOne({ username });
  const collectionIndex = user.collections.indexOf(_id);
  user.collections.splice(collectionIndex, 1);

  await user.save();

  return next();
};


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