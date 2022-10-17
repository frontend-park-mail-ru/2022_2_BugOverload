import { Reducer } from '../Reducer.js';
import { Ajax } from '../../utils/ajax.js';
import { store } from '../Store.js'
import { setUser } from '../actionCreater/userActions.js'

const UserMixin = (superclass) => class extends superclass {
};

class ReducerUser extends UserMixin(Reducer) {
    login(user, subsribers = null) {
        const responsePromise = Ajax.post({
            url: 'http://localhost:80/v1/auth/login',
            body: user,
        });

        responsePromise.then((response) => {
            if (response.status === 200) {
                store.dispatch(setUser(response.body)); //вызываем dispatch, потому что у login и set разные подписчики
            } else {
                this.set({ //set потому что меняем не user а статус
                    statusLogin: response.status,
                })
            }
            if(subsribers) {
                subsribers.forEach((subscriber) => subscriber());
            }
        });
    }

    signup(user, subsribers = null) {
        const responsePromise = Ajax.post({
            url: 'http://localhost:80/v1/auth/signup',
            body: user,
        });

        responsePromise.then((response) => {
            if (response.status === 201) {
                store.dispatch(setUser(response.body)); //вызываем dispatch, потому что у login и set разные подписчики
            } else {
                this.set({ //set потому что меняем не user а статус
                    statusSignup: response.status,
                })
            }
            if(subsribers) {
                subsribers.forEach((subscriber) => subscriber());
            }
        });
    }

    auth(subsribers = null) {
        const responsePromise = Ajax.get('http://localhost:80/v1/auth');

        responsePromise.then((response) => {
            if (response.status === 200) {
                store.dispatch(setUser(response.body));
                if(subsribers) {
                    subsribers.forEach((subscriber) => subscriber());
                }
            }
        });
    }

    logout(subsribers = null) {
        const resGet = Ajax.get('http://localhost:80/v1/auth/logout');

        resGet.then((response) => {
            if (response.status === 200) {
                store.dispatch(setUser(null));
                if(subsribers) {
                    subsribers.forEach((subscriber) => subscriber());
                }
            }
        });
    }
}

export const reducerUser = new ReducerUser();
