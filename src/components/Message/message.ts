import { ROOT } from '@config/config';
import { MessageUI } from 'moviegate-ui-kit';

/**
* Добавляет в root в index.html сообщение, которое изчезает через 2 секунды
*
*/
export function ShowMessage(textMessage = 'Упс, что-то пошло не так.', type = 'negative', duration = 2000) {
    let content;
    switch (type) {
    case 'negative':
        content = MessageUI.renderTemplateError({ text: textMessage });
        break;
    case 'positive':
        content = MessageUI.renderTemplateSuccess({ text: textMessage });
        break;
    default:
        content = MessageUI.renderTemplateError({ text: textMessage });
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
