import template from '@components/Rating/rating.handlebars';
import { InputReview } from '@components/InputReview/inputReview.js';
import { Component } from '@components/Component.js';
import { store } from '@store/Store.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';

// import { actionLogin } from '@store/actionCreater/userActions.js';

export class Rating extends Component {
    constructor(information = {}) {
        super();
        this.information = information;
        this.location = document.querySelector('.js-film-page__rating');
    }

    render() {
        if (!this.location) {
            return;
        }
        this.location.insertAdjacentHTML('afterbegin', template(this.information));
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

    handler(e) {
        e.preventDefault();
        const user = store.getState('user');
        if (!user) {
            const error = new ShowErrorMessage('Вы должны быть авторизованы');
            error.render();
            // store.dispatch(actionShowFormLogin()); //Обдумать. TODO
            return;
        }
        console.log(store.getState('user'));

        const inputReview = new InputReview(user);
        inputReview.render();
        inputReview.componentDidMount();
    }

    componentDidMount() {
        // debugger;
        const btn = document.querySelector('.rating__button-write-review');
        btn.addEventListener('click', this.handler.bind(this));
    }

    componentDidUnmount() {
        const btn = document.querySelector('.rating__button-write-review');
        btn.removeEventListener('click', this.handler.bind(this));
    }
}
