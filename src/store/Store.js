import { handlers } from '../config/storeHandlers.js';

class Store {
    constructor() {
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

    dispatch(action) {
        const storeMethod = this.mapActionHandlers.get(action.type);

        if (!storeMethod) {
            return;
        }

        const subsribers = this.mapSubscribers.get(action.type);

        if (Object.hasOwnProperty.call(action, 'value')) {
            storeMethod(action.value, subsribers);
        } else {
            storeMethod(subsribers);
        }
    }

    getSate(nameObject) {
        const storeMethod = this.mapActionHandlers.get(nameObject);

        return storeMethod();
    }
}

export const store = new Store();
