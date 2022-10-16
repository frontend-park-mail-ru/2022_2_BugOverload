import { ROOT } from '@config/config.js';
import template from '@components/ErrorMessage/errorMessage.handlebars';

/**
* Добавляет в root в index.html сообщение об ошибке, которое изчезает через 2 секунды
*
*/
export function ShowErrorMessage(text = 'Упс, что-то пошло не так.') {
    const err = template({
        errText: text,
    });
    const div = document.createElement('div');

    div.insertAdjacentHTML('beforeend', err);

    ROOT.insertAdjacentElement('beforeend', div);

    setTimeout(() => div.remove(), 2000);
}
