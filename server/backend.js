'use strict';

const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");

app.use(cors({
	origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],
	credentials: true,
}));

app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.static(path.resolve(__dirname, 'img')));

app.get('/v1/popular_films', (req, res) => {
	console.log('GET: popular_films CinemaTodayData')
	const collectionCinemaTodayData = {
		tittle: "Сейчас в кино",
		films:[
		{
			tittle: "Дюна",
			poster: "img/posters/dune_poster.jpg",
			rating: 7.1,
			genrys: ["Фентези,", "Приключения"],
			year: 2021,
			href: "index.html",
		},
		{
			tittle: "Человек",
			poster: "img/posters/1.png",
			rating: 8.7,
			genrys: ["Документальный,", "Смотрю и плачу"],
			year: 2015,
			href: "index.html",
		},
		{
			tittle: "Люси",
			poster: "img/posters/2.png",
			rating: 6.2,
			genrys: ["Фантастика, Боевик"],
			year: 2014,
			href: "index.html",
		},
		{
			tittle: "Властелин колец. Братство кольца",
			poster: "img/posters/3.png",
			rating: 7.5,
			genrys: ["Фентези,", "Прилючения"],
			year: 2001,
			href: "index.html",
		},
		{
			tittle: "Дом, который построил Джек",
			poster: "img/posters/4.png",
			rating: 4.9,
			genrys: ["Триллер", "Криминал"],
			year: 2018,
			href: "index.html",
		},
		{
			tittle: "Доказательство смерти",
			poster: "img/posters/5.png",
			rating: 7.2,
			genrys: ["Триллер", "Боевик"],
			year: 2007,
			href: "index.html",
		},
	]};

	res.status(200).json(collectionCinemaTodayData);
});

app.get('/v1/preview_film', (req, res) => {
	console.log('GET: preview_film Dune')
	const previewDune = {
		previewTittle: "Американская история X",
		previewDescription: "Ну типо по пустыням ходят, а ещё черви там всякие делают уууу",
		previewImg: "img/dune.jpg"}

	res.status(200).json(previewDune)
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});
