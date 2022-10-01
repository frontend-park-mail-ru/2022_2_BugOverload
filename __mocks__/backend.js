'use strict';

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors({
	origin: ['http://127.0.0.1:3000', 'http://127.0.0.1:5500'],
	credentials: true,
}));

app.use(express.static(path.resolve(__dirname, '..', '../src')));
app.use(express.static(path.resolve(__dirname, 'src/assert/img')));

app.get('/v1/in_cinema', (req, res) => {
	console.log('GET: popular_films CinemaTodayData')
	const collectionCinemaTodayData = {
		title: "Сейчас в кино",
		films:[
		{
			id: 0,
			title: "Дюна",
			description: "",
			type: "",
			year: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster: "asserts/img/posters/dune_poster.jpg",
			rating: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			id: 1,
			title: "Человек",
			description: "",
			type: "",
			year: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster: "asserts/img/posters/1.png",
			rating: 7.1,
			genres: ["Документальный", "Смотрю и плачу"],
		},
		{
			id: 2,
			title: "Люси",
			description: "",
			type: "",
			year: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster: "asserts/img/posters/2.png",
			rating: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			id: 3,
			title: "Властелин колец. Братство кольца",
			description: "",
			type: "",
			year: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster: "asserts/img/posters/3.png",
			rating: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			id: 4,
			title: "Дом, который построил Джек",
			description: "",
			type: "",
			year: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster: "asserts/img/posters/4.png",
			rating: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			id: 5,
			title: "Доказательство смерти",
			description: "",
			type: "",
			year: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster: "asserts/img/posters/5.png",
			rating: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			id: 8,
			title: "Убить Билла",
			description: "",
			type: "",
			year: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster: "asserts/img/posters/8.png",
			rating: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			id: 9,
			title: "Головокружение",
			description: "",
			type: "",
			year: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster: "asserts/img/posters/9.png",
			rating: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			id: 5,
			title: "Доказательство смерти",
			description: "",
			type: "",
			year: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster: "asserts/img/posters/5.png",
			rating: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			id: 7,
			title: "Чунгингский экспресс",
			description: "",
			type: "",
			year: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster: "asserts/img/posters/7.png",
			rating: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			id: 6,
			title: "Девушка с татуировой дракона",
			description: "",
			type: "",
			year: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster: "asserts/img/posters/6.png",
			rating: 7.1,
			genres: ["Фентези", "Приключения"],
		}
	]};

	res.status(200).json(collectionCinemaTodayData);
});

app.get('/v1/popular_films', (req, res) => {
	console.log('GET: popular_films PopularData')
	const collectionPopularData = {
		title: "Популярное",
		films:[
			{
				id: 0,
				title: "Дюна",
				description: "",
				type: "",
				year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster: "asserts/img/posters/dune_poster.jpg",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 8,
				title: "Убить Билла",
				description: "",
				type: "",
				year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster: "asserts/img/posters/8.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 9,
				title: "Головокружение",
				description: "",
				type: "",
				year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster: "asserts/img/posters/9.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 5,
				title: "Доказательство смерти",
				description: "",
				type: "",
				year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster: "asserts/img/posters/5.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 7,
				title: "Чунгингский экспресс",
				description: "",
				type: "",
				year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster: "asserts/img/posters/7.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 6,
				title: "Девушка с татуировой дракона",
				description: "",
				type: "",
				year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster: "asserts/img/posters/6.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
	]};

	res.status(200).json(collectionPopularData);
})

app.get('/v1/recommendation_film', (req, res) => {
	console.log('GET: recommendation_film')
	const previewDune = {
		id: 0,
		previewtitle: "Американская история X",
		previewDescription: "Ну типо по пустыням ходят, а ещё черви там всякие делают уууу",
		type: "",
		year: 2021,
		prodCompany: "",
		prodCountry: "",
		ageLimit: "",
		duration: "",
		previewImg: "asserts/img/dune.jpg",
		poster: "",
		rating: 7.1,
		genres: ["Фентези", "Приключения"]
	}

	const previewStarWars = {
		id: 111,
		previewtitle: "Звёздные войны. Эпизод IV: Новая надежда",
		previewDescription: `Может хватит бухтеть и дестабилизировать ситуацию в стране?
		Есть инфа от знающего человека, что у нас в стране скоро ожидаются реальные изменения. После того, как стабилизируют ситуацию в Сирии, уничтожат ИГИЛ. Тогда везде и сформируют торговый альянс со средним востоком. Нефть поднимут и будут держать, Европа ничего не сможет сделать. Сейчас главное не бухтеть.
		А теперь самое главное!
		От нас требуется сидеть тихо. После того, как все сделают, все будет у нас хорошо. Всем устроят довольствие, как Саудовским гражданам - каждый будет кататься в масле. Главное сейчас сидеть тихо и не суетиться. Никаких митингов, никаких навальных. Просто переждать и всё будет хорошо, там все схвачено....
		Световой меч делает вжух-вжух`,
		type: "",
		year: 2021,
		prodCompany: "",
		prodCountry: "",
		ageLimit: "",
		duration: "",
		previewImg: "asserts/img/StarWars.jpeg",
		poster: "",
		rating: 7.1,
		genres: ["Фентези", "Приключения"]
	}

	if (Math.random() > 0.5) {
		console.log("previewStarWars")
		res.status(200).json(previewStarWars);
		return;
	}

	console.log("previewDune")
	res.status(200).json(previewDune)
});



const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});
