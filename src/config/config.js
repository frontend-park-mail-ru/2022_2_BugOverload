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
    path: 'http://127.0.0.1:8088',
    port: '8088',

    popular: 'http://127.0.0.1:8088/v1/popular_films',
    todayInCinema: 'http://127.0.0.1:8088/v1/in_cinema',
    auth: 'http://127.0.0.1:8088/v1/auth',
    login: 'http://127.0.0.1:8088/v1/auth/login',
    signup: 'http://127.0.0.1:8088/v1/auth/signup',
    logout: 'http://127.0.0.1:8088/v1/auth/logout',
    previewFilm: 'http://127.0.0.1:8088/v1/recommendation_film',
};
