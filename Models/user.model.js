'use strict';
var dbConn = require('../config/db.config');
var crypto = require('crypto');
const {request} = require('https');
const {encrypt, decrypt} = require('../config/crypto');
var bcrypt = require('bcrypt');
var json = require('json');

//user object create
var user = function (user) {
    this.username = user.username;
    this.birthdate = user.birthdate;
    this.email = user.email;
    this.phone = user.phone;
    this.password = user.password;
    this.address = user.address;
    this.sale = user.sale;
    this.trade = user.trade;
    this.image = user.image;
    this.messenger = user.messenger;

};
user.create = function (newUser, result) {
    dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
user.findById = function (id, result) {
    dbConn.query("Select * from users where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
user.findAll = function (result) {
    dbConn.query("Select * from users", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('users : ', res);
            result(null, res);
        }
    });
};
user.update = function (id, user, result) {
    dbConn.query("UPDATE users SET username=?,email=?,birthdate=?,phone=?,address=?,sale=?,trade=?,image=? WHERE id = ?", [user.username, user.email, user.birthdate, user.phone, user.address, user.sale, user.trade, user.image, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


user.delete = function (id, result) {
    dbConn.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

user.findByLogin = function (email, password, result) {
    console.log('password = ' + password);
    db.query("SELECT password FROM users WHERE email = ?", email, function (err, res, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        // iterate for all the rows in result
        Object.keys(res).forEach(function (key, result) {
            var row = res[key];
            console.log(row.password);
            const bcryptPassword = bcrypt.compareSync(password, row.password);
            console.log(bcryptPassword);

            res = bcryptPassword;

        });
        result(null, res);
    });

};

user.updateEmail = function (email, password, result) {

    dbConn.query("UPDATE users SET password = ? WHERE email = ?", [password, email], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

user.findByEmail = function (email, result) {
    dbConn.query("Select * from users where email = ? ", email, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
user.updatePhone = function (id, phone, result) {
    dbConn.query("UPDATE users SET phone=? WHERE id = ?", [phone, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

user.updateEmailProfile = function (id, email, result) {
    dbConn.query("UPDATE users SET email=? WHERE id = ?", [email, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

user.updateAddress = function (id, address, result) {
    dbConn.query("UPDATE users SET address=? WHERE id = ?", [address, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

user.updateMessenger = function (id, messenger, result) {
    dbConn.query("UPDATE users SET messenger=? WHERE id = ?", [messenger, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

user.updateUsername = function (id, username, result) {
    dbConn.query("UPDATE users SET username=? WHERE id = ?", [username, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
user.updateAll = function (id, email, phone, address, result) {
    dbConn.query("UPDATE users SET email=? ,phone=?,address=? WHERE id = ?", [email, phone, address, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

user.updateImage = function (id, image, result) {
    dbConn.query("UPDATE users SET image=? WHERE id = ?", [image, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
module.exports = user;