import template from '@components/Rating/rating.handlebars';
import { InputReview } from '@components/InputReview/inputReview.js';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';
import { actionRate, actionDeleteRate } from '@actions/filmActions.js';

// import { actionLogin } from '@store/actionCreater/userActions.js';

export class Rating extends Component {
    constructor(information = {}) {
        super();
        this.information = information;
        this.location = document.querySelector('.js-film-page__rating');

        this.state = {
            rating: null,
            statusRating: null,
        };

        store.subscribe('rating', () => {
            this.state.rating = store.getState('rating');
            this.state.statusRating = store.getState('statusRating');

            this.render();
        });

        // store.subscribe('statusRating', () => {
        // this.state.statusRating = store.getState('statusRating');
        // this.render();
        // });
    }

    render() {
        if (!this.location) {
            return;
        }
        // Object.assign(this.information, this.state.statusRating, this.state.rating);
        // console.log(`Render ${JSON.stringify(this.information)}`);
        this.location.innerHTML = '';
        this.location.insertAdjacentHTML('afterbegin', template(Object.assign({}, this.information, this.state.statusRating, this.state.rating)));
        this.componentDidMount();
        if (this.state.rating === null) {
            return;
        }
        // debugger;
        this.location.querySelector(`[value="${this.state.rating.rate}"]`).dataset.settedRate = true;
    }

    remove() {
        if (!this.location) {
            return;
        }
        this.location.innerHTML = '';
    }

    // static addHandlers() {
    //     document.querySelector('.rating__button-write-review');
    // }

    handlerReview(e) {
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
        // debugger;
        const btn = document.querySelector('.rating__button-write-review');
        btn.addEventListener('click', this.handlerReview.bind(this));

        // componentDidMount() {
        const form = this.rootNode.querySelector('.js-rating-form');
        //     const validate = this.validateSignup;
        //     let user;

        //     form.addEventListener('keyup', (e) => {
        //         e.preventDefault();
        //         validate(form, true);
        //     });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // debugger;

            const rateValue = e.submitter.value;

            const user = store.getState('user');
            if (!user) {
                ShowErrorMessage('Вы должны быть авторизованы');
                // error.render();
                return;
            }
            console.log(`SUBMIT RATING userEmail ${user.email}`);

            const filmState = store.getState('film');
            if (!filmState) {
                console.log(`Empty FILM STATE ${rateValue}`);
                return;
            }

            if (rateValue === 'delete') {
                store.dispatch(
                    actionDeleteRate({
                        filmID: filmState.id,
                        email: user.email,
                    }),
                );
                return;
            }

            console.log(`SUBMIT RATING ID ${filmState.id}`);
            console.log(`SUBMIT RATING VALUE ${rateValue}`);

            store.dispatch(
                actionRate({
                    filmID: filmState.id,
                    email: user.email,
                    rate: rateValue,
                }),
            );
        });

        //     const { deleteSignup } = this;
        //     document.body
        //         .querySelector('.modal__background')
        //         .addEventListener('click', deleteSignup);
        // }
    }

    componentDidUnmount() {
        const btn = document.querySelector('.rating__button-write-review');
        if (!btn) {
            return;
        }
        btn.removeEventListener('click', this.handlerReview.bind(this));
    }
}
