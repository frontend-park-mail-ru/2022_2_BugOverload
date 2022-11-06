import template from '@components/Rating/rating.handlebars';
import { InputReview } from '@components/InputReview/inputReview.js';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';
import { actionRate, actionDeleteRate, actionGetMetaDataFilm } from '@actions/filmActions.js';

export class Rating extends Component {
    constructor(props) { // information = {} в props.information для ivan
        super(props);
        this.information = props.information;
        this.location = document.querySelector('.js-film-page__rating');
        this.filmData = props.film; 

        this.state = {
            rating: null,
            statusRating: null,
        };

        store.subscribe('rating', () => {
            this.state.rating = store.getState('rating');
            this.state.statusRating = store.getState('statusRating');

            this.render();
        });

        if (store.getState('user')) {
            store.dispatch(actionGetMetaDataFilm({ filmID: this.filmData.id }));
        }
    }

    render() {
        if (!this.location) {
            return;
        }
        this.location.innerHTML = '';
        this.location.insertAdjacentHTML('afterbegin', template({
            ...this.information,
            ...this.state.statusRating,
            ...this.state.rating,
            [`type_${this.filmData.type}`]: true,
            filmRating: this.filmData.rating,
        }));
        this.componentDidMount();
        if (this.state.rating === null) {
            return;
        }
        if (!this.state.rating) {
            return;
        }
        const selectedStar = this.location.querySelector(`[value="${this.state.rating.rate}"]`);
        if (!selectedStar) {
            return;
        }
        selectedStar.dataset.settedRate = true;
    }

    remove() {
        if (!this.location) {
            return;
        }
        this.location.innerHTML = '';
    }

    handlerReview(e) {
        e.preventDefault();
        const user = store.getState('user');
        if (!user) {
            ShowErrorMessage('Вы должны быть авторизованы'); // TODO
            return;
        }

        const inputReview = new InputReview({
            film: this.state.film,
            data: user,
            rootNode: this.rootNode,
        });
        inputReview.render();
    }

    componentDidMount() {
        const btn = this.location.querySelector('.rating__button-write-review');
        btn.addEventListener('click', this.handlerReview.bind(this));

        const form = this.rootNode.querySelector('.js-rating-form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const rateValue = e.submitter.value;

            const user = store.getState('user');
            if (!user) {
                ShowErrorMessage('Вы должны быть авторизованы');
                return;
            }

            const filmState = store.getState('film');
            if (!filmState) {
                return;
            }

            if (rateValue === 'delete') {
                store.dispatch(
                    actionDeleteRate({
                        filmID: filmState.id,
                    }),
                );
                return;
            }

            store.dispatch(
                actionRate({
                    filmID: filmState.id,
                    rate: rateValue,
                }),
            );
        });
    }

    componentDidUnmount() {
        const btn = document.querySelector('.rating__button-write-review');
        if (!btn) {
            return;
        }
        btn.removeEventListener('click', this.handlerReview.bind(this));
    }
}
