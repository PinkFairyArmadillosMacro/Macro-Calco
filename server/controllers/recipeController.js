const models = require('../models/models');
const Recipe = models.Recipe;
const User = models.User;
const Collection = models.Collection;

const recipeController = {};
const timer = async (ms) => new Promise((res) => setTimeout(res, ms));

const round = (macro) => {
  return macro < 0.5 ? 0 : macro < 1 ? '< 1' : Math.floor(macro);
};

//MIGHT NEED TO DEBGUG FOR &q= AT THE END
//IMAGE EXPIRES IN 60 MINUTES SO REPOPULATE DB BEFORE DEMO
const baseURL =
  'https://api.edamam.com/api/recipes/v2?type=public&app_id=df53c42b&app_key=42722d0f8c7171ba43d1b261ca01b673&ingr=1%2B&field=label&field=image&field=shareAs&field=yield&field=dietLabels&field=healthLabels&field=cautions&field=calories&field=totalNutrients&q=';

const calculateRelevance = (normalized, macroRatio) => {
  //recipesMacros, userMacros = [calories, fat, carb, protein]
  // invoke convert to proportions to get percentages ie -> [2000, .25, .5, .25];
  let relevance =
    Math.abs(normalized[0] - macroRatio[0]) +
    Math.abs(normalized[1] - macroRatio[1]) +
    Math.abs(normalized[2] - macroRatio[2]);
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

  return [fat, carbs, protein];
};

const getRatioArray = (increment) => {
  //increment must be a divisor of 100
  let arr = [];
  let step = 100 / increment;
  for (let a = 0; a <= step; a++) {
    for (let b = 0; b <= step; b++) {
      if (a + b > step) break;
      for (let c = 0; c <= step; c++) {
        if (a + b + c > step) break;
        if (a + b + c === step)
          arr.push([a * increment, b * increment, c * increment]);
      }
    }
  }
  return arr;
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

  for (let numRecipes = 0; numRecipes <= 100; numRecipes += 20) {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    let recipes = jsonResponse.hits;
    for (let i = 0; i < recipes.length; i++) {
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
    await timer(4500);
  }

  let end = performance.now();

  console.log('time it takes to load 1000 recipes', end - ini);

  return next();
};

recipeController.calcRelevance = async (req, res, next) => {
  // const username = 'username';

  // const username = req.cookies.username;
  // const user = await User.findOne({ username });
  // if(user.update){  //need to recalculate relevance
  //   const userMacros = [
  //     user.calorieGoal,
  //     user.fatGoal,
  //     user.carbsGoal,
  //     user.proteinGoal,
  //   ];

  let ini = performance.now();

  let recipeMacros, normalized;
  const relevanceObj = {};
  const ratioArray = getRatioArray(10);
  console.log(ratioArray); //FOR DEBUGGING

  const recipes = await Recipe.find({});

  for (const recipe of recipes) {
    recipeMacros = [recipe.calories, recipe.fat, recipe.carbs, recipe.protein];
    normalized = normalizeRecipe(recipeMacros);
    for (ratio of ratioArray) {
      relevanceObj[ratio] = calculateRelevance(normalized, ratio);
    }
    recipe.relevance = relevanceObj;
    await recipe.save();
  }

  let end = performance.now();
  
  console.log('how long does it take to get relevance for 100 recipes', end-ini)


  return next();
};

recipeController.searchRecipes = async (req, res, next) => {
  const username = req.cookies.username;
  const user = await User.findOne({ username });
  const userMacros = [user.fatGoal, user.carbsGoal, user.proteinGoal];
  console.log('does it reach here for userMacros', userMacros);
  const recipes = await Recipe.find({
    label: { $regex: req.body.queryString, $options: 'i' },
  });
  recipes.sort((a, b) => a.relevance[userMacros] - b.relevance[userMacros]);
  res.locals.recipesToSend = recipes.slice(0, 100);

  return next();
};

recipeController.deleteRecipe = async (req, res, next) => {
  const { recipeId, collectionId } = req.params;
  console.log('recipeId', recipeId);
  console.log('collectionId', collectionId);

  const recipe = await Recipe.findOne({ _id: recipeId });
  const collection = await Collection.findOne({ _id: collectionId });

  const index = collection.recipes
    .map((obj) => obj.recipeId.toHexString())
    .indexOf(recipeId);
  console.log('INDEX:', index);
  // update macros
  const recipeServing = collection.recipes[index].servings;
  console.log('SERVINGS:', recipeServing);
  collection.totalCarbs -= round(
    (recipe.carbs / recipe.yield) * recipeServing
  );
  collection.totalProtein -= round(
    (recipe.protein / recipe.yield) * recipeServing
  );
  collection.totalFat -= round(
    (recipe.fat / recipe.yield) * recipeServing
  );
  collection.totalCalories -= round(
    (recipe.calories / recipe.yield) * recipeServing
  );
  // delete recipe from collection array
  collection.recipes.splice(index, 1);
  // save the collction
  await collection.save();

  res.locals.updatedCollection = collection;
  // console.log('COLLECTION:', collection);
  return next();
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
