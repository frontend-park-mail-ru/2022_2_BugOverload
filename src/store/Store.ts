import { handlers } from '@config/storeHandlers';

interface Store {
    state: {[key: string]: any};
    mapActionHandlers: Map<string, Function>;
    mapSubscribers: Map<string, Array<Function>>;
    mapOnceSubscribers: Map<string, Array<Function>>;
}

class Store {
    constructor() {
        this.state = {};

        this.mapActionHandlers = new Map();

        this.mapSubscribers = new Map();
        this.mapOnceSubscribers = new Map();

        for (const handler of handlers) {
            this.register(handler);
        }
    }

    register({ type, methodStore } :{ type :string, methodStore :Function}) {
        this.mapActionHandlers.set(type, methodStore);
    }

    subscribe(type :string, callback :Function, once = false) {
        const arraySubsribes = !once?
            this.mapSubscribers.get(type):
            this.mapOnceSubscribers.get(type);
        if (arraySubsribes) {
            arraySubsribes.push(callback);
        } else {
            !once?
                this.mapSubscribers.set(type, [callback]):
                this.mapOnceSubscribers.set(type, [callback]);
        }
    }

    unsubscribe(type :string, activeFunc :Function) {
        const arraySubsribes = this.mapSubscribers.get(type);
        if (arraySubsribes) {
            this.mapSubscribers.set(
                type,
                arraySubsribes.filter(
                    (item) => item.name !== activeFunc.name,
                ),
            );
        }
    }

    setState(newState :{[key: string]: any}) {
        let subscribers;
        Object.keys(newState).forEach((key) => {
            this.state[key] = newState[key];

            subscribers = this.mapSubscribers.get(key);
            if (subscribers) {
                subscribers.forEach((subscriber) => subscriber());
            }

            subscribers = this.mapOnceSubscribers.get(key);
            if (subscribers) {
                subscribers.forEach((subscriber) => subscriber());
                this.mapOnceSubscribers.delete(key);
            }
        });
    }

    async dispatch(action :{[key: string]: any}) {
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

    getState(nameObject :string) {
        if (Object.hasOwnProperty.call(this.state, nameObject)) {
            return this.state[nameObject];
        }
        return null;
    }
}

export const store = new Store();
