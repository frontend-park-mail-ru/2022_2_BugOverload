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
        console.log(activeFunc)
        let arraySubsribes = this.mapSubscribers.get(type);
        if(arraySubsribes) {
            arraySubsribes.push(activeFunc);
        } else {
            this.mapSubscribers.set(type, [activeFunc]);
        }
        
        console.log(this.mapSubscribers)
    }

    dispatch(action) {
        const storeMethod = this.mapActionHandlers.get(action.type);
        console.log('dis')
        console.log(storeMethod)
        if (!storeMethod) {
            return;
        }

        const subsribers = this.mapSubscribers.get(action.type);
        console.log(action)
        console.log(this.mapSubscribers)
        console.log(storeMethod)
        if(Object.hasOwnProperty.call(action, 'value')) {
            console.log(storeMethod)
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
