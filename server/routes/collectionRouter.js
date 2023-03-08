const express = require('express');
const router = express.Router();

const { createCollection, deleteCollection, generateSavedCollection } = require('../controllers/collectionController');

// create a collection and save to database
router.post('/', collectionController.createCollection, (req, res) => {
  return res.status(200).send(res.locals.collection);
});

// get ALL saved collections from user
router.get('/', collectionController.generateSavedCollection, (req, res) => {
  return res.status(200).send('hello')
})

// delete a saved collection from user by id
router.delete('/:id', collectionController.deleteCollection, (req, res) => {
  return res.status(200).send("collection deleted successfully!");
})

module.exports = router;

