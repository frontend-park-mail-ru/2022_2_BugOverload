export class Reducer {
    constructor(value) {
        this.value = value;
    }

    set(newVal, subsribers = null) {
        this.value = newVal;
        if (subsribers) {
            subsribers.forEach((subscriber) => subscriber());
        }
    }

    get() {
        return this.value;
    }
}
