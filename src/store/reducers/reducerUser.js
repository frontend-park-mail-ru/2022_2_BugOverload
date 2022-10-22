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
                statusLogin: response.status,
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
                statusSignup: response.status,
            };
        }
        return { statusSignup: response.status };
    }

    async auth() {
        const responsePromise = Ajax.get(API.auth);

        const response = await responsePromise;
        if (response.status === 200) {
            return { user: response.body };
        }

        return null;
    }

    async logout() {
        const responsePromise = Ajax.get(API.logout);

        const response = await responsePromise;
        if (response.status === 204) {
            return { user: null };
        }

        return null;
    }
}

export const reducerUser = new ReducerUser();
