import { Review } from '@components/Review/review.js';
import { ShowMessage } from '@components/Message/message.js';
import template from '@components/ListReviews/listReviews.handlebars';
import { store } from '@store/Store.js';
import { Component } from '@components/Component.js';
import { InputReview } from '@components/InputReview/inputReview.js';
import { actionGetDataReviews } from '@actions/filmActions.js';

/**
* Выводит список пользовательских рецензий
*/
export class ListReviews extends Component {
    /**
     * Cохраняет переданные параметры props через наследуемый компонент.
     * Подписывается на изменение state reviews - новопришедшие рецензии с бэкенда.
     * @param {Object} - сохраняемые начальные параметры
     */
    constructor(props) {
        super(props);
        this.location = this.rootNode.querySelector('.js-reviews-list');
        this.state = {
            reviews: null,
            userReview: null,
            film: null,
        };

        this.data = props.data;
        this.state.film = props.film;

        this.isMounted = false;
        this.step = 3;
        this.offset = 0;

        store.subscribe('reviews', () => {
            this.state.reviews = store.getState('reviews');
            this.render();

            this.offset += this.step;
        });

        store.subscribe('userReview', () => {
            this.state.userReview = store.getState('userReview');
            this.renderBegin();

            this.offset++;
        });
    }

    /**
    * Инициализация компонента
    * Навешивается обработчик для динамической подгрузки при скролле
    * Выбрасывает action для получения данных в state reviews.
    * Для однозначного определения числа и смещения от начала указывается count и offset.
    */
    init() {
        this.componentDidMount();

        store.dispatch(actionGetDataReviews({
            filmID: this.state.film.id,
            offset: this.offset,
            count: this.step,
        }));
    }

    /**
     * Отрисовывает компонент, используя location и hbs-template.
     */
    render() {
        if (!this.state.reviews && this.isMounted) {
            this.componentWillUnmount();
            return;
        }

        const reviews = this.state.reviews.reduce((res, oneReviewData) => res + Review.createReview(oneReviewData), '');
        this.location.querySelector('.js-list-reviews__content-container').insertAdjacentHTML('beforeend', reviews);
    }

    /**
     * Отрисовывает компонент в начале списка, используя location и hbs-template.
     */
    renderBegin() {
        if (!this.state.userReview) {
            return;
        }

        this.location.querySelector('.js-list-reviews__content-container')
            .insertAdjacentHTML('afterbegin', Review.createReview(this.state.userReview));
    }

    /**
    * Служит для создания формы написания рецензии
    */
    handlerOpenFormReview = (function (e) {
        e.preventDefault();
        const user = store.getState('user');
        if (!user) {
            ShowMessage('Вы должны быть авторизованы', 'negative');
            return;
        }

        const inputReview = new InputReview({
            film: this.state.film,
            data: user,
            rootNode: this.rootNode,
        });
        inputReview.render();
    }).bind(this);

    /**
    * Выбрасывает action с запросом за новыми рецензиями при прокрутке вниз страницы
    */
    handlerShowMoreWrapper = () => {
        let isBuzy = false;
        return (function () {
            console.log(`isBuzy: ${isBuzy}`);
            if (isBuzy) {
                return;
            }
            setTimeout(() => {
                isBuzy = true;

                if ((window.innerHeight + window.pageYOffset) < document.body.offsetHeight) {
                    return;
                }

                store.dispatch(actionGetDataReviews({
                    filmID: this.state.film.id,
                    offset: this.offset,
                    count: this.step,
                }));
                isBuzy = false;
            }, 400);
        }).bind(this);
    };

    /**
     * Навешивает обработчики на кнопку создания формы написания рецензии,
     * обработчик запроса новых рецензий при скролле вниз
     */
    componentDidMount() {
        if (this.isMounted) {
            return;
        }

        this.location.insertAdjacentHTML('afterbegin', template());

        const btn = this.location.querySelector('.js-list-reviews__btn-write-review');
        if (!btn) {
            return;
        }
        btn.addEventListener('click', this.handlerOpenFormReview);

        this.handlerShowMore = this.handlerShowMoreWrapper();
        document.addEventListener('scroll', this.handlerShowMore.bind(this));

        const btnShowMore = document.querySelector('.js-btn-show-more-reviews');
        if (!btnShowMore) {
            return;
        }
        btnShowMore.addEventListener('scroll', this.handlerShowMore.bind(this));
        this.isMounted = true;
    }

    /**
     * Используется для освобождения ресурсов.
     * Удаляет обработчики, установленные в ComponentDidMount
     */
    componentWillUnmount() {
        document.removeEventListener('scroll', this.handlerShowMore);
        const btnShowMore = document.querySelector('.js-btn-show-more-reviews');
        if (!btnShowMore) {
            return;
        }
        btnShowMore.removeEventListener('scroll', this.handlerShowMore);
        btnShowMore.remove();
    }
}
