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
	Religionspirituality: 'Religion & spirituality',
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

var favoris = function (favoris) {
	this.title = favoris.title;
	this.author = favoris.author;
	this.price = favoris.price;
	this.category =favoris.category;
	this.visible = favoris.visible;
	this.status = favoris.status;
	this.image = favoris.image;
	this.user = favoris.user;
	this.book = favoris.book;
	this.language = favoris.language;
	this.username = favoris.username;

};
favoris.create = function (newfavoris ,image, result) {
	if (!Object.values(Category).includes(newfavoris.category)) {
		console.log('error category');
		result('error category not found', null);

	} else if (!Object.values(Etat).includes(newfavoris.status)) {
		console.log('error status');
		result('error status', null);

	}
	else if (!Object.values(Language).includes(newfavoris.language)) {
		console.log('error language');
		result('error language', null);

	}
	else {
		dbConn.query("INSERT INTO favoris set ? ", newfavoris, function (err, res) {
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
favoris.findById = function (id, result) {
	dbConn.query("Select * from favoris where user = ? ", id, function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(err, null);
		}
		else {
			result(null, res);
		}
	});
};
favoris.findAll = function (result) {
	dbConn.query("Select * from favoris where visible = 1", function (err, res) {
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

favoris.delete = function (idUser,idBook, result) {
	console.log("id user for delete ====>"+idUser);
	console.log("id book for delete ====>"+idBook);

	dbConn.query("DELETE FROM favoris WHERE user = ? and book = ?", [idUser,idBook], function (err, res) {
		if (err) {
			console.log("error: ", err);
			result(null, err);
		}
		else {
			result(null, res);
		}
	});
};


module.exports = favoris;

