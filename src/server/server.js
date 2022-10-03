'use strict';

const express = require('express');
const path = require('path');
const app = express();
const uuid = require('uuid').v4;
const body = require('body-parser');
const morgan = require('morgan');

import { BACKEND_API } from '../config/config.js'

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '../')));
app.use(express.static(path.resolve(__dirname, 'images')));
app.use(body.json());

const users = {
	'dop123@mail.ru': {
		'nickname': 'StepByyyy',
		'email': 'dop123@mail.ru',
		'password': 'dop123@mail.ru',
		'avatar': 'https://static.1tv.ru/uploads/photo/image/2/huge/4062_huge_876c41f50e.jpg'
	},
};
const ids = {};

app.post(BACKEND_API.login,  (req, res) => {
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

app.get(BACKEND_API.auth,  (req, res) => {
	const email = 'dop123@mail.ru'
	console.log(email)
	res.status(404).json({nickname: users[email].nickname ,email: users[email].email,avatar: users[email].avatar});
});

app.post(BACKEND_API.signup, (req, res) => {
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

const port = process.env.PORT || 3001;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});
