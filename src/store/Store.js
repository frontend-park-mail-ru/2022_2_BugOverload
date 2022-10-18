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

    subscribe(type, activeFunc) {
        const arraySubsribes = this.mapSubscribers.get(type);
        if (arraySubsribes) {
            arraySubsribes.push(activeFunc);
        } else {
            this.mapSubscribers.set(type, [activeFunc]);
        }
    }

    setState(newState) {
        Object.keys(newState).forEach((key) => {
            this.state[key] = newState[key];
        });
    }

    dispatch(action) {
        const storeReducer = this.mapActionHandlers.get(action.type);

        if (!storeReducer) {
            return;
        }

        const subsribers = this.mapSubscribers.get(action.type);

        let newState = {};
        if (Object.hasOwnProperty.call(action, 'value')) {
            newState = storeReducer(action.value, subsribers);

            this.setState(newState);

            if (subsribers) {
                subsribers.forEach((subscriber) => subscriber());
            }
        } else {
            newState = storeReducer(subsribers);

            this.setState(newState);

            if (subsribers) {
                subsribers.forEach((subscriber) => subscriber());
            }
        }
    }

    getSate(nameObject) {
        if(Object.hasOwnProperty.call(this.state ,nameObject)) {
            return this.state[nameObject];
        } 
        return null;
    }
}

export const store = new Store();
