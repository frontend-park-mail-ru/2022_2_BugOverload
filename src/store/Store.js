export class Store {
    constructor(value) {
        this.value = value;
    }

    set(newVal, subscribers) {
        this.value = newVal;
        subscribers.forEach((sub) => sub(newVal));
    }

    get() {
        return this.value;
    }
}
