import { handlers } from '@config/storeHandlers.js';

class Store {
    constructor() {
        this.state = {};

        this.mapActionHandlers = new Map();

        this.mapSubscribers = new Map();

        for (const handler of handlers) {
            this.register(handler);
        }
    }

    register({ type, methodStore }) {
        this.mapActionHandlers.set(type, methodStore);
    }

    subscribe(type, callback) {
        const arraySubsribes = this.mapSubscribers.get(type);
        if (arraySubsribes) {
            arraySubsribes.push(callback);
        } else {
            this.mapSubscribers.set(type, [callback]);
        }
    }

    unsubscribe(type, activeFunc) {
        const arraySubsribes = this.mapSubscribers.get(type);
        if(arraySubsribes) {
            this.mapSubscribers.set(
                type,
                arraySubsribes.filter(
                    (item) => item.name !== activeFunc.name,
                ),
            );
        }
    }

    setState(newState) {
        let subscribers;
        Object.keys(newState).forEach((key) => {
            this.state[key] = newState[key];
            subscribers = this.mapSubscribers.get(key);

            if (subscribers) {
                subscribers.forEach((subscriber) => subscriber());
            }
        });
    }

    async dispatch(action) {
        const storeReducer = this.mapActionHandlers.get(action.type);

        if (!storeReducer) {
            return;
        }

        let newState = {};
        if (Object.hasOwnProperty.call(action, 'value')) {
            newState = await storeReducer(action.value);
        } else {
            newState = await storeReducer();
        }

        if (newState) {
            this.setState(newState);
        }
    }

    getState(nameObject) {
        if (Object.hasOwnProperty.call(this.state, nameObject)) {
            return this.state[nameObject];
        }
        return null;
    }
}

export const store = new Store();
