const express = require('express');
const router = express.Router();

const { createUser, verifyUser} = require('../controllers/userController');

router.post('/signup', createUser, (req, res) => {
  res.status(200).json(res.locals.user)
});
router.post('/login', verifyUser, (req, res) => {
  console.log('test', req.body)
  res.status(200).json(res.locals.isLogged);
});

module.exports = router;