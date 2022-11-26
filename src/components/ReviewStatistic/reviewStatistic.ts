import template from '@components/ReviewStatistic/reviewStatistic.handlebars';
import { Component } from '@components/Component';
import { store } from '@store/Store';

/**
* Отражает общую информацию о рецензиях на данный фильм
* Подписывается на измнение state infoReviews
*/
export class ReviewStatistic extends Component {
    constructor(props: componentProps) {
        super(props);
        this.state = {
            film: props.film,
            statusSendReview: null,
        };
        this.location = this.rootNode.querySelector('.js-reviews-statistic');

        store.subscribe('statusSendReview', updateInfo.bind(this));
    }

    /**
     * Отрисовывает компонент, используя location и hbs-template и данные фильма
     */
    render() {
        this.location.insertAdjacentHTML('afterbegin', template({
            total: (this.state.film.count_negative_reviews || 0)
                + (this.state.film.count_neutral_reviews || 0)
                + (this.state.film.count_positive_reviews || 0),
            negative: this.state.film.count_negative_reviews || 0,
            neutral: this.state.film.count_neutral_reviews || 0,
            positive: this.state.film.count_positive_reviews || 0,
        }));
    }

    unsubscribe() {
        store.unsubscribe('statusSendReview', updateInfo.bind(this));
    }
}

function updateInfo() {
    this.state.statusSendReview = store.getState('statusSendReview');
    this.location.querySelector('.js-component-review-statistic')?.remove();

    this.update = (type: string) => {
        if (!type) {
            return;
        }
        if (type === 'positive') {
            this.state.film.count_positive_reviews = (this.state.film.count_positive_reviews
                || 0) + 1;
            return;
        }
        if (type === 'neutral') {
            this.state.film.count_neutral_reviews = (this.state.film.count_neutral_reviews
                || 0) + 1;
            return;
        }
        if (type === 'negative') {
            this.state.film.count_negative_reviews = (this.state.film.count_negative_reviews
                || 0) + 1;
        }
    };

    this.update(this.state.statusSendReview?.type);
    this.render();
}
