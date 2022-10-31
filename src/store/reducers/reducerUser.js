import { Ajax } from '@utils/ajax.js';
import { API } from '@config/config.js';

class ReducerUser {
    async login(user) {
        const responsePromise = Ajax.post({
            url: API.login,
            body: user,
        });

        const response = await responsePromise;
        if (response.status === 200) {
            return {
                user: response.body,
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
        if (response.status === 201) {
            return {
                user: response.body,
                statusSignup: null,
            };
        }
        return { statusSignup: response.status };
    }

    async auth() {
        const responsePromise = Ajax.get(API.auth);

        const response = await responsePromise;
        if (response.status === 200) {
            return {
                user: response.body,
                authStatus: null,
            };
        }
        return { authStatus: response.status };
    }

    async logout() {
        const responsePromise = Ajax.get(API.logout);

        const response = await responsePromise;
        if (response.status === 204) {
            return { user: null };
        }
        return null;
    }

    async getSettings() {
        const responsePromise = Ajax.get(`http://${DOMAIN}/v1/user/settings`);

        const response = await responsePromise;
        if (response.status === 200) {
            return {
                userInfo: response.body,
            };
        }
        return null;
    }

    async putSettings(user) {
        const responsePromise = Ajax.put({
            url: `http://${DOMAIN}/v1/user/setting`,
            body: user,
        });

        const response = await responsePromise;
        if (response.status !== 204) {
            return {
                statusChangeSettings: response.status,
            };
        }
        return { statusChangeSettings: null };
    }
}

export const reducerUser = new ReducerUser();
