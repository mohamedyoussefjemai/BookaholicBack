'use strict';

var dbConn = require('../config/db.config');
//book object create
const Type = Object.freeze({
    Trade: 'trade',
    Sale: 'sale'
});
const Etat = Object.freeze({
    Waiting: 'waiting',
    Accepted: 'accepted',
    Refused: 'refused'
});
var requests = function (requests) {
    this.title = requests.title;
    this.type = requests.type;
    this.price = requests.price;
    this.sender = requests.sender;
    this.receiver = requests.receiver;
    this.etat = requests.etat;
    this.titlechange = requests.titlechange;
};

requests.create = function (requests, result) {
    if (!Object.values(Type).includes(requests.type)) {
        console.log('error type');
        result('error type not found', null);
    } else if (!Object.values(Etat).includes(requests.etat)) {
        console.log('error etat');
        result('error etat not found', null);
    } else {
        dbConn.query("INSERT INTO requests set ? ", requests, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log(res);
                result(null, res);
            }
        });
    }

};


requests.findSendTrade = function (username, result) {
    dbConn.query("Select * from requests where sender =(select username from users where username = ?) and type = 'trade' order by id desc ", username, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

requests.findReceiverTrade = function (username, result) {
    dbConn.query("Select * from requests where receiver =(select username from users where username = ?) and type = 'trade' and etat = 'waiting' order by id desc ", username, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

requests.updateAccept = function (id, usernameReceiver, usernameSender, title, titlechange, result) {
    console.log("user receiver " + usernameReceiver);
    console.log("user sender " + usernameSender);
    console.log("title " + title);
    console.log("echange " + titlechange);

    console.log("query accepting");
    dbConn.query("UPDATE requests SET etat=? WHERE id = ?", ["accepted", id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
    });
    console.log("query update username receiver");

    dbConn.query("UPDATE books SET visible = 0, username = ? , user = (SELECT id from users where username = ?) where user = (SELECT id from users where username = ?) and title = ?", [usernameReceiver, usernameReceiver, usernameSender, title], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
    });
    console.log("query update username sender");

    dbConn.query("UPDATE books SET visible = 0, username = ?, user = (SELECT id from users where username = ?) where user = (SELECT id from users where username = ?) and title = ?", [usernameSender, usernameSender, usernameReceiver, titlechange], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
    });
    console.log("query update trade receiver + 1 " + usernameReceiver);

    dbConn.query("UPDATE users SET trade = trade + 1  where  username = ?", usernameReceiver, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
    });

    console.log("query update trade sender + 1 " + usernameSender);

    dbConn.query("UPDATE users SET trade = trade + 1  where  username = ?", usernameSender, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

requests.updateReject = function (id, result) {
    console.log("query refusing");
    dbConn.query("UPDATE requests SET etat = ? WHERE id = ?", ["refused", id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
    });
};

requests.findSendSale = function (username, result) {
    dbConn.query("Select * from requests where sender =(select username from users where username = ?) and type = 'sale' order by id desc ", username, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

requests.findReceiverSale = function (username, result) {
    dbConn.query("Select * from requests where receiver =(select username from users where username = ?) and type = 'sale' and etat = 'waiting' order by id desc ", username, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

requests.updateAcceptSale = function (id, usernameReceiver, usernameSender, titlechange, result) {
    console.log("user receiver " + usernameReceiver);
    console.log("user sender " + usernameSender);
    console.log("echange " + titlechange);

    console.log("query accepting");
    dbConn.query("UPDATE requests SET etat=? WHERE id = ?", ["accepted", id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
    });
    console.log("query update username sender");

    dbConn.query("UPDATE books SET visible = 0, username = ?, user = (SELECT id from users where username = ?) where user = (SELECT id from users where username = ?) and title = ?", [usernameSender, usernameSender, usernameReceiver, titlechange], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
    });
    console.log("query update sale receiver + 1 " + usernameReceiver);

    dbConn.query("UPDATE users SET sale = sale + 1  where  username = ?", usernameReceiver, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });


};
requests.updateRejectSale = function (id, result) {
    console.log("query refusing");
    dbConn.query("UPDATE requests SET etat = ? WHERE id = ?", ["refused", id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
    });
};
module.exports = requests;

