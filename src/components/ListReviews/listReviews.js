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
    constructor(props) {
        super(props);
        this.location = this.rootNode.querySelector('.js-reviews-list');
        this.state = {
            reviews: null,
            film: null,
        };

        this.data = props.data;
        this.state.film = props.film;

        this.isMounted = false;
        this.step = 3;
        this.delimeter = -this.step;

        store.subscribe('reviews', () => {
            this.state.reviews = store.getState('reviews');
            this.render();
        });

        this.handler = this.handler.bind(this);
    }

    init() {
        this.componentDidMount();

        store.dispatch(actionGetDataReviews({
            filmID: this.state.film.id,
            delimeter: this.delimeter += this.step,
            count: this.step,
        }));
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
        const reviews = this.state.reviews.reduce((res, oneReviewData) => res + Review.createReview(oneReviewData), '');
        if (reviews === '') {
            this.componentDidUnmount();
            return;
        }
        this.location.querySelector('.js-list-reviews__content-container').insertAdjacentHTML('beforeend', reviews);
    }

    /**
    * Служит для добавления обработчиков на все отрендеренные на странице коллекции
    *
    */
    handler = (function (e) {
        e.preventDefault();
        const user = store.getState('user');
        if (!user) {
            ShowErrorMessage('Вы должны быть авторизованы');
            return;
        }

        const inputReview = new InputReview({
            film: this.state.film,
            data: user,
            rootNode: this.rootNode,
        });
        inputReview.render();
    });

    handlerShowMore = (function () {
        if ((window.innerHeight + window.pageYOffset) < document.body.offsetHeight) {
            return;
        }

        store.dispatch(actionGetDataReviews({
            filmID: this.state.film.id,
            delimeter: this.delimeter += this.step,
            count: this.step,
        }));
    }).bind(this);

    componentDidMount() {
        if (this.isMounted) {
            return;
        }

        this.location.insertAdjacentHTML('afterbegin', template());

        const btn = this.location.querySelector('.js-list-reviews__btn-write-review');
        btn.addEventListener('click', this.handler);

        document.addEventListener('scroll', this.handlerShowMore);
        this.isMounted = true;
    }

    componentDidUnmount() {
        document.removeEventListener('scroll', this.handlerShowMore);
        const btnShowMore = document.querySelector('.js-btn-show-more-reviews');
        btnShowMore.remove();
    }
}
