import { Login } from '@components/Login/login.js';
import { Signup } from '@components/Signup/signup.js';
import { mainPage } from '@views/MainPage/mainPage.js';
import { profile } from '@views/UserProfile/userProfile.js';
import { filmPage } from '@views/FilmPage/filmPage.js';
import { actorPage } from '@views/ActorProfilePage/actorProfilePage.js';

const PROTOCOL = (`${DOMAIN}` === 'movie-gate.online:8088' || `${DOMAIN}` === 'movie-gate.online') ? 'https' : 'hazaza';

export const API = {
    img: {
        poster_hor(key) {
            if (key === 'default') {
                return '/assets/img/default/noFilmHor.webp';
            }
            return `${PROTOCOL}://${DOMAIN}/api/v1/image?object=film_poster_hor&key=${key}`;
        },
        poster_ver(key) {
            if (key === 'default') {
                return '/assets/img/default/noFilm.webp';
            }
            return `${PROTOCOL}://${DOMAIN}/api/v1/image?object=film_poster_ver&key=${key}`;
        },
        user_avatar(key) {
            if (key === 'default') {
                return '/assets/img/default/noUser.webp';
            }
            return `${PROTOCOL}://${DOMAIN}/api/v1/image?object=user_avatar&key=${key}`;
        },
        person_avatar(key) {
            if (key === 'default') {
                return '/assets/img/default/noPerson.webp';
            }
            return `${PROTOCOL}://${DOMAIN}/api/v1/image?object=person_avatar&key=${key}`;
        },
        person_image(id, image) {
            if (id === 0) {
                return '/assets/img/default/noPersonImg.webp';
            }
            return `${PROTOCOL}://${DOMAIN}/api/v1/image?object=person_image&key=${id}/${image}`;
        },

        avatar_default: `${PROTOCOL}://${DOMAIN}/api/v1/image?object=default&key=avatar_avatar`,
        auth_login: `${PROTOCOL}://${DOMAIN}/api/v1/image?object=default&key=login`,
        auth_signup: `${PROTOCOL}://${DOMAIN}/api/v1/image?object=default&key=signup`,
    },

    auth: `${PROTOCOL}://${DOMAIN}/api/v1/auth`,
    login: `${PROTOCOL}://${DOMAIN}/api/v1/auth/login`,
    signup: `${PROTOCOL}://${DOMAIN}/api/v1/auth/signup`,
    logout: `${PROTOCOL}://${DOMAIN}/api/v1/auth/logout`,

    collection(tag, countFilms = 15, delimiter = 10) {
        return `${PROTOCOL}://${DOMAIN}/api/v1/collection/${tag}?count_films=${countFilms}&delimiter=${delimiter}`;
    },

    recommendation: `${PROTOCOL}://${DOMAIN}/api/v1/film/recommendation`,
    film(id, countImages = 10) { return `${PROTOCOL}://${DOMAIN}/api/v1/film/${id}?count_images=${countImages}`; },
    metaFilm(id) { return `${PROTOCOL}://${DOMAIN}/api/v1/film/${id}/user_activities`; },

    rate(id) { return `${PROTOCOL}://${DOMAIN}/api/v1/film/${id}/rate`; },
    del_rate(id) { return `${PROTOCOL}://${DOMAIN}/api/v1/film/${id}/rate/drop`; },

    reviews(id, count, offset) {
        return `${PROTOCOL}://${DOMAIN}/api/v1/film/${id}/reviews?count=${count}&offset=${offset}`;
    },
    send_review(id) { return `${PROTOCOL}://${DOMAIN}/api/v1/film/${id}/review/new`; },
    settings: `${PROTOCOL}://${DOMAIN}/api/v1/user/settings`,
    person(id, numberPhotos) { return `${PROTOCOL}://${DOMAIN}/api/v1/person/${id}?count_images=${numberPhotos}&count_films=15`; },

    put_avatar: `${PROTOCOL}://${DOMAIN}/api/v1/image?object=user_avatar&key=session`,

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
