'use strict';

const express = require('express');
const path = require('path');
const app = express();
const uuid = require('uuid').v4;
const body = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');


app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(express.static(path.resolve(__dirname, 'images')));
app.use(body.json());
app.use(cors({
	origin: ['http://localhost:3000','http://localhost:8088', 'http://localhost:8080', 'http://127.0.0.1:5500'],
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
const DEFAULT_AVATAR = 'assets/img/users/invisibleMan.jpeg'
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
	const email = 'Dop123@mail.ru'
	res.status(200).json({nickname: users[email].nickname ,email: users[email].email, avatar: DEFAULT_AVATAR});
});

app.get('/v1/auth/logout',  (req, res) => {
	res.sendStatus(204);
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
			poster_ver: "assets/img/posters/dune_poster.jpg",
			ratio: 9.8,
			genres: ["Фентезиушшкукл", "Приключения","apapa", "fwe"],
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
			genres: ["Документальный", "Смотрю и плачу", "www"],
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
			poster_ver: "assets/img/posters/2.png",
			ratio: 7.1,
			genres: ["Фентезиушшкукл", "Приключqwqeqqweения","apapa", "fwe"],
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
			genres: ["fwe", "aqwd", "Фентезиушшкукл", "Приключqwqeqqweения","apapa"],
		},
		{
			film_id: 4,
			film_name: "Дом, который построил Джек",
			description: "",
			type: "",
			year_prod: "1922-2021",
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "assets/img/posters/4.png",
			ratio: 9.1,
			genres: ["Фентези", "Приключения"],
		},
		{
			film_id: 5,
			film_name: "Доказательство смерти",
			description: "",
			type: "",
			year_prod: "12-1221",
			prodCompany: "",
			prodCountry: "",
			ageLimit: "",
			duration: "",
			posterHuge: "",
			poster_ver: "assets/img/posters/5.png",
			ratio: 7.1,
			genres: ["Фентези ", "Приключения"],
		},
		{
			film_id: 8,
			film_name: "Убить Билла",
			description: "",
			type: "",
			year_prod: "20223-12332",
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
			poster_ver: "assets/img/posters/9.png",
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
			poster_ver: "assets/img/posters/4.png",
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
			poster_ver: "assets/img/posters/5.png",
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
			poster_ver: "assets/img/posters/8.png",
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
			poster_ver: "assets/img/posters/2.png",
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
			poster_ver: "assets/img/posters/4.png",
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
			poster_ver: "assets/img/posters/5.png",
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
			poster_ver: "assets/img/posters/8.png",
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
			poster_ver: "assets/img/posters/9.png",
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
		poster_hor: "assets/img/previews/space_odyssey_hor.jpg",
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
		poster_hor: "assets/img/previews/dune.jpg",
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
		poster_hor: "assets/img/previews/joker_hor.jpg",
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
		poster_hor: "assets/img/previews/StarWars.jpeg",
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

app.get('/v1/about_film/1',  (req, res) => {
	const info = {
		about: {
			poster_hor: 'assets/img/films_hor/trueDetective.jpg',
			film_name: 'Настоящий Детектив',
			original_name: 'True detective',
			rating: '8.7',
			year_prod: '2014-2019',
			duration: '60',
			type_serial: 'true',
			count_seasons: '3',
			age_limit: '18',
			short_description: 'Кто стоит за необычайно жестокими и запутанными убийствами? Суперзвезды в главном детективном сериале 2010-х',
			directors: ['Кэри Дзёдзи Фукунага', 'ещё чел'],
			roles: ['Мэттью МакКонахи', 'Колин Фаррелл', 'Вуди Харрельсон'],
		},

		descriptionText: `Первый сезон. В Луизиане в 1995 году происходит странное убийство девушки. В 2012 году дело об убийстве 1995 года повторно открывают, так как произошло похожее убийство. Чтобы продвинуться в расследовании, полиция решает допросить бывших детективов, которые работали над тем делом.

		Второй сезон. В калифорнийском городе Винчи в преддверии презентации новой линии железной дороги, которая улучшит финансовое положение города, пропадает глава администрации города. Позже его труп находят на шоссе. К расследованию подключают детектива из полиции Винчи и детектива из департамента шерифа округа Вентура.

		Третий сезон. Известняковое плато Озарк, расположенное одновременно в нескольких штатах. Детектив Уэйн Хейз совместно со следователем из Арканзаса Роландом Уэстом пытаются разобраться в загадочном преступлении, растянувшемся на три десятилетия.`,

		details: {
			// type_serial: 'true',
			// year_prod: this.about.year_prod,
			contry_prod: 'США, Канада',
			genres: ['Триллер', 'Криминал', 'Мухтар'],
			// directors: this.about.directors,
			producers: ['первый', 'второй'],
			scenario: ['Ник Пиццолатто', 'Scott Lasser', 'Грэм Горди'],
			dues: '300',
			// age_limit: this.about.age_limit,
			// duration: this.about.	duration,

			actors: [
				{
					name: '11111',
					role: '22222',
					photo: 'assets/img/actor_photos/KBeil.png'
				},
				{
					name: '33333',
					role: '44444',
					photo: 'assets/img/actor_photos/KBeil.png'
				},
				{
					name: '55555',
					role: '66666',
					photo: 'assets/img/actor_photos/KBeil.png'
				},
				{
					name: '77777',
					role: '88888',
					photo: 'assets/img/actor_photos/KBeil.png'
				},
				{
					name: '99999',
					role: '00000',
					photo: 'assets/img/actor_photos/KBeil.png'
				},
				{
					name: '12121',
					role: '23232',
					photo: 'assets/img/actor_photos/KBeil.png'
				}
			]
		},

	}

	res.status(200).json(info);
});

const default_port = 80;
let currentPort = process.argv[2]
if (!currentPort) {
	currentPort = default_port
}

const port = process.env.PORT || (+currentPort);

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});
