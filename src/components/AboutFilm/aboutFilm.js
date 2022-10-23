import template from '@components/AboutFilm/aboutFilm.handlebars';

export class AboutFilm {
    constructor(data) {
        this.data = data;
    }

    getTemplate() {
        return template(this.data);
    }
}
