import { decoreCountReviews } from '@utils/decorationData';

import { ReviewUI } from 'moviegate-ui-kit';


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
        return ReviewUI.renderTemplate({
            ...data,
            countReviews: decoreCountReviews(data.author.count_reviews),
            user_avatar: data.author.avatar,
            date: data.create_time.split(' ')[0].split('.').reverse().join('.'),
        });
    }
}
