import { Reducer } from '@store/Reducer.js';
import { Ajax } from '@utils/ajax.js';
import { store } from '@store/Store.js';
import { setUser } from '@store/actionCreater/userActions.js';

class ReducerUser extends Reducer {
    login(user, subsribers = null) {
        const responsePromise = Ajax.post({
            url: `http://${DOMAIN}/v1/auth/login`,
            body: user,
        });

        responsePromise.then((response) => {
            if (response.status === 200) {
                // вызываем dispatch, потому что у login и set разные подписчики
                store.dispatch(setUser(response.body));
            } else {
                // set потому что меняем не user а статус
                this.set({
                    statusLogin: response.status,
                });
            }
            if (subsribers) {
                subsribers.forEach((subscriber) => subscriber());
            }
        });
    }

    signup(user, subsribers = null) {
        const responsePromise = Ajax.post({
            url: `http://${DOMAIN}/v1/auth/signup`,
            body: user,
        });

        responsePromise.then((response) => {
            if (response.status === 201) {
                store.dispatch(setUser(response.body));
            } else {
                this.set({
                    statusSignup: response.status,
                });
            }
            if (subsribers) {
                subsribers.forEach((subscriber) => subscriber());
            }
        });
    }

    auth(subsribers = null) {
        const responsePromise = Ajax.get(`http://${DOMAIN}/v1/auth`);

        responsePromise.then((response) => {
            if (response.status === 200) {
                store.dispatch(setUser(response.body));
                if (subsribers) {
                    subsribers.forEach((subscriber) => subscriber());
                }
            }
        });
    }

    logout(subsribers = null) {
        const resGet = Ajax.get(`http://${DOMAIN}/v1/auth/logout`);

        resGet.then((response) => {
            if (response.status === 204) {
                store.dispatch(setUser(null));
                if (subsribers) {
                    subsribers.forEach((subscriber) => subscriber());
                }
            }
        });
    }
}

export const reducerUser = new ReducerUser();
