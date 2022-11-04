import { Login } from '@components/Login/login.js';
import { Signup } from '@components/Signup/signup.js';
import { mainPage } from '@views/MainPage/mainPage.js';
import { profile } from '@views/UserProfile/userProfile.js';
import { actorPage } from '@views/ActorProfilePage/actorProfilePage.js';

export const API = {
    img: {
        poster_hor(key) { return `http://${DOMAIN}/v1/image?object=poster_hor&key=${key}`; },
        poster_ver(key) { return `http://${DOMAIN}/v1/image?object=poster_ver&key=${key}`; },
        avatar(key) { return `http://${DOMAIN}/v1/image?object=avatar&key=${key}`; },

        avatar_default: `http://${DOMAIN}/v1/image?object=default&key=avatar_avatar`,
        auth_login: `http://${DOMAIN}/v1/image?object=default&key=login`,
        auth_signup: `http://${DOMAIN}/v1/image?object=default&key=signup`,
    },

    auth: `http://${DOMAIN}/v1/auth`,
    login: `http://${DOMAIN}/v1/auth/login`,
    signup: `http://${DOMAIN}/v1/auth/signup`,
    logout: `http://${DOMAIN}/v1/auth/logout`,

    collection(tag) { return `http://${DOMAIN}/v1/collection/${tag}`; },

    recommendation_film: `http://${DOMAIN}/v1/recommendation_film`,
    film(id) { return `http://${DOMAIN}/v1/film/${id}`; },
    metaFilm(id) { return `http://${DOMAIN}/v1/film/${id}/user_activities`; },

    rate(id) { return `http://${DOMAIN}/v1/film/${id}/rate`; },
    del_rate(id) { return `http://${DOMAIN}/v1/film/${id}/rate/drop`; },

    reviews(id, count, delimeter) {
        return `http://${DOMAIN}/v1/film/${id}/reviews?count=${count}&delimeter=${delimeter}`;
    },
    send_review(id) { return `http://${DOMAIN}/v1/film/${id}/review/new`; },

    person(id, numberPhotos) { return `http://${DOMAIN}/api/v1/person/${id}?actor_photos=${numberPhotos}`; },

    testApiConfig,
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

// удалим перед релизом
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
    console.log(API.popular);
    console.log(API.recommendation_film);
    console.log(API.metaFilm(225));
}

export const ROOT = document.getElementById('root');

const login = new Login({ rootNode: ROOT });
const signup = new Signup({ rootNode: ROOT });

export const routes = [
    { path: '/', view: mainPage },
    { path: '/login/', view: login },
    { path: '/signup/', view: signup },
    { path: '/profile/', view: profile },
    { path: '/actor/', view: actorPage },
];
