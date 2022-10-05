import { Login } from '../components/Login/login.js';
import { Signup } from '../components/Signup/signup.js';

export const config = {
    header: {
        navlink: {
            href: '/navlink',
            name: 'Главная',
            // render: renderMain,
        },
        login: {
            href: '/login',
            name: 'Авторизация',
            render: Login,
        },
    },
    auth: {
        signup: {
            href: '/signup',
            name: 'Регистрация',
            render: Signup,
        },
        login: {
            href: '/login',
            name: 'Авторизация',
            render: Login,
        },
    },
};

export const ROOT = document.getElementById('root');

export const BACKEND_API = {
    path: 'http://movie-gate.online:8088',
    port: '8088',

    popular: 'http://movie-gate.online:8088/v1/popular_films',
    todayInCinema: 'http://movie-gate.online:8088/v1/in_cinema',
    auth: 'http://movie-gate.online:8088/v1/auth',
    login: 'http://movie-gate.online:8088/v1/auth/login',
    signup: 'http://movie-gate.online:8088/v1/auth/signup',
    logout: 'http://movie-gate.online:8088/v1/auth/logout',
    previewFilm: 'http://movie-gate.online:8088/v1/recommendation_film',
};
