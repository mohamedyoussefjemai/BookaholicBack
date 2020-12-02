const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');

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

//insert User 1 
//app.get('/users/add-user', (req, res) => {
//	let post = {
//		username: 'fathi', birthDate: '1996-06-26', email: 'fathi@gmail.com', salt: '85de802b5e280b06e04c1e4afee3dd57', hash: '82173862d3b39ddaa617ece6e9ff7c3efa5fbdab96c2213be2f0288546b2f0e9bc318159b101b04fa710edd51a13c8c6b7194663fb93abbc1b3b6105aa3771c7\
//',address: 'sokra', phone: 26254939,trade: 0,sale: 0
//	};
//	let sql = 'INSERT INTO users SET ?';
//	let query = db.query(sql, post, (err, result) => {
//		if (err) throw err;
//		console.log(result);
//		res.send('User 1 added');
//	});
//});



////Select one User 
//app.get('/users/read-user/:id', (req, res) => {
//	db.query(
//		'SELECT * FROM users WHERE id = ? ',
//		[req.params.id],
//		function (err, results) {
//			console.log(results);
//			res.send(results)
//		}
//	);
//});

////Select User with email 
//app.get('/users/read-user-email/:email', (req, res) => {
//	db.query(
//		'SELECT * FROM users WHERE email = ? ',
//		[req.params.email],
//		function (err, results) {
//			console.log(results);
//			res.send(results)
//		}
//	);
//});

////get id with email and username 
//app.get('/users/read-user-id/:email/:username', (req, res) => {
//	db.query(
//		'SELECT id FROM users WHERE email = ? AND username = ?',
//		[req.params.email,req.params.username],
//		function (err, results) {
//			console.log(results);
//			res.send(results)
//		}
//	);
//});





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
												//AUTHENTIFICATION
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
// listen for requests
app.listen('3000', () => {
	console.log('server started on 3000');
});
