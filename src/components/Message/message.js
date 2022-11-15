import { ROOT } from '@config/config.js';
import templateError from '@components/Message/errorMessage.handlebars';
import templateSuccess from '@components/Message/successMessage.handlebars';

/**
* Добавляет в root в index.html сообщение, которое изчезает через 2 секунды
*
*/
export function ShowMessage(textMessage = 'Упс, что-то пошло не так.', type = 'negative', duration = 2000) {
    let content;
    switch (type) {
    case 'negative':
        content = templateError({ text: textMessage });
        break;
    case 'positive':
        content = templateSuccess({ text: textMessage });
        break;
    default:
        content = templateError({ text: textMessage });
    }

    const errorDiv = document.querySelector('.js-errorMessage');
    if (errorDiv) {
        errorDiv.remove();
    }

    const div = document.createElement('div');

    div.classList.add('js-errorMessage');

    div.insertAdjacentHTML('beforeend', content);

    ROOT.insertAdjacentElement('beforeend', div);

    setTimeout(() => div.remove(), duration);
}
