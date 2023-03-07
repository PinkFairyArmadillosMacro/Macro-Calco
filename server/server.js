const express = require("express");
const path = require("path");

const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userController = require("./controllers/userController");
const recipeController = require("./controllers/recipeController");
const collectionController = require("./controllers/collectionController");

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3000;

app.use("/build", express.static(path.join(__dirname, "../build")));
// serve index.html on the route '/'
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/signup", (req, res) => {
  console.log('hello')
  res.sendFile(path.resolve(__dirname, "../client/signup.html"));
});

app.post("/api/login", 
  //userController.verifyUser, 
  (req, res) => {
    console.log('test', req.body)
    res.status(200).json(res.locals.isLogged);
});

app.post("/signup", userController.createUser, (req, res) => {
  res.status(200).json(res.locals.user)
});

app.get("/findRecipes", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/find.html"));
});

app.post("/findRecipes", recipeController.sortRecipes, (req, res) => {
  res.status(200).json(res.locals.recipes);
});

app.post(
  "/collection",
  recipeController.sortRecipes,
  recipeController.saveRecipes,
  collectionController.createCollection,
  (req, res) => {
    res.status(200).send(res.locals.collection);
  }
);

app.get('/collection', collectionController.generateSavedCollection, (req, res) => {
  res.status(200).send('hello')
})

app.delete("/collection", collectionController.deleteCollection, (req, res) => {
  res.status(200).send("collection deleted successfully!");
});

app.delete("/recipe", recipeController.deleteRecipe, (req, res) => {
  res.status(200).send("recipe deleted successfully!");
});

app.patch("/user", userController.updateMacros, (req, res) => {
  res.status(200).send("Macro goal updated successfully!");
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const error = Object.assign({}, defaultErr, err);
  console.log(error.log);

  res.status(error.status).json(error.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

module.exports = app;
