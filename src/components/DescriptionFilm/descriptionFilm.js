import template from '@components/DescriptionFilm/descriptionFilm.handlebars';
import { Component } from '@components/Component.js';

export class DescriptionFilm extends Component {
    constructor(text = '') {
        super();
        this.text = text;
        this.location = document.querySelector('.js-film-page__description');
    }

    render() {
        if (!this.location) {
            return;
        }

        this.isActive = true;
        this.location.insertAdjacentHTML('afterbegin', template({ text: this.text }));
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
