import { handlers } from '../config/storeHandlers.js';

class Dispatcher {
    constructor() {
        this.mapActionHandlers = new Map();

        this.mapSubscribers = new Map();

        for (const handler of handlers) {
            this.register(handler);
        }
    }

    register({ method, methodStore }) {
        this.mapActionHandlers.set(method, methodStore);
    }

    dispatch(action) {
        const storeMethod = this.mapActionHandlers.get(action.method);

        if (!storeMethod) {
            return;
        }

        const subsribers = this.mapSubscribers.get(action.method);

        if (Object.hasOwn(action, 'value')) {
            storeMethod(action.value, subsribers);
        } else {
            return storeMethod(subsribers);
        }
    }
}

export const dispatcher = new Dispatcher();
