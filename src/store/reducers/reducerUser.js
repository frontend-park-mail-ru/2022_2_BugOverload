import { Ajax } from '@utils/ajax.js';
import { API, responsStatuses } from '@config/config.js';

class ReducerUser {
    async login(user) {
        const responsePromise = Ajax.post({
            url: API.login,
            body: user,
        });

        const response = await responsePromise;
        if (response.status === responsStatuses.OK) {
            return {
                user: handlerUrlObject(response.body, 'avatar'),
                statusLogin: null,
            };
        }
        return { statusLogin: response.status };
    }

    async signup(user) {
        const responsePromise = Ajax.post({
            url: API.signup,
            body: user,
        });

        const response = await responsePromise;
        if (response.status === responsStatuses.Created) {
            return {
                user: handlerUrlObject(response.body, 'avatar'),
                statusSignup: null,
            };
        }
        return { statusSignup: response.status };
    }

    async auth() {
        let response;
        try {
            response = await Ajax.get(API.auth);
        } catch (e) {
            console.log('catch auth!');
            if (!navigator.onLine && !response) {
                return {
                    user: mockUserData,
                    authStatus: null,
                };
            }
        }

        if (response.status === responsStatuses.OK) {
            return {
                user: handlerUrlObject(response.body, 'avatar'),
                authStatus: null,
            };
        }
        return { authStatus: response.status };
    }

    async logout() {
        let response;
        try {
            response = await Ajax.get(API.logout);
        } catch (e) {
            console.log('logout catch!');
            if (!navigator.onLine && !response) {
                return {
                    user: null,
                    authStatus: responsStatuses.NoContent,
                };
            }
        }

        if (response.status === responsStatuses.NoContent) {
            return {
                user: null,
                logoutStatus: responsStatuses.NoContent,
            };
        }
        return null;
    }

    async getSettings() {
        let response;
        try {
            response = await Ajax.get(`http://${DOMAIN}/v1/user/settings`);
        } catch (e) {
            console.log('logout getSettings!');
            if (!navigator.onLine && !response) {
                return {
                    userInfo: mockSettings,
                };
            }
        }

        if (response.status === responsStatuses.OK) {
            return {
                userInfo: response.body,
            };
        }
        return null;
    }

    async putSettings(user) {
        const responsePromise = Ajax.put({
            url: `http://${DOMAIN}/v1/user/settings`,
            body: user,
        });

        const response = await responsePromise;
        if (response.status !== responsStatuses.NoContent) {
            return {
                statusChangeSettings: response.status,
            };
        }
        return { statusChangeSettings: null };
    }

    async putAvatar(formDataAvatar) {
        formDataAvatar.append('key', 'user_avatar');
        const responsePromise = Ajax.put({
            url: `http://${DOMAIN}/v1/image?key=session`,
            body: formDataAvatar,
        }, true);

        const response = await responsePromise;
        if (response.status === responsStatuses.NoContent) {
            return {
                statusChangeAvatar: response.status,
            };
        }
        return { statusChangeAvatar: null };
    }
}

export const reducerUser = new ReducerUser();

const handlerUrlObject = (object, nameObject) => {
    if (nameObject === 'avatar') {
        const newUrl = `http://movie-gate.online:8088/v1/image?object=user_avatar&key=${nameObject}`;
        if (object[nameObject] !== newUrl) {
            object[nameObject] = newUrl;
        }
    }
    return object;
};

const mockUserData = {
    avatar: 'assets/img/users/defaultAvatar.png',
    email: 'example@domain.ru',
    nickname: 'example',
};

const mockSettings = {
    count_collections: 0,
    count_ratings: 0,
    count_reviews: 0,
    count_views_films: 0,
    joined_date: '2000-00-00',
};
