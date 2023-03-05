const models = require("../models/models");

const userController = {};
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

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = async (req, res, next) => {
  //TODO: hash password
  const { username, password } = req.body
  if(await User.exists({ username })) {
    console.log('that user name exists!')
  }
  else{
    models.User.create({ username, password }, (err, user) => {
      if (err) {
        return next({message: {err: 'error in createUser!'}});
      }
      res.locals.data = user;
      return next();
    })
    };
  }

  userController.assignMacros = (req,res,next) => {
    const {carbs, protein, fats} = req.body;
    
  }

// /**
//  * verifyUser - Obtain username and password from the request body, locate
//  * the appropriate user in the database, and then authenticate the submitted password
//  * against the password stored in the database.
//  */
// userController.verifyUser = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     // `findOne` returns a document/model instances, while
//     // `find` returns a query object, which has no access to the methods
//     const result = await User.findOne({ username: username }).exec();
//     // If the username does not exist, `findOne` returns `null`
//     if (result === null) return res.redirect("/signup");
//     const isMatch = await result.comparePassword(password);
//     // This URL is an absolute URL that starts from the root of the domain
//     // which is what we want
//     return isMatch ? next() : res.redirect("/signup");
//   } catch (error) {
//     return next(error);
//   }
// };

module.exports = userController;
