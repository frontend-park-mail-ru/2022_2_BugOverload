import { Login } from '@components/Login/login';
import { Signup } from '@components/Signup/signup';
import { mainPage } from '@views/MainPage/mainPage';
import { profile } from '@views/UserProfile/userProfile';
import { filmPage } from '@views/FilmPage/filmPage';
import { actorPage } from '@views/ActorProfilePage/actorProfilePage.js';
import { publicProfile } from '@views/PublicProfile/publicProfile';
import { premierePage } from '@views/PremierePage/premierePage';

const PROTOCOL = `${DOMAIN}` === 'movie-gate.online' ? 'https' : 'http';

let i = 0;
const randomMy = () => i++;

export const API = {
    img: {
        poster_hor(key: string) {
            if (key === 'default') {
                return '/assets/img/default/noFilmHor.webp';
            }
            return `${PROTOCOL}://${DOMAIN}/api/v1/image?object=film_poster_hor&key=${key}`;
        },
        poster_ver(key: string) {
            if (key === 'default') {
                return '/assets/img/default/noFilm.webp';
            }
            return `${PROTOCOL}://${DOMAIN}/api/v1/image?object=film_poster_ver&key=${key}`;
        },
        user_avatar(key: string) {
            if (key === 'default') {
                return '/assets/img/default/noUser.webp';
            }
            return `${PROTOCOL}://${DOMAIN}/api/v1/image?object=user_avatar&key=${key}&rnd=${randomMy()}`;
        },
        person_avatar(key: string) {
            if (key === 'default') {
                return '/assets/img/default/noPerson.webp';
            }
            return `${PROTOCOL}://${DOMAIN}/api/v1/image?object=person_avatar&key=${key}`;
        },
        person_image(id: number, image: string) {
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

    collection(target: 'genre'|'tag', key: string, sortParam: 'rating'|'date', countFilms: number = 20, delimiter: number = 0) {
        return `${PROTOCOL}://${DOMAIN}/api/v1/collection?target=${target}&key=${key}&sort_param=${sortParam}&count_films=${countFilms}&delimiter=${delimiter}`;
    },

    recommendation: `${PROTOCOL}://${DOMAIN}/api/v1/film/recommendation`,
    film(id: number, countImages: number = 10) { return `${PROTOCOL}://${DOMAIN}/api/v1/film/${id}?count_images=${countImages}`; },
    metaFilm(id: number) {
        return `${PROTOCOL}://${DOMAIN}/api/v1/film/${id}/user_activity`;
    },

    rate(id: number) { return `${PROTOCOL}://${DOMAIN}/api/v1/film/${id}/rate`; },
    del_rate(id: number) { return `${PROTOCOL}://${DOMAIN}/api/v1/film/${id}/rate/drop`; },

    reviews(id: number, count: number, offset: number) {
        return `${PROTOCOL}://${DOMAIN}/api/v1/film/${id}/reviews?count_reviews=${count}&offset=${offset}`;
    },
    send_review(id: number) { return `${PROTOCOL}://${DOMAIN}/api/v1/film/${id}/review/new`; },
    settings() {
        const rand = randomMy();
        return `${PROTOCOL}://${DOMAIN}/api/v1/user/settings?rnd=${rand}`;
    },
    person(id: number, numberPhotos: number) { return `${PROTOCOL}://${DOMAIN}/api/v1/person/${id}?count_images=${numberPhotos}&count_films=15`; },

    put_avatar: `${PROTOCOL}://${DOMAIN}/api/v1/image?object=user_avatar&key=session`,

    publicProfile(id: number) { return `${PROTOCOL}://${DOMAIN}/api/v1/user/profile/${id}`; },

    premieres(countFilms: number = 20, delimiter: number = 0) {return `${PROTOCOL}://${DOMAIN}/api/v1/premieres?count_films=${countFilms}&delimiter=${delimiter}`},
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
    { path: '/user/', view: publicProfile },
    { path: '/premieres/', view: premierePage },
];

export const isMobile = /Android|webOS|iPhone|iPad|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(window.navigator.userAgent) ||
(window.navigator as any).userAgentData?.mobile;