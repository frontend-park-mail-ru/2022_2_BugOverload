import { Login } from '../components/Login/login.js';
import { Signup } from '../components/Signup/signup.js';

/**
* Конфиг испульзуемый для рендера
*/
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
<<<<<<< HEAD

export const BACKEND_API = {
    path: 'http://localhost:8088',
    port: '8088',

    popular: 'http://localhost:8088/v1/popular_films',
    todayInCinema: 'http://localhost:8088/v1/in_cinema',
    auth: 'http://localhost:8088/v1/auth',
    login: 'http://localhost:8088/v1/auth/login',
    signup: 'http://localhost:8088/v1/auth/signup',
    logout: 'http://localhost:8088/v1/auth/logout',
    previewFilm: 'http://localhost:8088/v1/recommendation_film',
};
=======
>>>>>>> origin/TP-96b_auth_login_page
