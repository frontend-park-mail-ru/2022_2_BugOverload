import { Login } from '@components/Login/login.js';
import { Signup } from '@components/Signup/signup.js';
// import { renderMainPage } from '@views/MainPage/mainPage.js';
import { renderFilmPage } from '@views/FilmPage/filmPage.js';

export const routes = [
    // { path: '/', renderView: renderMainPage },
    { path: '/', renderView: renderFilmPage },
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

        avatar_default: `http://${DOMAIN}/v1/image?object=default&key=avatar_avatar`,
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

    testApiConfig,
};

function testApiConfig() {
    console.log(API.img.poster_hor(12));
    console.log(API.img.poster_ver(13));

    console.log(API.img.avatar_default);
    console.log(API.img.auth_login);
    console.log(API.img.auth_signup);

    console.log(API.auth);
    console.log(API.login);
    console.log(API.signup);
    console.log(API.logout);

    console.log(API.in_cinema);
    console.log(API.popular_films);
    console.log(API.recommendation_film);
}

export const ROOT = document.getElementById('root');
