'use strict';
const requests = require('../models/requests.model');

exports.create = function (req, res) {
    const new_requests = new requests(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({error: true, message: 'Please provide all required field'});
    } else {
        requests.create(new_requests, function (err, requests) {
            if (err)
                res.send(err);
            res.send({
                message: 'Success',
                status: 200
            });
        });
    }
};

exports.findSendTrade = function (req, res) {
    requests.findSendTrade(req.params.username, function (err, requests) {
        if (err)
            res.send(err);
        res.json(requests);
    });
};

exports.findReceiverTrade = function (req, res) {
    requests.findReceiverTrade(req.params.username, function (err, requests) {
        if (err)
            res.send(err);
        res.json(requests);
    });
};

exports.updateAccept = function (req, res) {
    requests.updateAccept(req.params.id, req.body.usernameReceiver,req.body.usernameSender ,req.body.title,req.body.titlechange, function (err, user) {
        if (err)
            res.send(err);
        res.json({error: false, message: user});
    });

};

exports.updateReject = function (req, res) {
    requests.updateReject(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        res.json({error: false, message: user});
    });

};

exports.findSendSale = function (req, res) {
    requests.findSendSale(req.params.username, function (err, requests) {
        if (err)
            res.send(err);
        res.json(requests);
    });
};

exports.findReceiverSale = function (req, res) {
    requests.findReceiverSale(req.params.username, function (err, requests) {
        if (err)
            res.send(err);
        res.json(requests);
    });
};

exports.updateAcceptSale = function (req, res) {
    requests.updateAcceptSale(req.params.id, req.body.usernameReceiver,req.body.usernameSender ,req.body.titlechange, function (err, user) {
        if (err)
            res.send(err);
        res.json({error: false, message: user});
    });

};

exports.updateRejectSale = function (req, res) {
    requests.updateRejectSale(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        res.json({error: false, message: user});
    });

};