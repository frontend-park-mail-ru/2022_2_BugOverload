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
	origin: ['http://127.0.0.1:3000', 'http://127.0.0.1:3001', 'http://localhost:3000','http://localhost:8088', 'http://localhost:8080', 'http://127.0.0.1:5500'],
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
const DEFAULT_AVATAR = 'asserts/img/invisibleMan.jpeg'
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
	res.status(404).json({nickname: users[email].nickname ,email: users[email].email,avatar: users[email].avatar});
});

app.get('/v1/auth/logout',  (req, res) => {
	res.status(200).json("de");
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
	users[email].avatar = DEFAULT_AVATAR;
	res.status(201).json(users[email]);
});

app.get('/v1/in_cinema', (req, res) => {
	console.log('GET: popular_films CinemaTodayData')
	const collectionCinemaTodayData = {
		title: "Сейчас в кино",
		films:[
		{
			film_id: 0,
			film_name: "Дюна",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/dune_poster.jpg",
			ratio: 9.8,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 1,
			film_name: "Человек",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/1.png",
			ratio: 7.1,
			genres: ["Документальный", "Смотрю и плачу"],
		},
		{
			film_id: 2,
			film_name: "Люси",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/2.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 3,
			film_name: "Властелин колец. Братство кольца",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/3.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 4,
			film_name: "Дом, который построил Джек",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/4.png",
			ratio: 9.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 5,
			film_name: "Доказательство смерти",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/5.png",
			ratio: 7.1,
			genres: ["Фентези ", "Приключения"],
		},
		{
			film_id: 8,
			film_name: "Убить Билла",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/8.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 9,
			film_name: "Головокружение",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/9.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 5,
			film_name: "Доказательство смерти",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/5.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 7,
			film_name: "Чунгингский экспресс",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/7.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 6,
			film_name: "Девушка с татуировой дракона",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/6.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 3,
			film_name: "Властелин колец. Братство кольца",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/3.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 4,
			film_name: "Дом, который построил Джек",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/4.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 5,
			film_name: "Доказательство смерти",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/5.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 8,
			film_name: "Убить Билла",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/8.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 1,
			film_name: "Человек",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/1.png",
			ratio: 7.1,
			genres: ["Документальный", "Смотрю и плачу"],
		},
		{
			film_id: 2,
			film_name: "Люси",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/2.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 3,
			film_name: "Властелин колец. Братство кольца",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/3.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 4,
			film_name: "Дом, который построил Джек",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/4.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 5,
			film_name: "Доказательство смерти",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/5.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 8,
			film_name: "Убить Билла",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/8.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 9,
			film_name: "Головокружение",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/9.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 5,
			film_name: "Доказательство смерти",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/5.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 7,
			film_name: "Чунгингский экспресс",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/7.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 6,
			film_name: "Девушка с татуировой дракона",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/6.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 3,
			film_name: "Властелин колец. Братство кольца",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/3.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 3,
			film_name: "Властелин колец. Братство кольца",
			description: "",
			type: "",
			year_prod: 2021,
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "asserts/img/posters/3.png",
			ratio: 7.1,
			genres: ["Фентези", "Приключения"],
		},
	]};

	res.status(200).json(collectionCinemaTodayData);
});

app.get('/v1/popular_films', (req, res) => {
	console.log('GET: popular_films PopularData')
	const collectionPopularData = {
		title: "Популярное",
		films:[
			{
				film_id: 0,
				film_name: "Дюна",
				description: "",
				type: "",
				year_prod: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "asserts/img/posters/dune_poster.jpg",
				ratio: 5.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				film_id: 8,
				film_name: "Убить Билла",
				description: "",
				type: "",
				year_prod: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "asserts/img/posters/8.png",
				ratio: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				film_id:9,
				film_name: "Головокружение",
				description: "",
				type: "",
				year_prod: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "asserts/img/posters/9.png",
				ratio: 4.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				film_id:5,
				film_name: "Доказательство смерти",
				description: "",
				type: "",
				year_prod: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "asserts/img/posters/5.png",
				ratio: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				film_id: 7,
				film_name: "Чунгингский экспресс",
				description: "",
				type: "",
				year_prod: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "asserts/img/posters/7.png",
				ratio: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				film_id: 6,
				film_name: "Девушка с татуировой дракона",
				description: "",
				type: "",
				year_prod: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "asserts/img/posters/6.png",
				ratio: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				film_id: 1,
				film_name: "Человек",
				description: "",
				type: "",
				year_prod: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "asserts/img/posters/1.png",
				ratio: 7.1,
				genres: ["Документальный", "Смотрю и плачу"],
			},
			{
				film_id: 3,
				film_name: "Властелин колец. Братство кольца",
				description: "",
				type: "",
				year_prod: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "asserts/img/posters/3.png",
				ratio: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				film_id: 3,
				film_name: "Властелин колец. Братство кольца",
				description: "",
				type: "",
				year_prod: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "asserts/img/posters/3.png",
				ratio: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				film_id: 3,
				film_name: "Властелин колец. Братство кольца",
				description: "",
				type: "",
				year_prod: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "asserts/img/posters/3.png",
				ratio: 7.1,
				genres: ["Фентези", "Приключения"],
			},
	]};

	res.status(200).json(collectionPopularData);
})

app.get('/v1/recommendation_film', (req, res) => {
	console.log('GET: recommendation_film')
	const previewSpace = {
		film_id: 0,
		film_name: "2001 год: Космическая одиссея",
		origin_name: "",
		short_desctiption: "Экипаж космического корабля «Дискавери» — капитаны Дэйв Боумэн, Фрэнк Пул и их бортовой компьютер HAL 9000 — должны исследовать район галактики и понять, почему инопланетяне следят за Землей. На этом пути их ждет множество неожиданных открытий.",
		type: "",
		year_prod: 1968,
		prodCompany: "",
		prodCountry: "",
		ageLimit: "",
		duration: "",
		poster_hor: "asserts/img/space_odyssey_hor.jpg",
		ratio: 7.1,
		genres: ["Фентези", "Приключения"]
	}

	const previewDune = {
		film_id: 0,
		film_name: "Американская история X",
		short_desctiption: "Ну типо по пустыням ходят, а ещё черви там всякие делают уууу",
		type: "",
		year_prod: 2021,
		prodCompany: "",
		prodCountry: "",
		ageLimit: "",
		duration: "",
		poster_hor: "asserts/img/dune.jpg",
		ratio: 7.1,
		genres: ["Фентези", "Приключения"]
	}

	const previewJoker = {
		film_id: 0,
		film_name: "Джокер ",
		short_desctiption: "Распад личности под воздействием социума.",
		type: "film",
		year_prod: 2019,
		ageLimit: "18+",
		duration: "2:10",
		poster_hor: "asserts/img/joker_hor.jpg",
		ratio: 7.1,
	}

	const previewStarWars = {
		film_id: 111,
		film_name: "Звёздные войны. Эпизод IV: Новая надежда",
		short_desctiption: `Может хватит бухтеть и дестабилизировать ситуацию в стране?
		Есть инфа от знающего человека, что у нас в стране скоро ожидаются реальные изменения. После того, как стабилизируют ситуацию в Сирии, уничтожат ИГИЛ. Тогда везде и сформируют торговый альянс со средним востоком. Нефть поднимут и будут держать, Европа ничего не сможет сделать. Сейчас главное не бухтеть.
		А теперь самое главное!
		От нас требуется сидеть тихо. После того, как все сделают, все будет у нас хорошо. Всем устроят довольствие, как Саудовским гражданам - каждый будет кататься в масле. Главное сейчас сидеть тихо и не суетиться. Никаких митингов, никаких навальных. Просто переждать и всё будет хорошо, там все схвачено....
		Световой меч делает вжух-вжух`,
		type: "",
		year_prod: 2021,
		prodCompany: "",
		prodCountry: "",
		ageLimit: "",
		duration: "",
		poster_hor: "asserts/img/StarWars.jpeg",
		ratio: 7.1,
		genres: ["Фентези", "Приключения"]
	}

	if (Math.random() > 0.75) {
		res.status(200).json(previewSpace);
		return;
	}
	if (Math.random() > 0.5) {
		res.status(200).json(previewStarWars);
		return;
	}
	if (Math.random() > 0.25) {
		res.status(200).json(previewJoker);
		return;
	}

	res.status(200).json(previewDune)
});

const port = process.env.PORT || 8088;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});
