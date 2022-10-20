import { Ajax } from '@utils/ajax.js';

class ReducerUser{
    async login(user) {
        const responsePromise = Ajax.post({
            url: `http://${DOMAIN}/v1/auth/login`,
            body: user,
        });

        const response = await responsePromise;
        if (response.status === 200) {
            return { 
                user: response.body,
                statusLogin: response.status,
            };
        } else {
            return { statusLogin: response.status};
        }
    }

    async signup(user) {
        const responsePromise = Ajax.post({
            url: `http://${DOMAIN}/v1/auth/signup`,
            body: user,
        });

        const response = await responsePromise;
        if (response.status === 201) {
            return { 
                user: response.body,
                statusSignup: response.status,
            };
        } else {
            return { statusSignup: response.status };
        }    
    }

    async auth() {
        const responsePromise = Ajax.get(`http://${DOMAIN}/v1/auth`);

        const response = await responsePromise;
        if (response.status === 200) {
            return { user: response.body };
        }   
    }

    async logout() {
        const responsePromise = Ajax.get(`http://${DOMAIN}/v1/auth/logout`);

        const response = await responsePromise;
        if (response.status === 204) {
            return { user: null };
        }   
    }
}

export const reducerUser = new ReducerUser();
