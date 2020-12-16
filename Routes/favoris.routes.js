const express = require('express')
const router = express.Router()
const favorisController = require('../Controllers/favoris.controller');
const favoris = require('../models/favoris.model');

// Create a new book
router.post('/add-favoris', favorisController.create);
// Retrieve a single book with id
router.get('/read-favoris/:id', favorisController.findById);
// Delete a book with id
router.delete('/delete-favoris/:user/:book', favorisController.delete);

module.exports = router