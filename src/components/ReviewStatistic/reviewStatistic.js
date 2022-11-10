import template from '@components/ReviewStatistic/reviewStatistic.handlebars';
import { Component } from '@components/Component.js';

/**
* Отражает общую информацию о рецензиях на данный фильм
* Подписывается на измнение state infoReviews
*/
export class ReviewStatistic extends Component {
    constructor(film) {
        super();
        this.state = {
            film,
        };
        this.location = this.rootNode.querySelector('.js-reviews-statistic');
    }

    /**
     * Отрисовывает компонент, используя location и hbs-template и данные фильма
     */
    render() {
        this.location.insertAdjacentHTML('afterbegin', template({
            total: this.state.film.count_negative_reviews
                + this.state.film.count_neutral_reviews
                + this.state.film.count_positive_reviews,
            negative: this.state.film.count_negative_reviews,
            neutral: this.state.film.count_neutral_reviews,
            positive: this.state.film.count_positive_reviews,
        }));
    }
}
