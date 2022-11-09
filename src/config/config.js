import { Login } from '@components/Login/login.js';
import { Signup } from '@components/Signup/signup.js';
import { mainPage } from '@views/MainPage/mainPage.js';
import { profile } from '@views/UserProfile/userProfile.js';
import { filmPage } from '@views/FilmPage/filmPage.js';
import { actorPage } from '@views/ActorProfilePage/actorProfilePage.js';

export const API = {
    img: {
        poster_hor(key) {
            return `https://${DOMAIN}/api/v1/image?object=film_poster_hor&key=${key}`;
        },
        poster_ver(key) {
            return `https://${DOMAIN}/api/v1/image?object=film_poster_ver&key=${key}`;
        },
        user_avatar(key) {
            return `https://${DOMAIN}/api/v1/image?object=user_avatar&key=${key}`;
        },
        person_avatar(key) {
            return `https://${DOMAIN}/api/v1/image?object=person_avatar&key=${key}`;
        },
        person_image(id, image) {
            return `https://${DOMAIN}/api/v1/image?object=person_image&key=${id}/${image}`;
        },

        avatar_default: `https://${DOMAIN}/api/v1/image?object=default&key=avatar_avatar`,
        auth_login: `https://${DOMAIN}/api/v1/image?object=default&key=login`,
        auth_signup: `https://${DOMAIN}/api/v1/image?object=default&key=signup`,
    },

    auth: `https://${DOMAIN}/api/v1/auth`,
    login: `https://${DOMAIN}/api/v1/auth/login`,
    signup: `https://${DOMAIN}/api/v1/auth/signup`,
    logout: `https://${DOMAIN}/api/v1/auth/logout`,

    collection(tag, countFilms = 15, delimiter = 10) {
        return `https://${DOMAIN}/api/v1/collection/${tag}?count_films=${countFilms}&delimiter=${delimiter}`;
    },

    recommendation: `https://${DOMAIN}/api/v1/film/recommendation`,
    film(id, countImages = 10) { return `https://${DOMAIN}/api/v1/film/${id}?count_images=${countImages}`; },
    metaFilm(id) { return `https://${DOMAIN}/api/v1/film/${id}/user_activities`; },

    rate(id) { return `https://${DOMAIN}/api/v1/film/${id}/rate`; },
    del_rate(id) { return `https://${DOMAIN}/api/v1/film/${id}/rate/drop`; },

    reviews(id, count, offset) {
        return `https://${DOMAIN}/api/v1/film/${id}/reviews?count=${count}&offset=${offset}`;
    },
    send_review(id) { return `https://${DOMAIN}/api/v1/film/${id}/review/new`; },
    settings: `https://${DOMAIN}/api/v1/user/settings`,
    person(id, numberPhotos) { return `https://${DOMAIN}/api/v1/person/${id}?count_images=${numberPhotos}&count_films=15`; },

};

export const responsStatuses = {
    OK: 200,
    Created: 201,
    NoContent: 204,
    BadRequest: 400,
    Forbidden: 403,
    NotFound: 404,
    InternalServerError: 500,
};

export const ROOT = document.getElementById('root');

const login = new Login({ rootNode: ROOT });
const signup = new Signup({ rootNode: ROOT });

export const routes = [
    { path: '/', view: mainPage },
    { path: '/login/', view: login },
    { path: '/signup/', view: signup },
    { path: '/profile/', view: profile },
    { path: '/film/', view: filmPage },
    { path: '/person/', view: actorPage },
];
