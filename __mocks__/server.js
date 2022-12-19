'use strict';

const express = require('express');
const path = require('path');
const app = express();
const body = require('body-parser');
// const morgan = require('morgan');
const cors = require('cors');
var cookieParser = require('cookie-parser')
const ws = require('ws');

// app.use(morgan('dev'));
app.use(cookieParser());
app.use('/',express.static(path.resolve(__dirname, '../dist')));
app.use('/login/',express.static(path.resolve(__dirname, '../dist')));
app.use('/signup/',express.static(path.resolve(__dirname, '../dist')));
app.use('/profile/',express.static(path.resolve(__dirname, '../dist')));
app.use('/film/:id/',express.static(path.resolve(__dirname, '../dist')));
app.use('/person/:id/',express.static(path.resolve(__dirname, '../dist')));
app.use('/user/:id/',express.static(path.resolve(__dirname, '../dist')));
app.use('/premieres/',express.static(path.resolve(__dirname, '../dist')));
app.use('/search/:q/',express.static(path.resolve(__dirname, '../dist')));
app.use('/search/',express.static(path.resolve(__dirname, '../dist')));
app.use('/collection/:tag/',express.static(path.resolve(__dirname, '../dist')));
app.use('/user/collections/',express.static(path.resolve(__dirname, '../dist')));
app.use('/user/collection/:id/',express.static(path.resolve(__dirname, '../dist')));
app.use('/collection/genres/',express.static(path.resolve(__dirname, '../dist')));

app.use(body.json());
app.use(cors({
	origin: ['http://localhost:3000', 'https://localhost:3000','http://localhost:8088', 'http://localhost:8080', 'http://127.0.0.1:5500',
	'https://movie-gate.online:8088'],
	credentials: true,
}));

const users = {
	'Dop123@mail.ru': {
		'nickname': 'StepByyyy',
		'email': 'Dop123@mail.ru',
		'password': 'Dop123@mail.ru',
		'avatar': 'assets/img/users/invisibleMan.jpeg'
	},
};
const DEFAULT_AVATAR = 'assets/img/users/default_user.jpg'
const ids = {};

app.post('/api/v1/auth/login',  (req, res) => {
	const password = req.body.password;
	const email = req.body.email;
	if (!password || !email) {
		return res.status(401).json({error: 'Не указан E-Mail или пароль'});
	}
	if (!users[email] || users[email].password !== password) {
		return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
	}

	const id = 1;
	ids[id] = email;

	res.cookie('red', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(200).json({nickname: users[email].nickname ,email: users[email].email,avatar: users[email].avatar});
});

let i = 0;
app.get('/api/v1/auth',  (req, res) => {
	const email = 'Dop123@mail.ru'

	const variants = [200, 404];
	if (variants[i] === 200) {
		res.cookie('red', 1, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	} else {
		res.cookie('red', 1, {expires: new Date(Date.now() - 1000 * 60 * 10)});
	}

	res.status(variants[i]).json({nickname: users[email].nickname ,email: users[email].email, avatar: DEFAULT_AVATAR});
	if(i == 0) {
		i = 1;
	} else {
		i = 0;
	}
	res.status(200).json({nickname: users[email].nickname ,email: users[email].email, avatar: DEFAULT_AVATAR})
});

app.put('/api/v1/user/setting',  (req, res) => {
	res.sendStatus(403);
});

app.put('/api/v1/image', (req, res) => {
	res.sendStatus(204);
});

app.get('/api/v1/image', (req, res) => {
	require("fs").readFile(`${__dirname}/bale.webp`, function (error, data) {
		if (error) {
			res.statusCode = 405;
			res.end('Resourse not found!')
		} else {
			res.setHeader("Content-Type", "image/webp");
			res.end(data)
		}
	});
});

app.get('/api/v1/user/settings',  (req, res) => {
	const email = 'Dop123@mail.ru'
	res.status(200).json({count_collections: 3 ,count_ratings: 20, count_reviews: 8, count_views_films: 23, joined_date: "2022.10.12 21312124"});
});

app.get('/api/v1/user/profile/:id',  (req, res) => {
	const email = 'Dop123@mail.ru'
	res.status(200).json({nickname: users[email].nickname ,email: users[email].email, avatar: DEFAULT_AVATAR, count_collections: 3 ,count_ratings: 20, count_reviews: 8, count_views_films: 23, joined_date: "2022.10.12 5343"});
});

app.delete('/api/v1/auth/logout',  (req, res) => {
	res.sendStatus(204);
});


app.post('/api/v1/auth/signup', (req, res) => {
	const password = req.body.password;
	const email = req.body.email;
	const nickname = req.body.nickname;
	if (
		!password || !email || !nickname
	) {
		return res.status(400).json({error: 'Не валидные данные пользователя'});
	}
	if (users[email]) {
		return res.status(200).json({error: 'Пользователь уже существует'});
	}

	const id = 1;
	const user = {nickname,email,password};
	ids[id] = email;
	users[email] = user;

	res.cookie('red', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	users[email].avatar = DEFAULT_AVATAR;
	res.status(201).json(users[email]);
});

app.get('/api/v1/collection', (req, res) => {
	const tag = req.params.tag;
	const collectionCinemaTodayData = {
			name: "Сейчас в кино",
			description: "Самые популярные фильмы в сообществе",
			films:[
			{
				id: 0,
				name: "Дюна",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/dune_poster.jpg",
				rating: 9.8,
				genres: ["Фентезиушшкукл", "Приключения","apapa", "fwe"],
			},
			{
				id: 1,
				name: "Человек",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/1.png",
				rating: 7.1,
				genres: ["Документальный", "Смотрю и плачу", "www"],
			},
			{
				id: 2,
				name: "Люси",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/2.png",
				rating: 7.1,
				genres: ["Фентезиушшкукл", "Приключqwqeqqweения","apapa", "fwe"],
			},
			{
				id: 3,
				name: "Властелин колец. Братство кольца",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/3.png",
				rating: 7.1,
				genres: ["fwe", "aqwd", "Фентезиушшкукл", "Приключqwqeqqweения","apapa"],
			},
			{
				id: 4,
				name: "Дом, который построил Джек",
				description: "",
				type: "",
				prod_year: "1922-2021",
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/4.png",
				rating: 9.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 5,
				name: "Доказательство смерти",
				description: "",
				type: "",
				prod_year: "12-1221",
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/5.png",
				rating: 7.1,
				genres: ["Фентези ", "Приключения"],
			},
			{
				id: 8,
				name: "Убить Билла",
				description: "",
				type: "",
				prod_year: "20223-12332",
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/8.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 9,
				name: "Головокружение",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/9.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 5,
				name: "Доказательство смерти",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/5.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 7,
				name: "Чунгингский экспресс",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/7.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 6,
				name: "Девушка с татуировой дракона",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/6.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 3,
				name: "Властелин колец. Братство кольца",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/3.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 4,
				name: "Дом, который построил Джек",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/4.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 5,
				name: "Доказательство смерти",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/5.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 8,
				name: "Убить Билла",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/8.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 1,
				name: "Человек",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/1.png",
				rating: 7.1,
				genres: ["Документальный", "Смотрю и плачу"],
			},
			{
				id: 2,
				name: "Люси",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/2.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 3,
				name: "Властелин колец. Братство кольца",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/3.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 4,
				name: "Дом, который построил Джек",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/4.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 5,
				name: "Доказательство смерти",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/5.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 8,
				name: "Убить Билла",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/8.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 9,
				name: "Головокружение",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/9.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 5,
				name: "Доказательство смерти",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/5.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 7,
				name: "Чунгингский экспресс",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/7.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 6,
				name: "Девушка с татуировой дракона",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/6.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 3,
				name: "Властелин колец. Братство кольца",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/3.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
			{
				id: 3,
				name: "Властелин колец. Братство кольца",
				description: "",
				type: "",
				prod_year: 2021,
				prodCompany: "",
				prodCountry: "",
				ageLimit: "",
				duration: "",
				posterHuge: "",
				poster_ver: "assets/img/posters/3.png",
				rating: 7.1,
				genres: ["Фентези", "Приключения"],
			},
		]};


		res.status(200).json(collectionCinemaTodayData);

});


app.get('/api/v1/person/:id', (req, res) => {
	const actor = {
		name: 'Кристиан Бэйл',
		original_name: 'Christian Bale',
		professions: [
			'актер',
			'продюссер',
		],
		birthday: '09.10.2022, 48 лет',
		growth: '1.83 м',
		count_films: '130',
		avatar: "1",
		images: [
			"1",
			"2",
			"3",
			"4",
			"1",
			"2",
			"3",
			"4",
		],
		best_films:[
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
				poster_ver: "assets/img/posters/dune_poster.jpg",
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
				poster_ver: "assets/img/posters/8.png",
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
				poster_ver: "assets/img/posters/9.png",
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
				poster_ver: "assets/img/posters/5.png",
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
				poster_ver: "assets/img/posters/7.png",
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
				poster_ver: "assets/img/posters/6.png",
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
				poster_ver: "assets/img/posters/1.png",
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
				poster_ver: "assets/img/posters/3.png",
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
				poster_ver: "assets/img/posters/3.png",
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
				poster_ver: "assets/img/posters/3.png",
				ratio: 7.1,
				genres: ["Фентези", "Приключения"],
			},
		],
	}

	res.status(200).json(actor);
})

app.get('/api/v1/film/recommendation', (req, res) => {
	const previewSpace = {
		id: 0,
		name: "2001 год: Космическая одиссея",
		origin_name: "",
		short_description: "Экипаж космического корабля «Дискавери» — капитаны Дэйв Боумэн, Фрэнк Пул и их бортовой компьютер HAL 9000 — должны исследовать район галактики и понять, почему инопланетяне следят за Землей. На этом пути их ждет множество неожиданных открытий.",
		type: "",
		prod_year: 1968,
		prodCompany: "",
		prodCountry: "",
		ageLimit: "",
		poster_hor: "assets/img/previews/space_odyssey_hor.jpg",
		rating: 7.1,
		genres: ["Фентези", "Приключения"]
	}

	const previewDune = {
		id: 0,
		name: "Американская история X",
		short_description: "Ну типо по пустыням ходят, а ещё черви там всякие делают уууу",
		type: "",
		prod_year: 2021,
		prodCompany: "",
		prodCountry: "",
		ageLimit: "",
		duration: "",
		poster_hor: "assets/img/previews/dune.jpg",
		rating: 7.1,
		genres: ["Фентези", "Приключения"]
	}

	const previewJoker = {
		id: 0,
		name: "Джокер ",
		short_description: "Распад личности под воздействием социума.",
		type: "film",
		prod_year: 2019,
		ageLimit: "18+",
		duration: "2:10",
		poster_hor: "assets/img/previews/joker_hor.jpg",
		rating: 7.1,
	}

	const previewStarWars = {
		id: 111,
		name: "Звёздные войны. Эпизод IV: Новая надежда",
		short_description: `Может хватит бухтеть и дестабилизировать ситуацию в стране?
		Есть инфа от знающего человека, что у нас в стране скоро ожидаются реальные изменения. После того, как стабилизируют ситуацию в Сирии, уничтожат ИГИЛ. Тогда везде и сформируют торговый альянс со средним востоком. Нефть поднимут и будут держать, Европа ничего не сможет сделать. Сейчас главное не бухтеть.
		А теперь самое главное!
		От нас требуется сидеть тихо. После того, как все сделают, все будет у нас хорошо. Всем устроят довольствие, как Саудовским гражданам - каждый будет кататься в масле. Главное сейчас сидеть тихо и не суетиться. Никаких митингов, никаких навальных. Просто переждать и всё будет хорошо, там все схвачено....
		Световой меч делает вжух-вжух`,
		type: "",
		prod_year: 2021,
		prodCompany: "",
		prodCountry: "",
		ageLimit: "",
		duration: "",
		poster_hor: "assets/img/previews/StarWars.jpeg",
		rating: 7.1,
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

app.get('/api/v1/film/:id',  (req, res) => {
	const info = {
		"actors": [
		  {
			"avatar": 'assets/img/actor_photos/KBeil.png',
			"character": "Тирион Ланистер",
			"id": 2132,
			"name": "Питер Динклэйдж"
		  },
		  {
			"avatar": 'assets/img/actor_photos/KBeil.png',
			"character": "Джофри Ланистер",
			"id": 2132,
			"name": "Джуд Лоу"
		  },
		  {
			"avatar": 'assets/img/actor_photos/KBeil.png',
			"character": "Церцея Ланистер",
			"id": 2132,
			"name": "Мила Кунис"
		  },
		  {
			"avatar": 'assets/img/actor_photos/KBeil.png',
			"character": "Обиван",
			"id": 2132,
			"name": "Макгрегор"
		  },		  {
			"avatar": 'assets/img/actor_photos/KBeil.png',
			"character": "Призрак",
			"id": 2132,
			"name": "Патрик Суэйзи"
		  },
		  {
			"avatar": 'assets/img/actor_photos/KBeil.png',
			"character": "Изгой",
			"id": 2132,
			"name": "Том Хэнкс"
		  }
		],
		"artists": [
		  {
			"id": 123123,
			"name": "Стивен Спилберг"
		  }
		],
		"directors": [
			{
			  "id": 123123,
			  "name": "Стивен Спилберг"
			},
			{
				"id": 1213123,
				"name": "Стивен Сигал"
			},
			{
				"id": 3123,
				"name": "Тимати Лири"
			}
		  ],
		  "composers": [
			{
			  "id": 123123,
			  "name": "Стивен Спилберг"
			}
		  ],
		  "operators": [
			{
			  "id": 123123,
			  "name": "Стивен Спилберг"
			}
		  ],
		  "montage": [
			{
			  "id": 123123,
			  "name": "Стивен Спилберг"
			}
		  ],
		  "writers": [
			{
			  "id": 123123,
			  "name": "Стивен Спилберг"
			}
		  ],
		  "producers": [
			{
			  "id": 123123,
			  "name": "Стивен Спилберг"
			},
			{
				"id": 1213123,
				"name": "Стивен Сигал"
			},
			{
				"id": 3123,
				"name": "Тимати Лири"
			}
		  ],
		short_description: 'Кто стоит за необычайно жестокими и запутанными убийствами? Суперзвезды в главном детективном сериале 2010-х',

		"id": 321,
		"rating": 9.7,
		"slogan": "Победа или смерть",
		"type": "serial",
		"age_limit": 18,
		"box_office": 60000000,
		"budget": 18323222,
		"count_actors": 783,
		"count_seasons": 11,
		"currency_budget": "USD",
		"description": "Британская лингвистка Алетея прилетает из Лондона",
		"duration": 249,
		"prod_year": 2011,
		"end_year": 2019,
		"name": "Игра престолов",
		"original_name": "Game of Thrones",
		"poster_hor": 'assets/img/films_hor/trueDetective.jpg',

		"genres": [
			"фантастика",
			"боевик"
		  ],
		"prod_companies": [
		  "HBO",
		  "20th FOX",
		  'Columbia'
		],
		"prod_countries": [
		  "США",
		  "Великобритания"
		],
	};


	res.status(200).json(info);
});


const filmRateStorage = {
	'Dop123@mail.ru': {
			'321': {
				'rate': 7,
				'time': '11.11.2007',
			},
		},
};

const reviewsTotalCountsStorage = {
	'321': {
		total: 2033,
		positive: 1233,
		neutral: 753,
		negative: 234,
	},
};


const filmUsersMetaStorage = {
	'Dop123@mail.ru': {
			listCollectionsUser: {
				'Буду смотреть': ['321', '137', '235'],
				'Избранное': ['137', '235'],
				'Друг посоветовал': ['123', '323', '111'],
				'Патриотическое': ['321', '137', '235'],
			},
		},
};

const reviewsUsersMetaStorage = {
	'Dop123@mail.ru': {
		countReviews: 335,
	},
};

const reviewsStorage = {
	'321': [
		{
			author: 'Dop123@mail.ru',
			id: 0,
			type: 'negative',
			name: 'Какой-то заголовок',
			body: 'Какой-то замечательный текст рецензии. Очень умно написано.',
			time: '2022.10.30 14:48:48.712860',
		},
		{
			author: 'Doqp123@mail.ru',
			id: 1,
			type: 'positive',
			name: 'Какой-то заголовок',
			body: 'Какой-то замечательный текст рецензии. Очень умно написано.',
			time: '2222.10.30 14:48:48.712860',
		},
		{
			author: 'Doqwep123@mail.ru',
			id: 2,
			type: 'neutral',
			name: 'Какой-то заголовок',
			body: 'Какой-то замечательный текст рецензии. Очень умно написано.',
			time: '3331.12.30 14:48:48.860',
		},
		{
			author: 'Dop123@mail.ru',
			id: 3,
			type: 'positive',
			name: 'Какой-то заголовок',
			body: 'Какой-то замечательный текст рецензии. Не Очень умно написано.',
			time: '11.11.20q7',
		},
		{
			author: 'qweql.ru',
			id: 4,
			type: 'positive',
			name: 'Какой-то заголовок',
			body: 'Какой-то замечательный текст рецензии. Не Очень умно написано.',
			time: '11.11.1117',
		},
		{
			author: 'Dqwewevw33.ru',
			id: 5,
			type: 'positive',
			name: 'Какой-то заголовок',
			body: 'Какой-то замечwewзии. Не Очень умно написано.',
			time: '01.21.1107',
		},
		{
			author: 'wwwwwwwil.ru',
			id: 6,
			type: 'neutral',
			name: 'Какой-то заголовок',
			body: 'Какой-то замечательный текст рецензии. Не Очень умно написано.',
			time: '10.11.3350',
		},
	]
};

app.get('/api/v1/film/:id/user_activity',  (req, res) => {
	if (Object.keys(req.cookies).length == 0) {
		res.status(401).json({});
		return;
	}

	const email = 'Dop123@mail.ru'

	const filmID = req.params.id;
	let collList = [];
	for (const list in filmUsersMetaStorage[email].listCollectionsUser) {

		if (filmUsersMetaStorage[email].listCollectionsUser[list].includes(filmID)) {
			collList.push({
				name_collection: list,
				is_used: true
			});
		} else {
			collList.push({name_collection: list, is_used: false});
		}
	};

	const meta = Object.assign({},
		{listCollectionsUser: collList},
		{countReviews: reviewsUsersMetaStorage[email].countReviews});

		if (filmRateStorage[email][filmID]) {
			Object.assign(meta, {rating : {
					rate: filmRateStorage[email][filmID].rate,
					time: filmRateStorage[email][filmID].time,
					filmID: filmID,
				}
			});
		}

	res.status(200).json(meta);
});

app.post('/api/v1/film/:id/rate', (req, res) => {
	const rate = req.body.score;
	const email = 'Dop123@mail.ru';
	const filmID = req.params.id;

	if ( !rate ) {
		return res.status(400).json({error: 'Не валидный запрос'});
	}
	delete filmRateStorage[email][filmID]; //
	if (filmRateStorage[email][filmID]) {
		return res.status(403).json({error: 'Оценка уже стоит'});
	}

	let d = new Date(),
	month = '' + (d.getMonth() + 1),
	day = '' + d.getDate(),
	year = d.getFullYear();

	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;


	filmRateStorage[email][filmID] = {
		rate: rate,
		time: [day,month,year].join('.'),
	}
	res.status(201).json({
		rate: filmRateStorage[email][filmID].rate,
		time: filmRateStorage[email][filmID].time,
	});
});

app.post('/api/v1/film/:id/rate/drop', (req, res) => {
	const email = 'Dop123@mail.ru';
	const filmID = req.params.id;

	if (!filmID) {
		return res.status(400).json({error: 'Не валидный запрос'});
	}
	if (!filmRateStorage[email][filmID]) {
		return res.status(403).json({error: 'Оценка не стоит'});
	}

	delete filmRateStorage[email][filmID];
	res.sendStatus(204);
});

app.get('/api/v1/film/:id/reviews',  (req, res) => {
	const filmID = req.params.id;
	const { count, offset } = req.query;

	let reviewsList = [];
	for (let i = offset; reviewsList.length < count && i < reviewsStorage[filmID].length; ++i) {
		let review = reviewsStorage[filmID][i];
		reviewsList.push({
			author: {
				avatar: DEFAULT_AVATAR,
				count_reviews: 66,
				id: 54521,
				nickname: review.author,
			},
			id: 1,
			body: review.body,
			name: review.name,
			create_time: review.time,
			type: review.type,
		});
	}

	res.status(200).json(Object.assign({}, {reviews: reviewsList}, {infoReviews: reviewsTotalCountsStorage[filmID]}));
});

app.post('/api/v1/film/:id/review/new', (req, res) => {
	if (Object.keys(req.cookies).length == 0) {
		res.status(401).json({});
		return;
	}
	const filmID = req.params.id;

	const email = 'Dop123@mail.ru';
	const name = req.body.name;
	const body = req.body.body;
	const type = req.body.type;

	console.log(email + 'review');
	console.log(filmID + 'review');
	console.log(type + 'review');
	console.log(name + 'review');
	console.log(body + 'review');

	if ( !email || !type || !body || !name) {
		return res.status(400).json({error: 'Не валидный запрос'});
	}

	let d = new Date(),
	month = '' + (d.getMonth() + 1),
	day = '' + d.getDate(),
	year = d.getFullYear();

	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;

	const newReview = {
		author: email,
		id: 12,
		type: type,
		name: name,
		body: body,
		time: [day,month,year].join('.'),
	}

	reviewsStorage[filmID].push(newReview);
	++reviewsUsersMetaStorage[email].countReviews;

	res.status(201).json(newReview);
});

const default_port = 80;
let currentPort = process.argv[2]
if (!currentPort) {
	currentPort = default_port
}

const port = process.env.PORT || (+currentPort);

const wss = new ws.Server({
    port: port+1,
}, () => console.log(`WSS started on ${port+1}`));

const premieresFilmsBD = [
	{
		id: 11,
		name: 'Дом дракона',
		poster_hor: 'https://upload.wikimedia.org/wikipedia/ru/6/67/%D0%94%D0%BE%D0%BC%D0%94%D1%80%D0%B0%D0%BA%D0%BE%D0%BD%D0%B0%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80.jpg',
		rating: -1.8,
		ticket_link: 'https://rutracker.org/forum/viewtopic.php?t=6249419',
		prod_date: '2022.11.12',
	},
	{
		id: 10,
		name: 'С широко закрытыми глазами',
		poster_hor: 'https://upload.wikimedia.org/wikipedia/ru/a/aa/EyesWideShutPoster.jpg',
		rating: 7.8,
		ticket_link: 'https://www.kinopoisk.ru/film/3608/',
		prod_date: '2022.11.05',
	},
];


const timer = setInterval(() => broadcastMessage({
	action: 'ANONS_FILM',
	payload: premieresFilmsBD[Math.floor(Math.random() * premieresFilmsBD.length)],
}), 5000);

wss.on('connection', function connection(ws, request, client) {
	ws.on('message', function (message) {
		message = JSON.parse(message)
		switch (message.action) {
			case 'CLOSE':
				clearInterval(timer);
				break;
			}
	});
});

function broadcastMessage(message, id) {

    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});
