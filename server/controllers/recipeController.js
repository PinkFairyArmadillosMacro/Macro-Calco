const models = require('../models/models');
const Recipe = models.Recipe;
const User = models.User;
const Collection = models.Collection;

const recipeController = {};

//MIGHT NEED TO DEBGUG FOR &q= AT THE END
//IMAGE EXPIRES IN 60 MINUTES SO REPOPULATE DB BEFORE DEMO
const baseURL = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=df53c42b&app_key=42722d0f8c7171ba43d1b261ca01b673&ingr=1%2B&field=label&field=image&field=shareAs&field=yield&field=dietLabels&field=healthLabels&field=cautions&field=calories&field=totalNutrients&q='


const calculateRelevance = (recipeMacros, userMacros) => {
  //recipesMacros, userMacros = [calories, fat, carb, protein]
  // invoke convert to proportions to get percentages ie -> [2000, .25, .5, .25];
  let normalizedRecipe = normalizeRecipe(recipeMacros);
  let relevance =
    Math.abs(normalizedRecipe[1] - userMacros[1]) +
    Math.abs(normalizedRecipe[2] - userMacros[2]) +
    Math.abs(normalizedRecipe[3] - userMacros[3]);
  //smaller the better, i.e. more relevant
  //console.log('this is relevance', relevance, normalizedRecipe[1], userMacros[1], normalizedRecipe[2], userMacros[2], normalizedRecipe[3], userMacros[3])
  return relevance;
};

const normalizeRecipe = (macros) => {
  let kcal = macros[0];
  //might need to debug to add up to 100
  let fat = ((9 * macros[1]) / kcal).toFixed(2) * 100;
  let carbs = ((4 * macros[2]) / kcal).toFixed(2) * 100;
  let protein = ((4 * macros[3]) / kcal.toFixed(2)) * 100;
  // if (carbs + fat + protein !== 1) {
  //   console.log("went over 100!");
  // }

  return [kcal, fat, carbs, protein];
};

recipeController.saveRecipes = async (req, res, next) => {
  // save recipe to the collection in mongoose
  let url = baseURL + req.body.queryString; //url going to the fetch
  // const response = await fetch(url);
  // const jsonResponse = await response.json();
  // const recipes = jsonResponse.hits;
  // const next = jsonResponse._links.next.href;
  // await fetch(next)
  console.log('this is url', url);
  let ini = performance.now();

  for (let numRecipes = 0; numRecipes <= 200; numRecipes += 20) {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    let recipes = jsonResponse.hits;
    for (let i=0; i<recipes.length; i++) {
      const { label } = recipes[i].recipe;
      // check for if recipe is in collection
      let recipeInDB = await Recipe.exists({ label });
      if (!recipeInDB) {
        // create recipe document if not in database
        const {
          label,
          image,
          shareAs,
          yield,
          dietLabels,
          healthLabels,
          cautions, 
          calories,
          totalNutrients,
        } = recipes[i].recipe;
        const { FAT, CHOCDF, PROCNT } = totalNutrients;
        const fat = FAT.quantity;
        const carbs = CHOCDF.quantity;
        const protein = PROCNT.quantity;
        await Recipe.create({
          label,
          image,
          shareAs,
          yield,
          dietLabels,
          healthLabels,
          cautions,
          calories,
          fat,
          carbs,
          protein,
        });
      }
    }
    url = jsonResponse._links.next.href;
  }

  let end = performance.now();

  console.log('time it takes to load 1000 recipes', end-ini);
  
  return next();
};

recipeController.sortRecipes = async (req, res, next) => {
  // const username = 'username';

  const username = req.cookies.username;
  const user = await User.findOne({ username });
  if(user.update){  //need to recalculate relevance
    const userMacros = [
      user.calorieGoal,
      user.fatGoal,
      user.carbsGoal,
      user.proteinGoal,
    ];
    let recipeMacros;
    const recipes = await Recipe.find({});
    
    for (const recipe of recipes) {
      recipeMacros = [recipe.calories, recipe.fat, recipe.carbs, recipe.protein];
      recipe.relevance = calculateRelevance(recipeMacros, userMacros);
      await recipe.save();
    }

    user.update = false;
    await user.save();
  }

  return next();
};


recipeController.searchRecipes = async (req, res, next) => {
  const recipes = await Recipe.find({ label: { $regex: req.body.queryString, $options: 'i'} });
  recipes.sort((a, b) => a.relevance - b.relevance);
  res.locals.recipesToSend = recipes.slice(0,100);

  return next();
}





recipeController.deleteRecipe = async (req, res, next) => {
  const { recipeId, collectionId } = req.params;
  console.log('recipeId', recipeId)
  console.log('collectionId', collectionId);

  const collection = await Collection.findOne({_id: collectionId});
  const index = collection.recipes.indexOf(recipeId);
  collection.recipes.splice(index,1);
  await collection.save();

  // const currCollection = await Collection.findOneAndDelete( 
  //   { _id : collectionId, 
  //     recipes: { $elemMatch: { _id: recipeId } } 
  //   });
  console.log('CURR COLLECTION:', currCollection);
 };

module.exports = recipeController;

// kcal 2000
// carbs 30 => 150g of carbs
// fat 30 => 67 g of fats
// protein 40 => 200g of proteins

// 3 recipes to Collection

// kcal 1500
// carbs 40 => 150g of carbs
// fat 30 => 50g of fats
// protein 30 => 112.5g of proteins
