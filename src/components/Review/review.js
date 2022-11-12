import template from '@components/Review/review.handlebars';
import { decoreCountReviews } from '@utils/decorationData.js';
import { API } from '@config/config.js';

/**
* Отзыв юзера на фильм.
* Отрисовывает написанный отзыв.
*/
export class Review {
    constructor(data) {
        this.data = data;
    }

    /**
     * @static
     * Создаёт html-шаблон рецензии
     */
    static createReview(data) {
        data.author.count_reviews = decoreCountReviews(data.author.count_reviews);
        return template({
            ...data,
            date: data.create_time.split(' ')[0].split('.').reverse().join('.'),
        });
    }
}
