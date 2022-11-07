import template from '@components/Review/review.handlebars';
import { decoreCountReviews } from '@utils/decorationData.js';
import { API } from '@config/config.js';

export class Review {
    constructor(data) {
        this.data = data;
    }

    getTemplate() {
        return template({
            ...this.data,
            user_avatar: API.img.user_avatar(this.data.author.avatar),
        });
    }

    static createReview(data) {
        data.author.count_reviews = decoreCountReviews(data.author.count_reviews);
        return template({
            ...data,
            user_avatar: API.img.user_avatar(data.author.avatar),
        });
    }
}
