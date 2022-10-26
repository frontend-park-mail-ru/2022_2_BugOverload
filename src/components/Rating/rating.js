import template from '@components/Rating/rating.handlebars';

export class Rating {
    constructor(information = {}) {
        this.information = information;
        this.location = document.querySelector('.js-film-page__rating');
    }

    renderTemplate() {
        this.location.insertAdjacentHTML('afterbegin', template(this.information));
    }

    remove() {
        document.querySelector('.js-film-page__rating').remove();
    }

    static addHandlers() {
        document.querySelector('.rating__button-write-review');
    }
}
