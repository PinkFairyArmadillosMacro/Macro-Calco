const models = require("../models/models");
const User = models.User;
const userController = {};


userController.createUser = async (req, res, next) => {
  console.log('this is req.body on signup post request', req.body);
  const { username, password, calorieGoal, proteinGoal, carbGoal, fatGoal } = req.body;
  if(await User.exists({ username })) {
    console.log('that user name exists!')
  }
  else{
    const user = await User.create({ username, password, calorieGoal, proteinGoal, carbGoal, fatGoal });
      // if (err) {
      //   return next({message: {err: 'error in createUser!'}});
      // }
      res.locals.user = user;
      return next();
    }
  };
  

  // user request to update macro ratio
  userController.updateMacros = async (req, res, next) => {
    const { username, calorieGoal, proteinGoal, carbGoal, fatGoal} = req.body;
      await User.updateOne({ username }, { calorieGoal, proteinGoal, carbGoal, fatGoal }, (err, user) => {
        if (err) {
          return next({message: {err: 'error in updateMacros!'}});
        }
        return next();
      })
  }

  userController.verifyUser = async (req, res, next) => {
    try {
      console.log('this is verify user', req.body);
      const { username, password } = req.body;
      // `findOne` returns a document/model instances, while
      // `find` returns a query object, which has no access to the methods
      const result = await User.findOne({ username: username }).exec();
      // If the username does not exist, `findOne` returns `null`
      if (result === null){
        res.locals.isLogged = false;
        return next();
      };
      res.cookie('username', username);
      res.locals.isLogged = true;
      // const isMatch = await result.comparePassword(password);
      // This URL is an absolute URL that starts from the root of the domain
      // which is what we want
      return next();
      // return isMatch ? next() : res.redirect("/signup");
    } catch (error) {
      return next(error);
    }
  };


// /**
//  * getAllUsers - retrieve all users from the database and stores it into res.locals
//  * before moving on to next middleware.
//  */
// userController.getAllUsers = (req, res, next) => {
//   User.find({}, (err, users) => {
//     // if a database error occurs, call next with the error message passed in
//     // for the express global error handler to catch
//     if (err)
//       return next(
//         "Error in userController.getAllUsers: " + JSON.stringify(err)
//       );

//     // store retrieved users into res.locals and move on to next middleware
//     res.locals.users = users;
//     return next();
//   });
// };


module.exports = userController;
