const express = require('express');
const router = express.Router();

const { createUser, verifyUser} = require('../controllers/userController');

router.post('/signup', createUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.post('/login', verifyUser, (req, res) => {
  console.log('test', req.body)
  return res.status(200).json(res.locals.isLogged);
});

// update user's macros based on user id
router.patch('/:id', userController.updateMacros, (req, res) => {
  return res.status(200).send("Macro goal updated successfully!");
})

module.exports = router;