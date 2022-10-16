import { Store } from '../../Store.js';
import { Ajax } from '../../../utils/ajax.js';
import { dispatcher } from '../../Dispatcher.js';

const UserMixin = (superclass) => class extends superclass {
};

class UserStore extends UserMixin(Store) {
    login(user, subsribers) {
        const responsePromise = Ajax.post({
            url: 'http://localhost:80/v1/auth/login',
            body: user,
        });

        responsePromise.then((response) => {
            subsribers.forEach((subscriber) => subscriber({
                status: response.status,
                ...response.body,
            }));
        });
    }

    register(user, subsribers) {
        const responsePromise = Ajax.post({
            url: 'http://localhost:80/v1/auth/signup',
            body: user,
        });

        responsePromise.then((response) => {
            subsribers.forEach((subscriber) => subscriber({
                status: response.status,
                ...response.body,
            }));
        });
    }

    auth() {
        const responsePromise = Ajax.get('http://localhost:80/v1/auth');

        responsePromise.then((response) => {
            if (response.status === 200) {
                dispatcher.dispatch({
                    method: 'setUser',
                    value: response.body,
                });
            }
        });
    }

    logout() {
        const resGet = Ajax.get('http://localhost:80/v1/auth/logout');

        resGet.then((response) => {
            if (response.status === 200) {
                dispatcher.dispatch({
                    method: 'setUser',
                    value: null,
                });
            }
        });
    }
}

export const userStore = new UserStore();
