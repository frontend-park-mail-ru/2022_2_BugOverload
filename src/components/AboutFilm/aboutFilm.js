import template from '@components/AboutFilm/aboutFilm.handlebars';

export class AboutFilm {
    constructor(data) {
        this.data = data;
    }

    // async getRequestData() {
    //     const response = await Ajax.get(`http://${DOMAIN}/v1/about_film/1`);
    //     if (response.status === 200) {
    //         return response.body;
    //     }

    //     if (response.status === 404) {
    //         ShowErrorMessage('Такой страницы не найдено :(');
    //         return null;
    //     }

    //     if (response.status > 500) {
    //         ShowErrorMessage('Произошла ошибка сервера');
    //         return null;
    //     }

    //     ShowErrorMessage();
    //     return null;
    // }

    getTemplate(data) {
        return template(data);
    }
}
