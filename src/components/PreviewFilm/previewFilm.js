import { Ajax } from '../../utils/ajax.js';
import { ShowErrorMessage } from '../ErrorMessage/errorMessage.js';

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
        const response = await Ajax.get('http://127.0.0.1:8088/v1/recommendation_film');
        if (response.status === 200) {
            return response.body;
        }

        if (response.status > 500) {
            ShowErrorMessage();
            return null;
        }

        ShowErrorMessage();
        return null;
    }

    renderTemplate(data) {
        return Handlebars.templates['components/PreviewFilm/previewFilm'](data);
    }
}
