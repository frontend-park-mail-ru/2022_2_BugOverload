import template from '@components/ReviewStatistic/reviewStatistic.handlebars';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';

export class ReviewStatistic extends Component {
    constructor() {
        super();
        this.state = {
            infoReviews: null,
        };
        this.location = this.rootNode.querySelector('.js-reviews-statistic');
    }

    componentDidMount() {
        store.subscribe('infoReviews', () => {
            this.state.infoReviews = store.getState('infoReviews');
            this.render();
        });
    }

    render() {
        this.location.insertAdjacentHTML('afterbegin', template(this.state.infoReviews));
    }
}
