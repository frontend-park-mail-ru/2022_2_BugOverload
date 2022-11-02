import { Review } from '@components/Review/review.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';
import template from '@components/ListReviews/listReviews.handlebars';
import { store } from '@store/Store.js';
import { Component } from '@components/Component.js';
import { InputReview } from '@components/InputReview/inputReview.js';
import { actionGetDataReviews } from '@actions/filmActions.js';

/**
* Помогает в создании отрендеренной коллекции фильмов в HTML для последующей вставки на страницу.
* Добавляет обработчики событий на кнопки слайдера
*
*/
export class ListReviews extends Component {
    constructor(data) {
        super();
        this.data = data;
        this.location = this.rootNode.querySelector('.js-reviews-list');
        this.state = {
            reviews: null,
        };

        this.isMounted = false;
        this.step = 2;
        this.delimeter = -this.step;

        store.subscribe('reviews', () => {
            this.state.reviews = store.getState('reviews');
            this.componentDidMount();
            this.render();
        });

        store.dispatch(actionGetDataReviews({ filmID: store.getState('film').id, delimeter: this.delimeter += this.step, count: this.step }));
    }

    /**
    * Создаёт коллекцию из набора данных как HTML-шаблон, полученных с бэкенда
    *
    * @param {data Object} data - объект данных коллекции
    * @return {string} отрендеренный HTML-шаблон коллеции
    */
    render() {
        if (!this.state.reviews) {
            return;
        }
        // debugger;
        const reviews = this.state.reviews.reduce((res, oneReviewData) => res + Review.createReview(oneReviewData), '');
        if (reviews === '') {
            this.componentDidUnmount();
            return;
        }
        this.location.querySelector('.js-list-reviews__content-container').insertAdjacentHTML('beforeend', reviews);

        // return template({ reviews });

        // this.componentDidMount();
    }

    /**
    * Служит для добавления обработчиков на все отрендеренные на странице коллекции
    *
    */
    handler(e) {
        e.preventDefault();
        const user = store.getState('user');
        if (!user) {
            ShowErrorMessage('Вы должны быть авторизованы');
            // store.dispatch(actionShowFormLogin()); //Обдумать. TODO
            return;
        }

        const inputReview = new InputReview(user);
        inputReview.render();
        // inputReview.componentDidMount();
    }

    handlerShowMore(e) {
        e.preventDefault();
        store.dispatch(actionGetDataReviews({ filmID: store.getState('film').id, delimeter: this.delimeter += this.step, count: this.step }));


        // ShowErrorMessage('Н');

        // store.dispatch(...); //TODO
    }

    componentDidMount() {
        // debugger;
        if (this.isMounted) {
            return;
        }

        this.location.insertAdjacentHTML('afterbegin', template());

        const btn = document.querySelector('.js-list-reviews__btn-write-review');
        btn.addEventListener('click', this.handler.bind(this));

        const btnShowMore = document.querySelector('.js-btn-show-more-reviews');
        btnShowMore.addEventListener('click', this.handlerShowMore.bind(this));
        this.isMounted = true;
    }

    componentDidUnmount() {
        const btn = document.querySelector('.js-list-reviews__btn-write-review');
        btn.removeEventListener('click', this.handler.bind(this));

        const btnShowMore = document.querySelector('.js-btn-show-more-reviews');
        btnShowMore.removeEventListener('click', this.handlerShowMore.bind(this));
        btnShowMore.remove();
    }
}
