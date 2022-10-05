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
