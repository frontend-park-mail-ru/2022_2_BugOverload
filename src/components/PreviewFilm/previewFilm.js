import { Ajax } from '@utils/ajax.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';
import template from '@components/PreviewFilm/previewFilm.handlebars';

/**
* Ходит за данными на бэкенд.
* Рендерит HTML-шаблон превью фильма на главной
*
*/
export class PreviewFilm {
    /**
    * Получает данные с бэкенда.
    * Обрабатывает статусы ответа
    * В случае ошибочного статуса добавляет собщение об ошибке в root в index.html
    *
    * @return {Object} Объект с данными о превью
    * @return {null} В случае ошибочного статуса
    */
    async getRequestData() {
        const response = await Ajax.get('http://localhost:3000/v1/recommendation_film');
        if (response.status === 200) {
            return response.body;
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
