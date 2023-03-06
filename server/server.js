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
  res.sendFile(path.resolve(__dirname, "../client/signup.html"));
});

app.post(
  "/signup",
  userController.createUser,
  // cookieController.setSSIDCookie,
  // sessionController.startSession,
  (req, res) => {
    // what should happen here on successful sign up?
    res.redirect("/homepage");
  }
);

app.post(
  "/collection",
  recipeController.saveRecipes,
  collectionController.createCollection,
  // cookieController.setSSIDCookie,
  // sessionController.startSession,
  (req, res) => {
    // what should happen here on successful sign up?
    res.redirect("/homepage");
  }
);

app.delete("/collection", collectionController.deleteCollection, (req, res) => {
  res.status(200).send("collection deleted successfully!");
});

app.delete("/recipe", recipeController.deleteRecipe, (req, res) => {
  res.status(200).send("recipe deleted successfully!");
});

app.patch("/macros", userController.updateMacros, (req, res) => {
  res.status(200).send("Macro goal updated successfully!");
});

// app.get('/', cookieController.setCookie, (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/index.html'));
// });

// /**
// * login
// */
// app.post('/login',
//   userController.verifyUser,
//   cookieController.setSSIDCookie,
//   sessionController.startSession,
//   (req, res) => res.redirect('/secret'));

// /**
// * Authorized routes
// */
// app.get('/secret', sessionController.isLoggedIn, (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/secret.html'));
// });

// app.get('/secret/users',
//   sessionController.isLoggedIn,
//   userController.getAllUsers,
//   (req, res) => {res.send({ users: res.locals.users });
// })

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
