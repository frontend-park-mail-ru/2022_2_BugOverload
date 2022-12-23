import { InputReview } from '@components/InputReview/inputReview';
import { Component } from '@components/Component';
import { store } from '@store/Store';
import { ShowMessage } from '@components/Message/message';
import {
    actionRate, actionDeleteRate, actionGetMetaDataFilm, actionGetFilmData
} from '@actions/filmActions';
import {
    decoreCountScores,
} from '@utils/decorationData';
import { roundFloat } from '@utils/common';

import { RatingUI } from 'moviegate-ui-kit';

/**
* Рейтинг фильма.
* Отрисовывает рейтинг и форму для отправки удаления оценки.
* Подписывается на измненение state rating
*/
export class Rating extends Component {
    constructor(props: componentProps) {
        super(props);
        this.location = document.querySelector('.js-film-page__rating');

        this.state = {
            film: props.film,
            rating: null,
            statusRating: null,
            countScores: props.film.count_ratings,
        };

        this.subHandlerRating = () => {
            this.state.rating = store.getState('rating');
            console.log('rating',this.state.rating)
            this.state.countScores = store.getState('countScores') || props.film.count_ratings;

            this.render();
        };

        store.subscribe('rating', this.subHandlerRating);

        this.subscribeFilmGlobalRating = () => {
            this.state.film = {
                id: this.state.film.id,
                ...store.getState(`film${this.state.film.id}`),
            };
            this.state.film.rating = roundFloat(this.state.film.rating);
            if (Number.isInteger(this.state.film.rating)) {
                this.state.film.rating = `${this.state.film.rating}.0`;
            }
            this.render();
        }
        this.subHandlerStatusRating = () => {
            this.state.statusRating = store.getState('statusRating');

            store.subscribe(`film${this.state.film.id}`, this.subscribeFilmGlobalRating, true);
            store.dispatch(actionGetFilmData(this.state.film.id));

            if (!this.state.statusRating) {
                ShowMessage('Оценка успешно удалена', 'positive');
                return;
            }
            ShowMessage('Успех!', 'positive');
            this.state.rating = store.getState('rating');
            this.render();
        };

        store.subscribe('statusRating', this.subHandlerStatusRating);

        if (store.getState('user')) {
            store.dispatch(actionGetMetaDataFilm({ filmID: this.state.film.id }));
        }
    }

    render() {
        this.remove();

        this.location.insertAdjacentHTML('afterbegin', RatingUI.renderTemplate({
            rate: this.state.rating?.value,
            dateRating: this.state.rating?.dateRating,
            [`type_${this.state.film.type || 'film'}`]: true,
            filmRating: this.state.film.rating || '0.0',
            countRates: decoreCountScores(this.state.countScores),
        }));
        this.componentDidMount();
        if (!this.state.rating) {
            return;
        }
        const selectedStar = this.location.querySelector(`[value="${this.state.rating.value}"]`);
        if (!selectedStar) {
            return;
        }
        selectedStar.dataset.settedRate = true;
    }

    remove() {
        if (!this.location) {
            return;
        }

        this.componentWillUnmount();
        this.location.innerHTML = '';
    }

    componentDidMount() {
        const btn = this.location.querySelector('.js-rating__button-write-review');
        if (!btn) {
            return;
        }

        this.handlerReview = (e: Event) => {
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
        };
        btn.addEventListener('click', this.handlerReview);

        const form = this.location.querySelector('.js-rating-form');
        if (!form) {
            return;
        }

        this.handlerSubmit = (e: SubmitEvent) => {
            e.preventDefault();

            const rateValue = (e.submitter as HTMLInputElement).value;

            const user = store.getState('user');
            if (!user) {
                ShowMessage('Вы должны быть авторизованы', 'negative');
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
        };
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

    unsubscribe() {
        this.componentWillUnmount();
        store.unsubscribe('rating', this.subHandlerRating);
        store.unsubscribe('statusRating', this.subHandlerStatusRating);
    }
}
 