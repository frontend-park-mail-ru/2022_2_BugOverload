import template from '@components/Review/review.handlebars';
import { decoreCountReviews } from '@utils/decorationData.js';

export class Review {
    constructor(data) {
        this.data = data;
    }

    getTemplate() {
        return template(this.data);
    }

    static createReview(data) {
        data.author.count_reviews = decoreCountReviews(data.author.count_reviews);
        return template(data);
    }
}
