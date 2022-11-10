import template from '@components/ReviewStatistic/reviewStatistic.handlebars';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';

/**
* Отражает общую информацию о рецензиях на данный фильм
* Подписывается на измнение state infoReviews
*/
export class ReviewStatistic extends Component {
    constructor() {
        super();
        this.state = {
            film: null,
        };
        this.location = this.rootNode.querySelector('.js-reviews-statistic');
    }

    /**
    * Инициализация компонента
    * Подписывается на измнение state infoReviews
    */
    init(id = null) {
        if (!id) {
            return;
        }

        store.subscribe(`film${id}`, () => {
            this.state.film = store.getState(`film${id}`);
            this.render();
        });
    }

    /**
     * Отрисовывает компонент, используя location и hbs-template.
     */
    render() {
        this.location.insertAdjacentHTML('afterbegin', template({
            total: this.state.film.count_negative_reviews
                + this.state.film.count_neutral_reviews
                + this.state.film.count_positive_reviews,
            negative: this.state.film.count_negative_reviews,
            neutral: this.state.film.count_neutral_reviews,
            count_positive_reviews: this.state.film.count_positive_reviews,
        }));
    }
}
