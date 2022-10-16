import { Login } from '../components/Login/login.js';
import { Signup } from '../components/Signup/signup.js';
import { renderMainPage } from '../views/MainPage/MainPage.js';

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

export const ROOT = document.getElementById('root');
