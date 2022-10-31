import { Ajax } from '@utils/ajax.js';
import { ShowErrorMessage } from '@components/ErrorMessage/errorMessage.js';
import template from '@components/ActorProfile/actorProfile.handlebars';

/**
 * Ходит за данными на бэкенд.
 * Рендерит HTML-шаблон профиля актера
 *
 */
export class ActorProfile {
    /**
    * Получает данные с бэкенда.
    * Обрабатывает статусы ответа
    * В случае ошибочного статуса добавляет собщение об ошибке в root в index.html
    *
    * @return {Object} Объект с данными о превью
    * @return {null} В случае ошибочного статуса
    */
    async getRequestData() {
        // Временно, пока нет данных с актерами дергаем конкретного
        const response = await Ajax.get(`http://${DOMAIN}/v1/actor/1`);
        if (response.status === 200) {
            return response.body;
        }

        if (response.status >= 500) {
            ShowErrorMessage();
            return null;
        }

        ShowErrorMessage();
        return null;
    }

    renderTemplate(data) {
        return template(data);
    }
}
