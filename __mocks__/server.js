'use strict';

const express = require('express');
const path = require('path');
const app = express();
const uuid = require('uuid').v4;
const body = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');


app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '../src')));
app.use(express.static(path.resolve(__dirname, 'images')));
app.use(body.json());
app.use(cors({
	origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:8080', 'http://127.0.0.1:5500'],
	credentials: true,
}));

const users = {
	'dop123@mail.ru': {
		'nickname': 'StepByyyy',
		'email': 'dop123@mail.ru',
		'password': 'dop123@mail.ru',
		// 'avatar': 'https://static.1tv.ru/uploads/photo/image/2/huge/4062_huge_876c41f50e.jpg'
		'avatar': 'asserts/img/invisibleMan.jpeg'
	},
};
const ids = {};

app.post('/v1/auth/login',  (req, res) => {
	console.log(req);
	console.log(req.body);

	const password = req.body.password;
	const email = req.body.email;
	if (!password || !email) {
		return res.status(401).json({error: 'Не указан E-Mail или пароль'});
	}
	if (!users[email] || users[email].password !== password) {
		return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
	}

	const id = uuid();
	ids[id] = email;

	res.cookie('red', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(200).json({nickname: users[email].nickname ,email: users[email].email,avatar: users[email].avatar});
});

app.get('/v1/auth',  (req, res) => {
	const email = 'dop123@mail.ru'
	res.status(200).json({nickname: users[email].nickname ,email: users[email].email,avatar: users[email].avatar});
});

app.post('/v1/auth/signup', (req, res) => {
	const password = req.body.password;
	const email = req.body.email;
	const nickname = req.body.nickname;
	console.log(nickname)
	if (
		!password || !email || !nickname
	) {
		return res.status(400).json({error: 'Не валидные данные пользователя'});
	}
	if (users[email]) {
		return res.status(200).json({error: 'Пользователь уже существует'});
	}

	const id = uuid();
	const user = {nickname,email,password};
	ids[id] = email;
	users[email] = user;

	res.cookie('red', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json(users[email]);
});

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