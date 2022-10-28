import { Login } from '@components/Login/login.js';
import { Signup } from '@components/Signup/signup.js';
import { renderMainPage } from '@views/MainPage/mainPage.js';

export const routes = [
    { path: '/', renderView: renderMainPage },
];

/**
* Конфиг используемый для рендера
*/
export const config = {
    header: {
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

export const API = {
    img: {
        poster_hor(key) { return `http://${DOMAIN}/v1/image?object=poster_hor&key=${key}`; },
        poster_ver(key) { return `http://${DOMAIN}/v1/image?object=poster_ver&key=${key}`; },
        avatar(key) { return `http://${DOMAIN}/v1/image?object=avatar&key=${key}`; },

        auth_login: `http://${DOMAIN}/v1/image?object=default&key=login`,
        auth_signup: `http://${DOMAIN}/v1/image?object=default&key=signup`,
    },

    auth: `http://${DOMAIN}/v1/auth`,
    login: `http://${DOMAIN}/v1/auth/login`,
    signup: `http://${DOMAIN}/v1/auth/signup`,
    logout: `http://${DOMAIN}/v1/auth/logout`,

    in_cinema: `http://${DOMAIN}/v1/in_cinema`,
    popular_films: `http://${DOMAIN}/v1/popular_films`,
    recommendation_film: `http://${DOMAIN}/v1/recommendation_film`,
    about_film(id) { return `http://${DOMAIN}/v1/about_film/${id}`; },
};

export const ROOT = document.getElementById('root');
