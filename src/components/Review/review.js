import template from '@components/Review/review.handlebars';

export class Review {
    constructor(data) {
        this.data = data;
    }

    getTemplate() {
        return template(this.data);
    }

    static createReview(data) {
        return template(data);
    }
}
