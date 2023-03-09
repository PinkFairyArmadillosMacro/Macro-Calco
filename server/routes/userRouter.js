const express = require('express');
const router = express.Router();

const {
  createUser,
  verifyUser,
  updateMacros,
  getUser,
} = require('../controllers/userController');

// TODO
router.post('/signup', createUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

// TODO
router.post('/login', verifyUser, (req, res) => {
  console.log('test', req.body);
  return res.status(200).json(res.locals.isLogged);
});

router.get('/myaccount', getUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

// TODO
// update user's macros based on username
router.patch('/updatemacros', updateMacros, (req, res) => {
  const { calorieGoal, proteinGoal, carbsGoal, fatGoal } =
    res.locals.updatedUserMacros;
  return res.status(200).json({ calorieGoal, proteinGoal, carbsGoal, fatGoal });
});

module.exports = router;
