const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3000;

app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/signup.html'));
});


// app.get('/', cookieController.setCookie, (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/index.html'));
// });



// app.post('/signup',
//   userController.createUser,
//   cookieController.setSSIDCookie,
//   sessionController.startSession,
//   (req, res) => {
//     // what should happen here on successful sign up?
//     res.redirect('/secret');
//   });


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
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: {err: 'An error occurred'}
  };
  const error = Object.assign({},defaultErr, err);
  console.log(error.log);

  res.status(error.status).json(error.message);
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

module.exports = app;