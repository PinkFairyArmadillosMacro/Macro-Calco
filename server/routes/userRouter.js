const express = require('express');
const router = express.Router();

const { createUser, verifyUser, updateMacros} = require('../controllers/userController');

// TODO
router.post('/signup', createUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

// TODO
router.post('/login', verifyUser, (req, res) => {
  console.log('test', req.body)
  return res.status(200).json(res.locals.isLogged);
});

// TODO
// update user's macros based on user id
router.patch('/:id', updateMacros, (req, res) => {
  return res.status(200).send("Macro goal updated successfully!");
})

module.exports = router;