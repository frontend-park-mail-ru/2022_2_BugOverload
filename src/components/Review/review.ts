import template from '@components/Review/review.handlebars';
import { decoreCountReviews } from '@utils/decorationData';

/**
* Отзыв юзера на фильм.
* Отрисовывает написанный отзыв.
*/
export class Review {
    /**
     * @static
     * Создаёт html-шаблон рецензии
     */
    static createReview(data: review) {
        return template({
            ...data,
            countReviews: decoreCountReviews(data.author.count_reviews),
            user_avatar: data.author.avatar,
            date: data.create_time.split(' ')[0].split('.').reverse().join('.'),
        });
    }
}
