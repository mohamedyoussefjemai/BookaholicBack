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

//add book with image

/*
app.post('/books/add-book-img',upload.single('image'),(req,res) => {
	let body = req.body;
	let imageURL=`${req.file.filename}`
	var sql = "INSERT INTO `books` (`title`,`author`,`price`,`category`,`visible`,`status`,`image`,`user`,`language`,`username`) VALUES (?,?,?,?,?,?,?,?,?,?)"

	db.query(sql,[body.title,body.author,body.price,body.category,body.visible,body.status,imageURL,body.user,body.language,body.username],
		(err,rows,fields)=>{
			if (!err)
				res.send("Inserted Book "+rows.insertId)
			else
				console.log(err);
		})
})
*/


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
