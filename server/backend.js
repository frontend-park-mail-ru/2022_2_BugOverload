'use strict';

const express = require('express');
const path = require('path');
const cors = require("cors");

const app = express();

app.use(cors({
	origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],
	credentials: true,
}));

app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.static(path.resolve(__dirname, 'src/assert/img')));

app.get('/v1/in_cinema', (req, res) => {
	console.log('GET: popular_films CinemaTodayData')
	const collectionCinemaTodayData = {
		tittle: "Сейчас в кино",
		films:[
		{
			tittle: "Дюна",
			poster: "asserts/img/posters/dune_poster.jpg",
			rating: 7.1,
			genres: ["Фентези", "Приключения"],
			year: 2021,
			href: "index.html",
		},
		{
			tittle: "Человек",
			poster: "asserts/img/posters/1.png",
			rating: 8.7,
			genres: ["Документальный", "Смотрю и плачу"],
			year: 2015,
			href: "index.html",
		},
		{
			tittle: "Люси",
			poster: "asserts/img/posters/2.png",
			rating: 6.2,
			genres: ["Фантастика", "Боевик"],
			year: 2014,
			href: "index.html",
		},
		{
			tittle: "Властелин колец. Братство кольца",
			poster: "asserts/img/posters/3.png",
			rating: 7.5,
			genres: ["Фентези", "Прилючения"],
			year: 2001,
			href: "index.html",
		},
		{
			tittle: "Дом, который построил Джек",
			poster: "asserts/img/posters/4.png",
			rating: 4.9,
			genres: ["Триллер", "Криминал"],
			year: 2018,
			href: "index.html",
		},
		{
			tittle: "Доказательство смерти",
			poster: "asserts/img/posters/5.png",
			rating: 7.2,
			genres: ["Триллер", "Боевик"],
			year: 2007,
			href: "index.html",
		},
	]};

	res.status(200).json(collectionCinemaTodayData);
});

app.get('/v1/popular_films', (req, res) => {
	console.log('GET: popular_films PopularData')
	const collectionPopularData = {
		tittle: "Популярное",
		films:[
			{
				tittle: "Дюна",
				poster: "asserts/img/posters/dune_poster.jpg",
				rating: 6.8,
				genres: ["Триллер", "Криминал"],
				year: 2021,
				href: "index.html",
			},
			{
				tittle: "Убить Билла",
				poster: "asserts/img/posters/8.png",
				rating: 8.7,
				genres: ["Триллер", "Криминал"],
				year: 2015,
				href: "index.html",
			},
			{
				tittle: "Головокружение",
				poster: "asserts/img/posters/9.png",
				rating: 7.4,
				genres: ["Триллер", "Криминал"],
				year: 2014,
				href: "index.html",
			},
			{
				tittle: "Доказательство смерти",
				poster: "asserts/img/posters/5.png",
				rating: 7.5,
				genres: ["Триллер", "Криминал"],
				year: 2001,
				href: "index.html",
			},
			{
				tittle: "Чунгингский экспресс",
				poster: "asserts/img/posters/7.png",
				rating: 6.9,
				genres: ["Триллер", "Криминал"],
				year: 2018,
				href: "index.html",
			},
			{
				tittle: "Девушка с татуировой дракона",
				poster: "asserts/img/posters/6.png",
				rating: 5.1 ,
				genres: ["Триллер", "Криминал"],
				year: 2007,
				href: "index.html",
			},
	]};

	res.status(200).json(collectionPopularData);
})

app.get('/v1/recommendation_film', (req, res) => {
	console.log('GET: recommendation_film')
	const previewDune = {
		previewTittle: "Американская история X",
		previewDescription: "Ну типо по пустыням ходят, а ещё черви там всякие делают уууу",
		previewImg: "asserts/img/dune.jpg"}

	const previewStarWars = {
		previewTittle: "Звёздные войны. Эпизод IV: Новая надежда",
		previewDescription: `Может хватит бухтеть и дестабилизировать ситуацию в стране?
		Есть инфа от знающего человека, что у нас в стране скоро ожидаются реальные изменения. После того, как стабилизируют ситуацию в Сирии, уничтожат ИГИЛ. Тогда везде и сформируют торговый альянс со средним востоком. Нефть поднимут и будут держать, Европа ничего не сможет сделать. Сейчас главное не бухтеть.
		А теперь самое главное!
		От нас требуется сидеть тихо. После того, как все сделают, все будет у нас хорошо. Всем устроят довольствие, как Саудовским гражданам - каждый будет кататься в масле. Главное сейчас сидеть тихо и не суетиться. Никаких митингов, никаких навальных. Просто переждать и всё будет хорошо, там все схвачено....
		Световой меч делает вжух-вжух`,
		previewImg: "asserts/img/StarWars.jpeg"}

	if (Math.random() > 0.5) {
		console.log("previewStarWars")
		res.status(200).json(previewStarWars);
		return;
	}

	console.log("previewDune")
	res.status(200).json(previewDune)
});



const port = process.env.PORT || 3001;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});
