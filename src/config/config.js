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
    path: '',
    port: '8088',

    popular: '/v1/popular_films',
    todayInCinema: '/v1/in_cinema',
    auth: '/v1/auth',
    login: '/v1/auth/login',
    signup: '/v1/auth/signup',
    logout: '/v1/auth/logout',
    previewFilm: '/v1/recommendation_film',
};
