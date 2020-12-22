const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const multer = require("multer")
const crypto = require("crypto")
const path = require("path")
const app = express();
app.use(bodyparser.json());
db = require('../Bookaholic/config/db.config');


//create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE bookaholic';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('DataBase Created ');
    });
});

//Create Table
app.get('/createUserTab', (req, res) => {
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT,username VARCHAR (255) NOT NULL,birthdate DATE NOT NULL ,email VARCHAR(255) NOT NULL,\
	hash VARCHAR(255) NOT NULL, salt VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, phone INT(8) NOT NULL, sale INT DEFAULT 0 NOT NULL, trade INT DEFAULT 0 NOT NULL, image VARCHAR(255) NULL, PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Users Table created');
    });
});
//storage engine

// Include the node file module
var fs = require('fs');

storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
//upload image
const upload = multer({
    storage: storage,
    limits: {
        filesize: 1000000
    }
})
app.post(
    "/upload",
    multer({
        storage: storage
    }).single('upload'), function (req, res) {
        console.log(req.file);
        console.log(req.body);
        res.redirect("/uploads/" + req.file.filename);
        console.log(req.file.filename);

        return req.file.filename;
    });
app.use("/get/image", express.static("uploads/images"))


///// multer ios
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload2 = multer({ storage: storage2, fileFilter: fileFilter });
//Upload route
app.post(
    "/upload/ios",
    multer({
        storage: storage2
    }).single('upload'), function(req, res) {
        // console.log(req.file);
        // console.log(req.body);
        //res.redirect("/uploads/" + req.file.filename);
        console.log(req.file.filename);
        return res.status(200).end();
    });

app.get('/uploads/:upload', function (req, res){
    file = req.params.upload;
    console.log(req.params.upload);
    var img = fs.readFileSync(__dirname + "/uploads/images/" + file);
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');

});

const SocketServer = require('websocket').server
const http = require('http')

const server = http.createServer((req,res) => {})

server.listen(3001,() => {
    console.log("Listening to websocket too.....")
})

wsServer = new SocketServer({httpServer: server})

const connections = []

wsServer.on('request',(req) => {
    const connection = req.accept()
    console.log("new connection")
    connections.push(connection)
    
    connection.on('message',(mes) => {
        connections.forEach(element => {
            if(element != connection)
                element.sendUTF(mes.utf8Data)
        })
    })
    
    connection.on('close',(resCode, des) => {
        console.log("connection closed")
        connections.splice(connections.indexOf(connection),1)
    })
    
})



//get id with email and username
app.get('/users/read-user-id/:email/:username', (req, res) => {
    db.query(
        'SELECT id FROM users WHERE email = ? AND username = ?',
        [req.params.email, req.params.username],
        function (err, results) {
            console.log(results);
            res.send(results)
        }
    );
});
// Require user routes
const userRoutes = require('../Bookaholic/Routes/user.routes')
// using as middleware
app.use('/users', userRoutes)

// Require user routes
const bookRoutes = require('../Bookaholic/Routes/book.routes')
// using as middleware
app.use('/books', bookRoutes)

// Require favoris routes
const favorisRoutes = require('../Bookaholic/Routes/favoris.routes')
// using as middleware
app.use('/favoris', favorisRoutes)
// listen for requests
app.listen('3000', () => {
    console.log('server started on 3000');
});
