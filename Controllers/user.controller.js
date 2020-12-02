'use strict';
var crypto = require('crypto');
var unhash = require('unhash');
const user = require('../models/user.model');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');

const {use} = require('../Routes/user.routes');
exports.findAll = function (req, res) {
    user.findAll(function (err, user) {
        console.log('controller')
        if (err)
            res.send(err);
        console.log('res', user);
        res.send(user);
    });
};
exports.create = function (req, res) {
    const new_user = new user(req.body);
    //var hash = crypto.createHash('md5').update(new_user.password).digest('hex');

    var hash = bcrypt.hashSync(new_user.password, 10);
    new_user.password = hash;

    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({error: true, message: 'Please provide all required field'});
    } else {
        user.create(new_user, function (err, user) {
            if (err)
                res.send(err);
            res.json({error: false, message: "user added successfully!", data: user});
        });
    }
};
exports.findById = function (req, res) {
    user.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({error: true, message: 'Please provide all required field'});
    } else {
        user.update(req.params.id, new user(req.body), function (err, user) {
            if (err)
                res.send(err);
            res.json({error: false, message: 'user successfully updated'});
        });
    }
};

exports.delete = function (req, res) {
    user.delete(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        res.json({error: false, message: 'user successfully deleted'});
    });
};


exports.findByLogin = function (req, res) {
    // var hash = bcrypt.hashSync(req.body.password, 10);
    console.log(req.body.email);

    user.findByLogin(req.body.email, req.body.password, function (err, result) {
        if (err) {
            res.send(err);
        }
        if (result === true) {
            res.status(200);
        } else {
            res.status(404);

        }
        res.send(result);

    });
}

exports.updateEmail = function (req, res) {

    var hash = bcrypt.hashSync(req.body.password, 10);


    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({error: true, message: 'Please provide all required field'});
    } else {
        user.updateEmail(req.body.email, hash, function (err, user) {
            if (err)
                res.send(err);
            res.json({error: false, message: 'user successfully updated password'});
        });
    }
    
};
exports.findByEmail = function (req, res) {
    user.findByEmail(req.params.email, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};
exports.updatePhone = function (req, res) {
        user.updatePhone(req.params.id, req.body.phone , function (err, user) {
            if (err)
                res.send(err);
            res.json({error: false, message: 'phone successfully updated'});
        });
    
};

exports.updateEmailProfile = function (req, res) {
    user.updateEmailProfile(req.params.id, req.body.email , function (err, user) {
        if (err)
            res.send(err);
        res.json({error: false, message: 'email successfully updated'});
    });

};
exports.updateAddress = function (req, res) {
    user.updateAddress(req.params.id, req.body.address , function (err, user) {
        if (err)
            res.send(err);
        res.json({error: false, message: 'address successfully updated'});
    });

};
exports.updateUsername = function (req, res) {
    user.updateUsername(req.params.id, req.body.username , function (err, user) {
        if (err)
            res.send(err);
        res.json({error: false, message: 'username successfully updated'});
    });

};