import template from '@components/DetailsFilm/detailsFilm.handlebars';
import { API } from '@config/config.js';

export class DetailsFilm {
    constructor(information = {}) {
        this.information = information;
        if (this.information.actors) {
            this.information.actors
                .forEach((person) => { person.avatar = API.img.person_avatar(person.avatar); });
        }
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
