'use strict';
const book = require('../models/book.model');
exports.findAll = function (req, res) {
    book.findAll(function (err, book) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', book);
        res.send(book);
    });
};
exports.create = function (req, res) {
    const new_book = new book(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        book.create(new_book, function (err, book) {
            if (err)
                res.send(err);
            res.json({ error: false, message: "book added successfully!", data: book });
        });
    }
};
exports.findById = function (req, res) {
    book.findById(req.params.id, function (err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        book.update(req.params.id, new book(req.body), function (err, book) {
            if (err)
                res.send(err);
            res.json({ error: false, message: 'book successfully updated' });
        });
    }
};



exports.delete = function (req, res) {
    book.delete(req.params.id, function (err, book) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'book successfully deleted' });
    });
};

exports.findBycat = function (req, res) {
    book.findBycat(req.params.cat, function (err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
};


exports.findLib = function (req, res) {
    book.findLib(req.params.id, function (err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
};

exports.findPost = function (req, res) {
    book.findPost(req.params.id, function (err, book) {
        if (err)
            res.send(err);
        res.json(book);
    });
};