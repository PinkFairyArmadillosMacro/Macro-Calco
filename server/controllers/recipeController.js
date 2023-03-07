const models = require("../models/models");
const Recipe = models.Recipe;
const User = models.User;

const recipeController = {};

const baseURL = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=667c1c3a&app_key=0b6b0f12f39b034d2c5f749eaa229bbe&diet=balanced&field=label&field=image&field=shareAs&field=yield&field=dietLabels&field=healthLabels&field=cautions&field=calories&field=totalNutrients'

// (q: chicken rice beans)exampleURL: https://api.edamam.com/api/recipes/v2?type=public&q=chicken%20rice%20beans&app_id=667c1c3a&app_key=0b6b0f12f39b034d2c5f749eaa229bbe&diet=balanced&field=label&field=image&field=shareAs&field=yield&field=dietLabels&field=healthLabels&field=cautions&field=calories&field=totalNutrients

// (q: cilantro onions parsley) example URL: https://api.edamam.com/api/recipes/v2?type=public&q=cilantro%20onions%20parsley&app_id=667c1c3a&app_key=0b6b0f12f39b034d2c5f749eaa229bbe&diet=balanced&field=label&field=image&field=shareAs&field=yield&field=dietLabels&field=healthLabels&field=cautions&field=calories&field=totalNutrients

//str.replaceAll(" ", "%20");

const calculateRelevance = (recipeMacros, userMacros) => {
  //recipesMacros, userMacros = [calories, carbs, fat, protein] -> [2000, 125g, 250g, 125g]
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
  let carbs = ((4 * macros[1]) / kcal).toFixed(2)*100;
  let fat = ((9 * macros[2]) / kcal).toFixed(2)*100;
  let protein = (4 * macros[3]) / kcal.toFixed(2)*100;
  // if (carbs + fat + protein !== 1) {
  //   console.log("went over 100!");
  // }

  return [kcal, carbs, fat, protein];
};

recipeController.sortRecipes = async (req, res, next) => {
  const { username, url } = req.body;
  //const username = req.cookies.userCookie; //username as cookies
  const user = await User.findOne({ username });
    // if (err) {
    //   return next({ message: { err: "error in sortRecipes!" } });
    // }
  const userMacros = [
    user.calorieGoal,
    user.carbGoal,
    user.fatGoal,
    user.proteinGoal,
  ];
  console.log('this is user', user)
  //console.log(url);
  const response = await fetch(url);
  const jsonResponse = await response.json();
  //console.log('this is response', jsonResponse)
  //const { query } = req.body;
  //req.body.query = 'chicken rice beans'
  // if (query === "") {
  //   // const response = await fetch(baseURL);np
  //   // const data = await response.json;
  // }

  // const processedQuery = query.replaceAll(" ", "%20");
  // const queriedURL = baseURL + `&q=${processedQuery}`;

  const { hits } = jsonResponse;
  //console.log('this is recipes', hits)
  // for each element in hits array
  // recipe, link
  const recipes = hits;
  for (const recipe of recipes) {
    const { calories, totalNutrients } = recipe.recipe;
    const { CHOCDF, FAT, PROCNT } = totalNutrients;
    const carbs = CHOCDF.quantity;
    const fat = FAT.quantity;
    const protein = PROCNT.quantity;
    let recipeMacros = [calories, carbs, fat, protein];

    recipe.relevance = calculateRelevance(recipeMacros, userMacros);
  }

  recipes.sort((a, b) => a.relevance - b.relevance);
  let count = 1;
  for(const recipe of recipes){  
    console.log(`Recipes ordered by relevance ${count++}.`, recipe.recipe.label, recipe.relevance)
  }
  res.locals.recipes = recipes; // array of recipes sorted based on relevance

  return next();
};

recipeController.saveRecipes = async (req, res, next) => {
  // assign recipe to collection
  // destructure recipes array from request body
  //const { recipes } = req.body;

  //for demo
  const { recipes } = res.locals;
  for (const recipe of recipes){
    recipe.servings = 1;
  }






  // initialize empty recipeId array on res.locals
  res.locals.recipeIds = [];
  // iterate through all recipes of recipe array

  // define total Carbs, total Fat, and total Prot, total cals;
  res.locals.totals = { fat: 0, carbs: 0, protein: 0, calories: 0 };
  for (const recipe of recipes) {
    const { label, servings } = recipe;
    // check for if recipe is in collection
    // if so, we destructure id from the recipe document and push to recipeID array
    if (await Recipe.exists({ label, servings })) {
      const { _id, servings, carbs, fat, protein, calories, yield } =
        await Recipe.findOne({ label, servings }); // {"_id": ObjectId(asdjfashdkf)}

      res.locals.recipeIds.push(_id);
      res.locals.totals.calories += (servings * calories) / yield;
      res.locals.totals.fat += (servings * fat) / yield;
      res.locals.totals.carbs += (servings * carbs) / yield;
      res.locals.totals.protein += (servings * protein) / yield;
    } else {
      // grab all properties from each input recipe
      const {
        label,
        servings,
        image,
        shareAs,
        yield,
        dietLabels,
        healthLabels,
        cautions,
        calories,
        totalNutrients,
      } = recipe.recipe;
      console.log('this is tN', recipe.recipe.label)
      const { FAT, CHOCDF, PROCNT } = totalNutrients;
      const fat = FAT.quantity;
      const carbs = CHOCDF.quantity;
      const protein = PROCNT.quantity;
      // create recipe document with all properties
      const recipee = await Recipe.create(
        {
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
        // (err, recipe) => {
        //   if (err) {
        //     return next({ message: { err: "error in saveRecipes!" } });
        //   }
          // push created recipe ID to recipeID array
          res.locals.recipeIds.push(recipee._id);
        };
      res.locals.totals.calories += (servings * calories) / yield;
      res.locals.totals.fat += (servings * fat) / yield;
      res.locals.totals.carbs += (servings * carbs) / yield;
      res.locals.totals.protein += (servings * protein) / yield;
    }
    console.log(res.locals);
    return next();

};

  


recipeController.deleteRecipe = (req, res, next) => {};

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
