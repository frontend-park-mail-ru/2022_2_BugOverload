import template from '@components/DescriptionFilm/descriptionFilm.handlebars';

export class DescriptionFilm {
    constructor(text = '') {
        this.text = text;
        this.location = document.querySelector('.js-film-page__description');
    }

    renderTemplate() {
        this.isActive = true;
        this.location.insertAdjacentHTML('afterbegin', template({ text: this.text }));
    }

    remove() {
        if (this.isActive) {
            document.querySelector('.js-film-page__description').innerHTML = '';
        }

        this.isActive = false;
    }
}
