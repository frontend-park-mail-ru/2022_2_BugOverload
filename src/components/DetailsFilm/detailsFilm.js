import template from '@components/DetailsFilm/detailsFilm.handlebars';

export class DetailsFilm {
    constructor(information = {}) {
        this.information = information;
        this.location = document.querySelector('.js-film-page__details');
    }

    render() {
        if (!this.location) {
            return;
        }

        this.isActive = true;
        this.location.insertAdjacentHTML('afterbegin', template(this.information));
    }

    remove() {
        if (!this.location) {
            return;
        }

        if (this.isActive) {
            this.location.innerHTML = '';
        }

        this.isActive = false;
    }
}
