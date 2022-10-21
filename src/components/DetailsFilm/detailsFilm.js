import template from '@components/DetailsFilm/detailsFilm.handlebars';
// import { helper } from '@utils/hbsHelpers';

export class DetailsFilm {
    constructor(information = {}) {
        this.information = information;
        this.location = document.querySelector('.js-film-page__details');
    }

    renderTemplate() {
        this.isActive = true;
        this.location.insertAdjacentHTML('afterbegin', template(this.information));
    }

    remove() {
        if (this.isActive) {
            document.querySelector('.js-film-page__details').innerHTML = '';
        }

        this.isActive = false;
    }
}
