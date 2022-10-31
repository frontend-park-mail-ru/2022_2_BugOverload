import { Review } from '@components/Review/review.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';
import template from '@components/ListReviews/listReviews.handlebars';
import { store } from '@store/Store.js';
import { Component } from '@components/Component.js';
import { InputReview } from '@components/InputReview/inputReview.js';

/**
* Помогает в создании отрендеренной коллекции фильмов в HTML для последующей вставки на страницу.
* Добавляет обработчики событий на кнопки слайдера
*
*/
export class ListReviews extends Component {
    constructor(data) {
        super();
        this.data = data;
    }

    /**
    * Создаёт коллекцию из набора данных как HTML-шаблон, полученных с бэкенда
    *
    * @param {data Object} data - объект данных коллекции
    * @return {string} отрендеренный HTML-шаблон коллеции
    */
    getTemplate() {
        const reviews = this.data.reduce((res, oneReviewData) => res + Review.createReview(oneReviewData), '');

        return template({ reviews });
    }

    /**
    * Служит для добавления обработчиков на все отрендеренные на странице коллекции
    *
    */
    handler(e) {
        e.preventDefault();
        const user = store.getState('user');
        if (!user) {
            const error = new ShowErrorMessage('Вы должны быть авторизованы');
            error.render();
            // store.dispatch(actionShowFormLogin()); //Обдумать. TODO
            return;
        }

        const inputReview = new InputReview(user);
        inputReview.render();
        inputReview.componentDidMount();
    }

    componentDidMount() {
        const btn = document.querySelector('.js-list-reviews__btn-write-review');
        btn.addEventListener('click', this.handler.bind(this));
    }

    componentDidUnmount() {
        const btn = document.querySelector('.js-list-reviews__btn-write-review');
        btn.removeEventListener('click', this.handler.bind(this));
    }
}
