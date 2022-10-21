import template from '@components/Rating/rating.handlebars';

export class Rating {
    constructor(information = {}) {
        this.information = information;
        this.location = document.querySelector('.js-film-page__rating');
    }

    renderTemplate() {
        // this.isActive = true;
        this.location.insertAdjacentHTML('afterbegin', template(this.information));
    }

    remove() {
        // if (this.isActive) {
        document.querySelector('.js-film-page__rating').innerHTML = '';
        // }

        // this.isActive = false;
    }
}
