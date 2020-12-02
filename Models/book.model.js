'use strict';

var dbConn = require('../config/db.config');
//book object create
const Category = Object.freeze({
	Romance: 'romance & new adult',
	adventure: 'adventure',
	literature: 'literature',
	comic: 'comic & mangas',
	personal: 'Personal development',
	healthcooking: 'Health & cooking',
	History: 'History',
	youth: 'youth',
	socialSciences: 'social Sciences',
	artmusiccinema: 'art music & cinema',
	humor: 'humor',
	policethrillers: 'police & thrillers',
	Religionspirituality: 'Religion and spirituality',
	school: 'school',
	sportleisure: 'sport & leisure',
	theater: 'theater',
	tourismtravel: 'tourism & travel'
});
const Etat = Object.freeze({
	New: 'new',
	Old: 'old',
	Satisfying: 'satisfying',
});
const Language = Object.freeze({
	French: 'french',
	Arabic: 'arabic',
	English: 'english',
	other: 'other'
});

var book = function (book) {
	this.title = book.title;
	this.author = book.author;
	this.price = book.price;
	this.category =book.category;
	this.visible = book.visible;
	this.status = book.status;
	this.image = book.image;
	this.user = book.user;
	this.language = book.language;
	this.username = book.username;

};
book.create = function (newbook, result) {
	if (!Object.values(Category).includes(newbook.category)) {
		console.log('error category');
		result('error category not found', null);

	} else if (!Object.values(Etat).includes(newbook.status)) {
		console.log('error status');
		result('error status', null);

	}
	else if (!Object.values(Language).includes(newbook.language)) {
		console.log('error language');
		result('error language', null);

	}
	else {
		dbConn.query("INSERT INTO books set ?", newbook, function (err, res) {
			if (err) {
				console.log("error: ", err);
				result(err, null);
			}
			else {
				console.log(res.insertId);
				result(null, res.insertId);
			}
		});}
	
};
book.findById = function (id, result) {
	dbConn.query("Select * from books where id = ? ", id, function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(err, null);
		}
		else {
			result(null, res);
		}
	});
};
book.findAll = function (result) {
	dbConn.query("Select * from books where visible = 1", function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(null, err);
		}
		else {
			console.log('books : ', res);
			result(null, res);
		}
	});
};
book.update = function (id, book, result) {
	dbConn.query("UPDATE books SET title=?,author=?,price=?,category=?,visible=?,status=?,image=?,user=?,language=? username=? WHERE id = ?", [book.title, book.author, book.price, book.category, book.visible, book.status, book.image, book.user,book.language, book.username, id], function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};



book.delete = function (id, result) {
	dbConn.query("DELETE FROM books WHERE id = ?", [id], function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(null, err);
		}
		else {
			result(null, res);
		}
	});
};

book.findBycat = function (cat, result) {
	dbConn.query('Select * from books where category = ? And visible =1', cat, function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(err, null);
		}
		else {
			result(null, res);
		}
	});
};

book.findLib = function (id, result) {
	dbConn.query("Select * from books where user =(select id from users where id = ?)  ", id, function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(err, null);
		}
		else {
			result(null, res);
		}
	});
};


book.findPost = function (id, result) {
	dbConn.query("Select * from books where user =(select id from users where id = ?) AND visible = 1  ", id, function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(err, null);
		}
		else {
			result(null, res);
		}
	});
};

module.exports = book;