import { Ajax } from '@utils/ajax.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';
import template from '@components/PreviewFilm/previewFilm.handlebars';
import { API } from '@config/config.js';
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
        const response = await Ajax.get(API.recommendation_film);
        if (response.status === 200) {
            this.data = response.body;
            return null;
        }

        if (response.status >= 500) {
            ShowErrorMessage();
            return null;
        }

        ShowErrorMessage();
        return null;
    }

    getTemplate() {
        return template(this.data);
    }
}
