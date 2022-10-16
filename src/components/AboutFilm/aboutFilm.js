import { Ajax } from '@utils/ajax.js';
import template from '@components/AboutFilm/aboutFilm.handlebars';

export class AboutFilm {
    async getRequestData() {
        const response = await Ajax.get(`http://${DOMAIN}/v1/about_film/1`);
        if (response.status === 200) {
            return response.body;
        }

        if (response.status === 404) {
            ShowErrorMessage('Такой страницы не найдено :(');
            return null;
        }

        if (response.status > 500) {
            ShowErrorMessage('Произошла ошибка сервера');
            return null;
        }

        ShowErrorMessage();
        return null;
    }

    renderTemplate(data) {
        return template(data);
    }
}
