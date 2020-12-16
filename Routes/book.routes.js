const express = require('express')
const router = express.Router()
const bookController = require('../Controllers/book.controller');
const book = require('../models/book.model');
// Retrieve all books
router.get('/', bookController.findAll);
// Create a new book
router.post('/add-book', bookController.createBook);
// Retrieve a single book with id
router.get('/read-book/:id', bookController.findById);
// Update a book with id
router.put('/update-book/:id', bookController.update);
// Delete a book with id
router.delete('/delete-book/:id', bookController.delete);
//select by category
router.get('/read-book-category/:cat', bookController.findBycat);
//select lib
router.get('/lib-book/:id', bookController.findLib);
//select Post
router.get('/post-book/:id', bookController.findPost);
// Update a book visible with id
router.put('/update-book-visible/:id', bookController.updateVisible);
// Update a book visible with id
router.put('/update-book-invisible/:id', bookController.updateInvisible);
module.exports = router