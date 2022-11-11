import template from '@components/Rating/rating.handlebars';
import { InputReview } from '@components/InputReview/inputReview.js';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';
import { actionRate, actionDeleteRate, actionGetMetaDataFilm } from '@actions/filmActions.js';

/**
* Рейтинг фильма.
* Отрисовывает рейтинг и форму для отправки удаления оценки.
* Подписывается на измненение state rating
*/
export class Rating extends Component {
    constructor(props) {
        super(props);
        this.location = document.querySelector('.js-film-page__rating');

        this.state = {
            film: props.film,
            rating: null,
            statusRating: null,
        };

        store.subscribe('rating', () => {
            this.state.rating = store.getState('rating');
            this.state.statusRating = store.getState('statusRating');

            this.render();
        });

        if (store.getState('user')) {
            store.dispatch(actionGetMetaDataFilm({ filmID: this.state.film.id }));
        }
    }

    render() {
        this.remove();

        this.location.insertAdjacentHTML('afterbegin', template({
            ...this.state.statusRating,
            rate: this.state.rating?.value,
            dateRating: this.state.rating?.dateRating,
            [`type_${this.state.film.type || 'film'}`]: true,
            filmRating: this.state.film.rating || '0.0',
        }));
        this.componentDidMount();
        if (!this.state.rating) {
            return;
        }
        const selectedStar = this.location.querySelector(`[value="${this.state.rating}"]`);
        if (!selectedStar) {
            return;
        }
        selectedStar.dataset.settedRate = true;
        // this.isSetted = true;
    }

    remove() {
        if (!this.location) {
            return;
        }

        this.componentWillUnmount();
        this.location.innerHTML = '';
    }

    handlerReview = (function (e) {
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
    }).bind(this);

    handlerSubmit = (function (e) {
        e.preventDefault();

        const rateValue = e.submitter.value;

        const user = store.getState('user');
        if (!user) {
            ShowErrorMessage('Вы должны быть авторизованы');
            return;
        }

        if (!this.state.film) {
            return;
        }

        if (rateValue === 'delete') {
            store.dispatch(
                actionDeleteRate({
                    filmID: this.state.film.id,
                }),
            );
            return;
        }

        store.dispatch(
            actionRate({
                filmID: this.state.film.id,
                rate: rateValue,
            }),
        );
    }).bind(this);

    componentDidMount() {
        const btn = this.location.querySelector('.js-rating__button-write-review');
        if (!btn) {
            return;
        }
        btn.addEventListener('click', this.handlerReview);

        const form = this.location.querySelector('.js-rating-form');
        if (!form) {
            return;
        }
        form.addEventListener('submit', this.handlerSubmit);
    }

    componentWillUnmount() {
        const btn = this.location.querySelector('.js-rating__button-write-review');
        if (!btn) {
            return;
        }
        btn.removeEventListener('click', this.handlerReview);

        const form = this.location.querySelector('.js-rating-form');
        if (!form) {
            return;
        }
        form.removeEventListener('submit', this.handlerSubmit);
    }
}
