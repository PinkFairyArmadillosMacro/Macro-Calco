const models = require('../models/models');
const User = models.User;
const bcrypt = require('bcrypt');
const userController = {};

userController.createUser = async (req, res, next) => {
  console.log('this is req.body on signup post request', req.body);
  const { username, password, calorieGoal, proteinGoal, carbsGoal, fatGoal } =
    req.body;
  res.cookie('username', username);
  if (await User.exists({ username })) {
    console.log('that user name exists!');
  } else {
    const user = await User.create({
      username,
      password,
      calorieGoal,
      proteinGoal,
      carbsGoal,
      fatGoal,
    });
    // if (err) {
    //   return next({message: {err: 'error in createUser!'}});
    // }
    res.locals.user = user;
    return next();
  }
};

userController.verifyUser = async (req, res, next) => {
  try {
    console.log('this is verify user', req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return next('Invalid username or password in userController.verifyUser.');
    }
    // `findOne` returns a document/model instances, while
    // `find` returns a query object, which has no access to the methods
    const user = await User.findOne({ username });
    if (!user) {
      res.locals.isLogged = false;
      return next();
      // return next('User does not exist.')
    }
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
      res.locals.isLogged = false;
      return next();
      // return next('Invalid authentication.');
    } else {
      res.cookie('username', username);
      res.locals.isLogged = true;
    }
    // If the username does not exist, `findOne` returns `null`
    // if (result === null){
    //   res.locals.isLogged = false;
    //   return next();
    // };

    // const isMatch = await result.comparePassword(password);
    // This URL is an absolute URL that starts from the root of the domain
    // which is what we want
    return next();
    // return isMatch ? next() : res.redirect("/signup");
  } catch (error) {
    return next(error);
  }
};

userController.getUser = async (req, res, next) => {
  const username = req.cookies.username;
  const user = await User.findOne({ username }).populate('collections');
  console.log('in get user', user);
  res.locals.user = user;

  return next();
};

// user request to update macro ratio
userController.updateMacros = async (req, res, next) => {
  //console.log('this is req.body', req.body)
  // const { username, calorieGoal, proteinGoal, carbsGoal, fatGoal} = req.body;
  // console.log('prev user', user);
  // const user = await User.updateOne({ username }, { calorieGoal, proteinGoal, carbsGoal, fatGoal });
  // return next();

  // const { calorieGoal, proteinGoal, carbsGoal, fatGoal } = req.body;
  const { username } = req.cookies;
  console.log('name of user', username);
  // console.log('prev user', user);
  const user = await User.findOneAndUpdate({ username: username }, req.body, {
    new: true,
  });

  if (!user) {
    return next('No user to update');
  }

  res.locals.updatedUserMacros = user;
  return next();
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
