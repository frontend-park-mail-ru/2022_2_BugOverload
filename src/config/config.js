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
    login: {
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

const PATH = 'http://localhost:8088';

export const BACKEND_API = {
    path: PATH,
    port: '8088',

    popular: `${PATH}/v1/popular_films`,
    todayInCinema: `${PATH}/v1/in_cinema`,
    auth: `${PATH}/v1/auth`,
    login: `${PATH}/v1/auth/login`,
    signup: `${PATH}/v1/auth/signup`,
    logout: `${PATH}/v1/auth/logout`,
    previewFilm: `${PATH}/v1/recommendation_film`,
};
