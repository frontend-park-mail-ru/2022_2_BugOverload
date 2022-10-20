import { Ajax } from '@utils/ajax.js';

class ReducerUser{
    login(user) {
        const responsePromise = Ajax.post({
            url: `http://${DOMAIN}/v1/auth/login`,
            body: user,
        });

        responsePromise.then((response) => {
            if (response.status === 200) {
                return { user: response.body };
            } else {
                return { statusLogin: response.status};
            }
        });
    }

    signup(user) {
        const responsePromise = Ajax.post({
            url: `http://${DOMAIN}/v1/auth/signup`,
            body: user,
        });

        responsePromise.then((response) => {
            if (response.status === 201) {
                return { user: response.body };
            } else {
                return { statusLogin: response.status};
            }    
        });
    }

    async auth() {
        console.log('auth')
        const responsePromise = Ajax.get(`http://${DOMAIN}/v1/auth`);

        const response = await responsePromise
        if (response.status === 200) {
            console.log(response.body)
            return { user: response.body };
        }   
    }

    logout() {
        const responsePromise = Ajax.get(`http://${DOMAIN}/v1/auth/logout`);

        responsePromise.then((response) => {
            if (response.status === 200) {
                return { user: null };
            } 
        });
    }
}

export const reducerUser = new ReducerUser();
