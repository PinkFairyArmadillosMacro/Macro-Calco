const models = require('../models/models');
const Recipe = models.Recipe;
const User = models.User;

const recipeController = {};

//MIGHT NEED TO DEBGUG FOR &q= AT THE END
// const baseURL =
//   'https://api.edamam.com/api/recipes/v2?type=public&app_id=df53c42b&app_key=42722d0f8c7171ba43d1b261ca01b673&ingr=1%2B&field=label&field=image&field=shareAs&field=yield&field=dietLabels&field=healthLabels&field=cautions&field=calories&field=totalNutrients&q=';
//str.replaceAll(" ", "%20");

// const baseURL = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=df53c42b&app_key=42722d0f8c7171ba43d1b261ca01b673&ingr=1%2B&field=label&field=image&field=shareAs&field=yield&field=dietLabels&field=healthLabels&field=cautions&field=calories&field=totalNutrients';

// const baseURL =       'https://api.edamam.com/api/recipes/v2?type=public&app_id=61f543c5&app_key=748ddaf3e9a606919a5355ca8b697807&ingr=1%2B&field=label&field=image&field=shareAs&field=yield&field=dietLabels&field=healthLabels&field=cautions&field=calories&field=totalNutrients&q='
const baseURL = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=df53c42b&app_key=42722d0f8c7171ba43d1b261ca01b673&ingr=1%2B&field=label&field=image&field=shareAs&field=yield&field=dietLabels&field=healthLabels&field=cautions&field=calories&field=totalNutrients'
// const errImgURL =     'https://edamam-product-images.s3.amazonaws.com/web-img/02f/02f244dc60783625aa4c7cede53d4cdb.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQDRZ%2BmPkAjjYOYCZZI7%2Bmo6YxwrrSilB2g1kqMLJG0rwAIgNYFKeEur%2BAQcydvq3FKWAv78eFFWqKe7xIYzbyzDUcAquQUIPRAAGgwxODcwMTcxNTA5ODYiDH7XBPahC1VCBgQiHiqWBTvKCNV0DtDe7laVWPTx0xx0fXc6Rb5Tsxwz9gXXJSzw2sIuoLyeC97s99C72vWN0mQBb4%2Fuq6zKXV6DMicYPBkHbRQ94Fw5sXUkuQY9c5y7FkEdfBYDUcx8N3aoUPr2Ck1HpkDKRSEPphyy8gwRxO9nXqUUk%2Fl%2B79eqovPfNVhD71gxDH0LXPPCJtwwGNnfjD%2F%2B6sMzCqSDrduhFiMl6TomSulSbTEmIGvvIZl2dxOpEsoEAuxzn0rCY4OzmDLo%2FZ5csgy1vLvpQQz7lkdCPs8IEt1EyZuSpMNcXzx8JyDwPh2BnVnm8graZ2I6I7akW1YOgRBvDnagd89RHVL%2B0JA1sbiO9DpYOoWnCoO2NItTE%2BKXJJdumHWT5sVSO5L8oaFFNpO1HSZ6te7vjPnNgKUaNYdO3S69hbn%2F4DoaOw9VcFemTGsEwwjitAhJ%2B2kckwLuo6GKNwQWBuBFHCtPLkAFedgImGjIveNG3%2FY5cMYJmPiO8sLDNUqo8%2FY7aCy4ECncMHEx9UHPjedgMuWphVPR8WVbh3Y0azLrPxtDB47LPEStuo4VioX5xlzUrC0CfVhuqsqP0HhPWVhC4Zky0u9Ry%2BfHeRHt5VD305dW1oEILKQLXHm91QuCWzWTqu32vw62oFfrE0lU3ZM15PSfLtfBIO%2FJUevPLwVAkEjDllHfQyVauL6PVqbnh5ZJEsF9NjY6gYA0AJV7vHQa05hK4nv6%2BbWbCN5%2BNaUa%2FLSDIur2xATqrXQ9gWTyXg0mk%2F8Qc6nMwZi%2BPOBlXQzRgvY7iSpwROnIiw4a9%2FvIrHi%2BNIC33Aq3tBu1nXpTElSFEY44W9MBPGQ9nWkCtNNwhfZsiGl9C6M%2FmfFugms1VOLRrQkRii%2BMyDiXMMSEoKAGOrEBjhelLhJ1BkZv2nJVNSLImVUIiFGJ2ixwwBIG7J6cp9Uk98pIKzZO1iJQMdy8v7%2FwiMIYCyY5AjR0FB%2FBUdBKEz3%2FN5x1bUoiXh3QzKQNMwYi5FaFx9DCdZr0vBpG3IdVuXSvokFuPjTTjZCPjnKGyVfDSp4NBUJBB3lF8LSQukiDIkS2lJ2S%2BXbX64FcHVUrx6Z9HL7iHcWKsUpQvR261d7fUcIUNmJNJYc9hwtKdKTb&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230308T043530Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFBARMTORU%2F20230308%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=c69493de49344e35e2913c4e8dd88c63af3b94ed6932cc9e2cd8b19debcc4889';

// const workingImgURL = 'https://edamam-product-images.s3.amazonaws.com/web-img/02f/02f244dc60783625aa4c7cede53d4cdb.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIFcjg34moaqbUkzNp2wAZ6nnirlowaYmK9nLLVORP%2FIAAiEAwsNk6sV6CdEr1m2jA7wgjGAqWBMLdbnWtJuF9WjvULIquAUISxAAGgwxODcwMTcxNTA5ODYiDGXXCVXvr6QinaveuiqVBUeqNxLEzvrE3TdcV%2FaZpoMoqXZrYywik%2FYKwTNVb5PK8JPrOXX1SL%2Fsfa78PFYOm%2F9vJFTJo%2F57cFbjtLu0eMTHku7RPHV0ttyep5hADfgNvbrkpEd0J%2F3OyU1dhfdmzTC3%2Bgf2fsmcWOO5%2BvPtDZB1tC19XK25FOeUVLn%2FjFtpAhJQuI%2ByFN4fOCQpbbg9Yg3zSdUaMMBLRlds5oFRY2of38EXBayB7CPOuY6tA4I3Eqlz5m%2FXa5WVqCJZImDxyezukEck2un2hP3icwVPh%2FsHTTXUHooYYmK5%2FQwo41oUG0FQNO4HpHgYPxrIsVaRVInC7EhaaS6e%2BDWw595uh8iLTLbe1OHL1JYZZK6myrxaT3aVhdSwmiG6giNbXDQ4VSKOgCGH2K%2BhGzRQx4Ku0wtjtt69mgoBtNFfuDSkqdfqDfUDCK3mFD1LcWVKQ8Ru5x9knPQovsE%2BjG%2BlYxpSLAPi%2FISnIMkwwLJbEiHEyeWCA2OlNWOgKGfWw9T45an4Us7ha6x1p22H%2F702U5euEXk1%2FLr5zApXDm3rGNZ3of6D66vCK6P7R2U0iTndcfQBvyYfSX9GLLz%2BU4yZKWcuL159%2F6Yyp2tUeDJjMrHiHJcEevui23yUufkmzRMyjqEERrbpaf2SayxzzMt%2F23vTLR%2F21vvZ%2BQVfufc2OB20AcYhRWN7R%2BWsD8862XpC2B%2FXYLFOk1F1w1hp3sZHdBjjh38oWwVHfh8CAhYXmzyI9ye7BUqP5mNUk3ZXXfhbXQuhfOgJfLzzWvCHcsZg7sPZUq45cgd55mDSWxqjRK6XFFuHqRM3z56CGFV2glJeoxoOGAwXI6%2BolM1vn4bXhYssEs3Deprmm6nbwhAqMQj6W62tGtO2oQww6Y2joAY6sQHnqbgX%2BSF0V7x2h%2F9619dRt7226Sb01UQlOJJtJ9O1WAZn%2Bw6vIBOi%2Fo2v1D4WXsqv0jOGWABX8jx3vdG6LswvjjNSLVCfuwZWNSezE6A1%2F%2Fsgux0Q75KMcdievBVtckeEiFa9A1dCZom%2BQfVztv1oi9I8KuMttgJh42u9LA%2Fowqdt3Uhy4yaiRtDZktV2eMJLecArc6VgqoM%2F2SdEIIOAKmgQMPwp4Rwpiw6QMM8fcK4%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230308T191241Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIASXCYXIIFNOMFUKXA%2F20230308%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=3a793b9e063911772e92aff4013bcbd9f53ab8c439d024be2f7bd03f4cb7cbe3';

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
  const url = baseURL + req.body.queryString; //url going to the fetch
  const response = await fetch(url);
  const jsonResponse = await response.json();
  const recipes = jsonResponse.hits;

  for (const recipeObj of recipes) {
    const { label } = recipeObj.recipe;
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
      } = recipeObj.recipe;
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
  return next();
};

recipeController.sortRecipes = async (req, res, next) => {
  // const username = 'username';

  const username = req.cookies.username;
  const user = await User.findOne({ username });
  console.log('did it get the user', user);
  const userMacros = [
    user.calorieGoal,
    user.fatGoal,
    user.carbsGoal,
    user.proteinGoal,
  ];

  let recipeMacros;
  const recipes = await Recipe.find({}); //returns array of recipe documents
  for (const recipe of recipes) {
    recipeMacros = [recipe.calories, recipe.fat, recipe.carbs, recipe.protein];

    recipe.relevance = calculateRelevance(recipeMacros, userMacros);
    await recipe.save();
  }
  console.log('did it get recipe', 1);
  recipes.sort((a, b) => a.relevance - b.relevance);
  res.locals.recipesToSend = recipes;

  return next();
};

recipeController.deleteRecipe = async (req, res, next) => {};

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
