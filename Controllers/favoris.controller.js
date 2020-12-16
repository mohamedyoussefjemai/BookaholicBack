'use strict';
const favoris = require('../models/favoris.model');

exports.create = function (req, res) {
    const new_favoris = new favoris(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        favoris.create(new_favoris,req.params.image, function (err, favoris) {
            if (err)
                res.send(err);
            res.json({ error: false, message: "book added successfully!", data: favoris });
        });
    }
};
exports.findById = function (req, res) {
    favoris.findById(req.params.id, function (err, favoris) {
        if (err)
            res.send(err);
        res.json(favoris);
    });
};

exports.delete = function (req, res) {
    favoris.delete(req.params.user,req.params.book, function (err, favoris) {
        if (err)
            res.send(err);
        res.json({ error: false, message: 'book successfully deleted' });
    });
};
