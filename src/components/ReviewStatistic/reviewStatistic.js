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
            infoReviews: null,
        };
        this.location = this.rootNode.querySelector('.js-reviews-statistic');
    }

    /**
    * Инициализация компонента
    * Подписывается на измнение state infoReviews
    */
    init() {
        store.subscribe('infoReviews', () => {
            this.state.infoReviews = store.getState('infoReviews');
            this.render();
        });
    }

    /**
     * Отрисовывает компонент, используя location и hbs-template.
     */
    render() {
        this.location.insertAdjacentHTML('afterbegin', template(this.state.infoReviews));
    }
}
