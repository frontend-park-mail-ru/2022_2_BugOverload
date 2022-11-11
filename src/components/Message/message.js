import { ROOT } from '@config/config.js';
import templateError from '@components/Message/errorMessage.handlebars';
import templateSuccess from '@components/Message/successMessage.handlebars';

/**
* Добавляет в root в index.html сообщение об ошибке, которое изчезает через 2 секунды
*
*/
export function ShowMessage(text = 'Упс, что-то пошло не так.', type = 'negative') {
    let content;
    switch (type) {
    case 'negative':
        content = templateError({
            text,
        });
        break;
    case 'positive':
        content = templateSuccess({
            text,
        });
        break;
    default:
        return;
    }

    const div = document.createElement('div');

    div.insertAdjacentHTML('beforeend', content);

    ROOT.insertAdjacentElement('beforeend', div);

    setTimeout(() => div.remove(), 2000);
}
