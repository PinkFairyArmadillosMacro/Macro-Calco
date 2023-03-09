const express = require('express');
const router = express.Router();

const { createCollection, deleteCollection } = require('../controllers/collectionController');

// TODO
// create a collection and save to database
router.post('/', createCollection, (req, res) => {
  return res.status(200).send(res.locals.collection);
});

// TODO
// get ALL saved collections from user
// router.get('/', generateSavedCollection, (req, res) => {
//   return res.status(200).send('hello')
// })

// TODO
// delete a saved collection from user by id
router.delete('/:id', deleteCollection, (req, res) => {
  return res.status(200).send("collection deleted successfully!");
})

module.exports = router;

