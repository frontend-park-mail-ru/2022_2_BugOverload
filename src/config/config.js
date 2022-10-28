import { Login } from '@components/Login/login.js';
import { Signup } from '@components/Signup/signup.js';
import { MainPage } from '@views/MainPage/mainPage.js';
import { UserProfile } from '@views/UserProfile/UserProfile.js';

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

const login = new Login({ rootNode: ROOT });
const signup = new Signup({ rootNode: ROOT });
const mainPage = new MainPage({ rootNode: ROOT });
const profile = new UserProfile({ rootNode: ROOT });
export const routes = [
    { path: '/', renderView: mainPage.render.bind(mainPage) },
    { path: '/login/', renderView: login.render.bind(login) },
    { path: '/signup/', renderView: signup.render.bind(signup) },
    { path: '/profile/', renderView: profile.render.bind(profile) },
];
